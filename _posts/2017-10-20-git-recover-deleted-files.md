---
layout: post
title:  "Git: Recover Deleted Files"
subtitle: The day I messed up
author: "FabioRosado"
date:   2017-10-11 10:01:02 +0100
categories: GitHub
category_icon: <i class="fas fa-code-branch"></i>
image: git-recover.jpg
excerpt: 
---

I created a Pull Request that added Issue/PR templates to opsdroid. Then I had to re-do the code bit on the Issue template. Since I'm trying to keep my commits tidy I did a rebase merging the recent fix into the previous commit and pushed it to GitHub.
Meanwhile a new PR had been merged to the project so I had to pull those changes before pushing my ones to the main repo. 

When I checked the files in GitHub, the Pull Request was showing changes that had been done in a previous PR made by me. Worst was when I checked my local files and noticed that the templates had just vanished.

At first that "Oh no!" moment hit, then I remembered that in git, files are not really deleted so I could go back in time and I  could correct the mess and recover the two files that I was trying to include in my PR.

&nbsp;
# Git Reflog
-----
&nbsp;

Reflogs(reference logs) are used by git to keep track of all the updates done on a repository's branch. They are basically the history of your repository and the great thing about them is that you can see everything that was done on the repo(even rebases).

Since the reflogs contain information about the old state of branches, it's possible to go back to an old version/state if needed and recover changes. This is exactly what I needed when I messed my Pull Request.

When you run the command `git reflog` you get a list of all the commands ran on the repository, SHA-1 key, command run and an info message. Here's an example:

```
8ed1518 (HEAD -> master, origin/master) HEAD@{0}: commit: Fix typos and update posts
0743bc8 HEAD@{1}: rebase -i (finish): returning to refs/heads/master
0743bc8 HEAD@{2}: rebase -i (fixup): Update projects and hacktoberfest post
bd96dd5 HEAD@{3}: rebase -i (start): checkout HEAD~2
bd96dd5 HEAD@{5}: commit: Update projects and hacktoberfest post
32a6ffb HEAD@{6}: commit: Update about page
b97f90d HEAD@{7}: rebase -i (finish): returning to refs/heads/master
b97f90d HEAD@{8}: rebase -i (fixup): Update layout, add new post
dd2458a HEAD@{9}: rebase -i (start): checkout HEAD~2
62e68ac HEAD@{10}: commit: fix
(...)

```

You can see that HEAD is currently at position **HEAD@{0}**, it has the SHA-1 key *8ed1518*, the command that was ran was *commit* and the commit message was *Fix typos and update posts*

So if you want to fix some issue on the commit **bd96dd5 HEAD@{5}: commit: Update projects and hacktoberfest post** all you need to do is run the command `git checkout bd96dd5` or `git checkout HEAD@{5}`. Just be aware that HEAD will be in a detached state from now on until you either checkout to master or a new branch.


&nbsp;
# Detached Head
-----
&nbsp;

HEAD in Git is the marker that points to a branch reference and the branch points to the latest commit. So when HEAD gets detached it means that it is not pointing to a branch reference. If you do `git checkout <SHA-1 of a commit>` HEAD will now point to this commit instead of a branch.

If you checkout to a specific commit, the following message will appear and warn you that you are currently in a detached state.

```
Note: checking out '<SHA-1 key>'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at <SHA-1 key>... <commit message> (#<issue number>)

```

As you can see by the warning message, even if you are in a detached state, you can still make changes, look around, discard commits or make new commits. So if you commit something and want to keep those changes, all you need to do is create a new branch and your changes will be shown there.

&nbsp;
# The Solution
-----
&nbsp;

The first step is not to panic. Like I mentioned before, when you use git nothing is really lost so you can always retrieve something, even if it was deleted.

The second step is to run the command `git reflog` to find the SHA-1 key or HEAD position that you want to revert your changes back to. You also might need to press the down key to navigate the reflog (_note: you may also use the 'w' key or 'j' key to move down_)

The third step is to create a temporary branch to store the changes. Run the command `git checkout -b temp`. Your head will be now attached to the temp branch and the changes that you committed before are now available.  You might want to check the differences between the temp branch and the master branch just to make sure nothing is broken, just run the command `git diff master temp`

_note: I'm using the master branch as an example, if you are using another branch just use that name instead_

The fourth step is to update the master branch to point to the temp branch. Run the command `git checkout -B master temp` to update and checkout into the master branch. Now all the changes that were once lost should be visible in the master branch. 

You can now delete the temp branch with the command `git branch -d temp` and push the changes to GitHub (_note: you might need to force push the changes with the command `git push -f`_).

I hope this helped you to recover deleted commit or just go back in history from a mistake.
