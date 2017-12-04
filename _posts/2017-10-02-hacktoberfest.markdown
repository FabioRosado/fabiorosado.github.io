---
layout: post
title:  Hacktoberfest
subtitle: My first experience
date:   2017-10-05 11:01:02 +0100
categories: [code adventures]
image: hacktoberfest.jpg

---
Hacktoberfest is a month-long celebration of open source software that runs for the whole month of October.
Today is officially the second day of Hacktoberfest, over 7,000 issues were closed, a  bunch of new issues are raised every day. Needless to say, that October is possibly one of the busiest months in the open source community.

By participating in the Hacktoberfest you get stickers and if you submit at least four pull requests on GitHub you will win a limited edition shirt as well.

This was my first year participating in the Hacktoberfest, the biggest problem I've come across is to find projects to contribute to. There are so many new projects being created(some even just for hacktoberfest), that it's easy to spend hours browsing GitHub in search of the right project to participate.

So, in the end, it was easier for me to keep contributing to Opsdroid since I knew the project and there were plenty of issues that I could contribute to instead of spending hours in search for a new project to contribute to.



&nbsp;
# What I've learned
----
&nbsp;

As Hacktoberfest progressed I've learned how to use git more efficiently and better. I know how to fix [mistakes and recover lost work]({{site.url}}/_posts/2017-10-20-git-recover-deleted-files.md), how to rebase properly so my commits are tidy and I think it's safe to say that I'm quite comfortable with git now.

My knowledge of tests also improved a bit from all the attempts at writing them. I'm more comfortable with unit tests and know a bit more about how to use `mock.patch`. I started working my way through the book - Test-Driven Development With Python - to improve my skills at the cycle test > code > test.


&nbsp;
## Projects Helped
----
&nbsp;

- [Pclubuiet website](https://github.com/pclubuiet/website)
  - Created resources page
  - updated navbar to display correct active link

- [CloudBridge](https://github.com/gvlproject/cloudbridge)
  - Added logging messages through the whole project

- [OpsDroid](https://github.com/opsdroid/opsdroid)
  - Added wit.ai parser following Api.ai example
      - Added tests to cover wit.ai parser
      - Added documentation for wit.ai parser
  - Added test on all parsers covering the ClientOSError exception
  - Added templates for PR and Issues
  - Renamed Api.ai references to new name - Dialogflow
  - Updated the Regex parser to use re.search instead of re.match
  - Updated logging levels and replaced concatenation with string substitution(%)
  - Renamed <skillname.py> to `__init__.py` on base skills
      - Updated documentation to remove reference of <skillname.py> convention

&nbsp;
&nbsp;

Hacktoberfest is over. I've managed to do enough Pull Requests to get a shirt, I'm so excited!

&nbsp;
