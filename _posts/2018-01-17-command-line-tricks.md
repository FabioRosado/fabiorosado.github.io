---
layout: post
title: Command Line Tricks
subtitle: Quick tricks that will save you time
author: "FabioRosado"
date:   2018-01-17 09:20:02 +0000
categories: Terminal
category_icon: <i class="fa fa-terminal" aria-hidden="true"></i>
tags: Featured
image: goran-ivos-245581.jpg
excerpt: Working with the command line can be fun and save you plenty of time. These tricks will help you save even more time when you have to repeat commands. 
---

Working with the command line can be fun. But the more you use the command line, the more you realise that you end up repeating commands over and over again in your workflow.

Luckily there are some easy to remember commands that will help you cut down time when repeating commands.

# History  - Using reverse-i-search
Reverse-i-search will search through the whole `history` to match a command that contains what you typed. You will need to activate reverse-i-search by pressing the keys `CTRL+R`, your prompt will switch to ```(reverse-i-search)`':```

With reverse-i-search activated, you can type the beginning of a command and the last one that was run will be matched. If you want to cycle through all matches you just need to press `CTRL+R` again.

If you know that you are going to use a command a lot you can write the command like this:
 
 ```<command> #tag```

Then all you need is run the reverse-i-search and search for `#`, your command will be matched straight away. Since the # indicates a start of a comment the terminal will simply ignore the text `#tag`.

#### Examples:

History:
```
  1  git pull origin master #pull-origin-master
  2  git status
  3  git stash
  4  git pull origin master
  5  git stash apply
  6  git add file
  7  git commit -m "Added file"
  8  git rebase -i HEAD~2
  9  git push
```

Start reverse-i-search and type git:

```
(reverse-i-search)`git': git push
```

Git push was the last command typed so that's the first match that reverse-i-search returns.

Now let's use the tag trick to run the first command in our history. Let's reverse-i-search for #

```
(reverse-i-search)`#': git pull origin master #pull-origin-master
```


# History - Using !
If you run the command `history` you can see a long list with all the commands that you have typed in the command line. To re-run a command you can do one of these two ways:
- Type: `!<number of the command>`
- Type `!<first letters of command>`

For you to use the number of the command you probably would have to run `history`, then get the number and type `!<number of the command>`, in some cases this will take even longer than typing the command again. 

But since you know which command you want to run, you can simply type `!<first letters of command>` and those first letters will be matched to a command. This little trick can save you some precious time.

#### Examples:

History:
```
  1 ls
  2 cd
  3 cd documents/
  4 mkdir folder
  5 rmdir folder
  6 ls
```

Let's run the last command in our history again by typing `!!`

``` 
user ~/documents > !!
ls
folder
```

As you can see the terminal will print the command before running it, this is to help you in case something happens that you weren't expecting.

Now let's try to run the second command in our history by using the number reference.

```
user ~/documents > !2
cd
user ~ >
```
The `cd` command was run and you should be in your home directory now.

Let's say you want to create a folder with the same name in your home directory you can do:

```
user ~ > !mk
mkdir folder
user ~ > ls
folder
```


# Autocomplete
Typing long commands can take a while, luckily your terminal can autocomplete commands for you, all you need to do is start typing a few letters and press the `TAB` key and the command will be auto-completed.

If you forgot how do you type a command, but you know the first letter, you can type the first letter and press the `TAB` key twice, a long list of all available commands will appear and you can use that to help you.


## Examples:
Let's look for a command that starts with the letter K:

```
user ~ > K <TAB><TAB>
kadmin.local     kextfind         keytool          klist            kswitch
kcc              kextload         kill             kramdown         ktutil
```

As you can see any command that starts with the letter K will be returned.

I hope you find this helpful, let me know if there are more useful commands that I should add to this list!


**Credit:** [Photo by Goran Ivos on Unsplash](https://unsplash.com/@goran_ivos)