---
layout: post
title:  "Git: Commit history"
subtitle: How to keep it under control
author: "FabioRosado"
date:   2017-10-11 10:01:02 +0100
categories: GitHub
image: commits.jpg
excerpt: 
---

If you have just started using GitHub and contributing to an Open Source project, you might come to a point in which with every new Pull Request, all your previous commits will be displayed instead of just the latest commit.

I was sitting on a 44 commit history, wondering why the hell all my commits were showing every time I did a new Pull Request. Eventually, I have learned how to fix this issue and why this was happening.

&nbsp;
#### Git Rebase
-----
&nbsp;

With rebase, you can move, combine and drop one or more commits.

Let's imagine that you finish working on a feature. You commit, push and create a pull request to the main repo. Then some of the tests fail because you have a line that's too long, a typo in the docstring and there's an extra empty line added at the end of the file. 

You go back, fix the issues, commit and push these new changes.

If you go back to your Pull Request you will see that a new commit was added to it. But since the changes that you have just committed are just a fix to the initial commit, you probably want to just show that one commit. Rebasing will help you do that.

By using the command `git rebase -i HEAD~2` you can rebase the last two commits into one. 

As soon as you type that command a text editor (usually vim) will appear and show you a list of the commits and commands that you can use. By default, every commit starts with the command `pick` which means that you will use the commit on your rebase process. 

If you want to join two commits into one you can either use the `squash` or `fixup` command. 

_Note: If you are new to vim, simply press the i-key to enter insert mode to write. Press ESC to exit insert mode and to save the changes simply press `:` and write the command `wq!` (write, quit, override)._

When you finish the rebase process you will have to force push your changes. Simply use the command `git push -f` to force push the changes. If you go back to your Pull Request you will see that only one commit message is shown.

[Read more about rebasing](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)


&nbsp;
#### Git Pull
-----
&nbsp;

The command `git pull` does two commands in one: git fetch and git merge.

The first thing that git pull does is importing commits from a remote repo (your own GitHub repository or the main one) into your local repository. If the project that you are working on has other contributors and there have been new features or bug fixes added to the main repository, it's quite normal that your local repo will get behind and miss these important new changes.

To avoid this you should use the command `git pull upstream master` to get the latest changes made to the main repo and merge them into yours. 

You can also use the flag `--rebase` if you want to avoid getting an empty commit from the merge.

&nbsp;
#### The Solution
-----
&nbsp;

The solution to keep your commit history down is quite simple. All you need to do is to run the command `git pull upstream master` to pull all the changes made to the main repo and make your local repository up to date. 

If you have a huge commit history like me (about 44 commits) you will have to spend a large amount of time fixing conflicts on the rebase process. Eventually, everything will be up to date and that huge list of commits won't show up anymore when you do a Pull Request.

Hope this will help you in both keeping your commit history down and gives some clarification as to why there was such a long one.

&nbsp;
