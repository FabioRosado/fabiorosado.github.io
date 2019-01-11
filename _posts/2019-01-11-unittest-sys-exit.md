---
layout: post
title:  Unittest -  How to test for sys.exit
subtitle: How I have managed to test a function that calls sys.exit(1) 
author: "FabioRosado"
date:   2019-01-11 18:30:00
categories: Python
category_icon: <i class="fab fa-python"></i>
image: unittest.jpg
excerpt: How I solved the issue of testing a function that should call sys.exit() when a yaml file couldn't be safely loaded.
---
In opsdroid, we were trying to update pyyaml to version 4.2b1 in order to fix the security vulnerability of version 3.12 that allows users to run python code from within a `.yaml` file. The fix was rather easy, we simply had to replace `yaml.loader(stream)` to `yaml.loader(stream, Loader=SafeLoader)` but I wanted to add a test that shows that this fix does work.

One of the first things we do in opsdroid is to load the file `config.yaml` to get the configuration for the bot. Before the update, you could run python code from within the config.yaml like this `test: !!python/object/apply:os.system ["echo 'Oops!';"]` - *this will print Oops! into the shell*

After the update and the fix, when a user tries to run python code from within a yaml file the following happens:

```shell
could not determine a constructor for the tag 'tag:yaml.org,2002:python/object/apply:os.system'
in "/Users/<user>/Library/Application Support/opsdroid/configuration.yaml"
#sys.exit(1) called
```

Since the next version of pyyaml might change how things work, I wanted to create a test to check if everything would work as expected and no python code could be run from within a yaml file.

**There was only one problem.**

Unittest calls `sys.exit()` when all the tests finish running, so the test that I created was causing all sort of issues with the rest of the tests - some of them were passing but most of them failed.

After a bit of research on StackOverflow and a bit of trial and error I came up with a way to test the fix and make the rest of the tests work properly.

# The Test

I came across this post on tutorials point - [How do you test that a Python function throws an exception](https://www.tutorialspoint.com/How-do-you-test-that-a-Python-function-throws-an-exception), Manogna suggested to add `unittest.main(exit=False)` to the test and that solved my issues.

So the test ended up looking like this:

```python
def test_load_exploit(self):
    opsdroid, loader = self.setup()
    with self.assertRaises(SystemExit):
        config = loader.load_config_file(
            [os.path.abspath("tests/configs/include_exploit.yaml")])
        self.assertLogs('_LOGGER', 'critical')
        self.assertRaises(YAMLError)
        unittest.main(exit=False)
```

Basically, this test does five things:

1. loads a yaml file that contains `!!python/object/apply:os.system ["echo 'Oops!';"]`
2. asserts if our Logger will log a critical message
3. asserts if `yaml.YAMLError` is raised
4. asserts if `SystemExit` is raised - due to sys.exit() call
5. prevents unittest from exiting


# The code

The code that these test covers is shown below, I decided to add it here just in case you want to know exactly what the code does and hopefully, it can help you somehow.

```python
try:
    with open(config_path, 'r') as stream:
        _LOGGER.info(_("Loaded config from %s."), config_path)
        return yaml.load(stream, Loader=yaml.SafeLoader)
except yaml.YAMLError as error:
    _LOGGER.critical(error)
    sys.exit(1)
except FileNotFoundError as error:
    _LOGGER.critical(error)
    sys.exit(1)
```

As you can see, we try to open the yaml file and load it using `yaml.load(stream, Loader=yaml.SafeLoader)`, but if an exception is raised we just log the error and call sys.exit since the bot can't operate without any configuration.

Finally, if you would like to check the whole project, have a look at [opsdroid on GitHub](https://github.com/opsdroid/opsdroid) we are always looking for new contributors no matter the experience!
