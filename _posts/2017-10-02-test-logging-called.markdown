---
layout: post
title:  "Test: Was Logging called"
subtitle:
author: "FabioRosado"
date:   2017-09-14 12:01:02 +0100
categories: Featured
image: testlogging.jpg
excerpt: An example from opsdroid on how to test if a logging call was made successfully. Unittest and mock.patch were used to make that assertion.
---
While creating a function that uses `logging.info` to log useful information on the first run of [Opsdroid](https://github.com/opsdroid/opsdroid) the percentage of `coverall` dropped quite a bit. To counter that a test had to be created to assert if the `logging.info` was called or not.

Opsdroid uses a file named `configuration.yml` to keep track of all the configuration details. Upon the suggestion of Jacob(the creator and maintainer of the project) a `welcome-message: true` line was added to the configuration file in case the user wishes to hide the welcome message.

&nbsp;
# The Function
------
&nbsp;

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

&nbsp;
# The Test
------
&nbsp;

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

&nbsp;
# Final Thoughts
------
&nbsp;

This was the best I could come up with to test if the `logging.info` method was called.
Have you ever came up with the need to assert if this method was called successfully? How did you solve this issue?

&nbsp;
