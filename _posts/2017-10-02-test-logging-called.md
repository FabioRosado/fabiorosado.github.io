---
layout: post
title:  "Test: Was Logging called"
subtitle:
author: "FabioRosado"
date:   2018-12-21 12:01:02
categories: Code
category_icon: <i class="fa fa-code" aria-hidden="true"></i>
tags: Featured
image: testlogging.jpg
excerpt: An example from opsdroid on how to test if a logging call was made successfully. 
---
While creating a function that uses `logging.info` to log useful information on the first run of [Opsdroid](https://github.com/opsdroid/opsdroid) the percentage of `coverall` dropped quite a bit. To counter that a test had to be created to assert if the `logging.info` was called or not.

Opsdroid uses a file named `configuration.yml` to keep track of all the configuration details. Upon the suggestion of Jacob(the creator and maintainer of the project) a `welcome-message: true` line was added to the configuration file in case the user wishes to hide the welcome message.

# The Function

The `welcome_message` function is a very basic function that uses the `logging.info` to log a quick get started information about Opsdroid.

{% highlight python %}
1  def welcome_message(config):
2      """Add welcome message if set to true in configuration."""
3      try:
4          if config['welcome-message']:
5              LOGGER.info("=" * 40)
6              LOGGER.info("You can customise your opsdroid by modifying "
7                          "your configuration.yaml")
8              LOGGER.info("Read more at: "
9                          "http://opsdroid.readthedocs.io/#configuration")
10             LOGGER.info("Watch the Get Started Videos at: "
11                         "http://bit.ly/2fnC0Fh")
12             LOGGER.info("Install Opsdroid Desktop at: "
13                         "https://github.com/opsdroid/opsdroid-desktop/releases")
14             LOGGER.info("=" * 40)
15     except KeyError:
16         pass
{% endhighlight %}

# The Test

{% highlight python %}
1   def test_welcome_message(self):
2    config = {"welcome-message": True}
3    with mock.patch('opsdroid.__main__.LOGGER.info') as logmock:
4      opsdroid.welcome_message(config)
5      self.assertTrue(logmock.called)
{% endhighlight  %}

- We start the function by creating a dummy config file that will always return the welcome message.
- On line 3 we patch the `LOGGER.info` call from `opsdroid__main__` (where the welcome_message function is located)
- On line 4 we make a call to the `welcome_message` function using the dummy config file (which will always return the `LOGGER.info` lines)
- On line 5 `logmock.called` will return a boolean whether the mocked object has been called. Since we are sure that the dummy config file will always return True we do a simple `assertTrue` to see if `opsdroid.__main__.LOGGER.info` was called.

# (Update) An easier way

When I wrote this pos, back  in September of 2017, it seemed that there was no way to test if a logging message was logged. That changed in Feb when the unittest framework was updated and introduced a brilliant new assert.

Now, you can quickly check if a message was logged with the assert `self.assertLogs(logger, level)`.
Let's say that your logger is called `_Logger` and you are currently logging the message "hello" with the following code `_Logger.info("hello")` for you to assert if the message was logged all you need to do is `self.assertLogs('_Logger', 'info')`.

As you can see, three lines of code are just reduced into a single one (or two if you need to call the function), which is great because it makes the testing code much more readable.
