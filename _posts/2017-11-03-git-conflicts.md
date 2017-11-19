---
layout: post
title:  "Git: Merge Conflicts"
subtitle: How to fix git conflicts
author: "FabioRosado"
date:   2017-10-19 14:00:02 +0100
categories: GitHub
image: placeholder.jpg
excerpt: Usually a conflict happens when the project was updated but your local repository is out of sync. So when you try to push changes on a file that someone already changed a conflicting message will show so you can choose which version is the right version to use.

---

So you just tried to pull changes from a remote repository and git presents you with the message: 

```
CONFLICT (content): Merge conflict in <filename>
Automatic merge failed; fix conflicts and then commit the result.
```

From this message, you know that the automatic merge failed, that you need to fix some conflicts on some file and that you need to commit the result(or the fix).

But what does all of this mean?


&nbsp;
#### Reason for conflicts to happen
-----
&nbsp;

Usually, a conflict happens when the project was updated but your local repository is out of sync. So when you try to push changes on a file that someone already changed, a conflicting message will show, so you can choose which version is the right version to use.

Let's say that you have the following file:

```python

def hello():
    """Prints Hello"""
    print("Hello") 

```

Then someone comes and changes the file, but since you haven't pulled the changes from the main repository, these changes won't show up in your local repository. 

Then you decide to change this example function to print the traditional "Hello World". But when you try to push the changes to the main repository you get the message that a conflict happened in the hello.py file. 

Let's open the file and inspect the problem.


&nbsp;
#### The conflicting file
-----
&nbsp;

When you open the hello.py file you notice that there are some strange things in the hello function.

```python
def hello():
<<<<<<< HEAD
    """Prints Hello Everyone!"""
    print("Hello Everyone!")
=======
    """Prints Hello World!"""
    print("Hello World!")

```


At first, this might seem a bit strange, but it's quite easy to understand. Basically, git is telling you that the HEAD of the main repository is showing the following:

```
<<<<<<< HEAD
    """Prints Hello Everyone!"""
    print("Hello Everyone!")
```

But your own repository has the following changes:


```
=======
    """Prints Hello World!"""
    print("Hello World!")

```

As you can see, git is an amazing tool and it will tell you about issues before trying to do something. This conflict warning is asking you to check the differences between the two versions and choose which one do you want to use. 






&nbsp;
#### Fixing the conflict
-----
&nbsp;

Fixing the conflict is quite easy, all you need to do is delete the version that you don't want to use together with the `<<<<<<< HEAD` and `=======` markers. In the hello.py file you know that we should be printing "Hello World!" as per tradition, so you decide that your version is the correct version. 


```python
def hello():
    """Prints Hello World!"""
    print("Hello World!")

```

The hello.py will look like this when you fix the conflict. Now you can commit the changes and git will continue with the merge/pull command.
