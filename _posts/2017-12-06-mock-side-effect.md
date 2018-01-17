---
layout: post
title: Test for aiohttp's ClientErrorOS
subtitle: Using mock side effect function
author: "FabioRosado"
date:   2017-12-30 12:01:02 +0100
categories: Code
category_icon: <i class="fa fa-code" aria-hidden="true"></i>
tags: Featured
image: testlogging.jpg
excerpt: This is an example on how to use the side_effect function from the unittest module to test if the aiohttp exception ClientOSError was raised. 
---
One of the issues of opsdroid was to bump the test coverage of the parsers.  Aiohttp is used to connect to the different API's  and a `ClientOSError` exception is raised, when the client fails to connect to the parser API. 

I've decided to take on the task to find a way to test these two lines of code that everyone seems to be having issues with. 

After doing a bunch of reading and trying different ways to raise the exception, I've finally come to this idea that perhaps mocking a failed connection could work.

From the unit test documentation, the `side_effect` method looked like something that could provide the answer. 

_side_effect allows you to perform side effects, including raising an exception when a mock is called -- [Unit Test Documentation](https://docs.python.org/3/library/unittest.mock.html)_

```python
async def test_parse_witai_raise_ClientOSError(self):
        with OpsDroid() as opsdroid:
            opsdroid.config['parsers'] = [
                {'name': 'witai', 'access-token': 'test', 'min-score': 0.3}
            ]
            mock_skill = amock.CoroutineMock()
            match_witai('get_weather')(mock_skill)

            mock_connector = amock.CoroutineMock()
            message = Message("how's the weather outside", "user",
                              "default", mock_connector)

            with amock.patch.object(witai, 'call_witai') as mocked_call:
                mocked_call.side_effect = ClientOSError()
                await witai.parse_witai(opsdroid, message,
                                        opsdroid.config['parsers'][0])

            self.assertFalse(mock_skill.called)
            self.assertTrue(mocked_call.called)
```

The `call_witai` is the only part of the parser that connects to the Wit.AI API, so this bit is mocked. Then we need to try and parse a message so we use `await witai.parse_witai(opsdroid, message,opsdroid.config['parsers'][0])`

Since the mocked call to Wit.AI API is returning the exception `ClientOSError()` the skill mock_skill - `mock_skill = amock.CoroutineMock()` is not called. But, the mocked call to the API is called so both the tests pass.

The test passes and the coverage were bumped up, but it feels that the exception wasn't really tested at all. All my attempts to assert the exception with `self.assertRaises()` failed so this is what I came up with.

Do you have any other way that this exception could be tested? I would love to hear from you.