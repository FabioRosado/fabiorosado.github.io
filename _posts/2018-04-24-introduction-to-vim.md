---
layout: post
title:  Introduction to Vim
subtitle: Learn how to get started with this editor  
author: "FabioRosado"
date:   2018-04-11 18:10:02
categories: Code
category_icon:  <i class="fas fa-terminal"></i>
image: vim.jpg
excerpt: Vim is still one of the editors that confuses some developers. This introduction will keep you up to speed with this powerful editor.
---

Vim, stands for vi improved and is a command line text editor that comes installed with every platform other than windows (unless you install it). It can be hard to figure out how to do things in this editor, this post is meant to give you the basic knowledge of vi/vim and how to do things with it.

Let's start with the basics. How do you open vim?

If you are running Linux or MacOS is most likely that you have vim installed already so you can just open your terminal and run the command `vim <filename>` to edit that file. 

_Note: You can only edit files that are within your working directory._

If you are on windows you could download it from [vim.org](https://www.vim.org/download.php).

&nbsp;
# Vi/Vim Modes
-----
&nbsp;

Vim comes with three different modes:
- Normal Mode (Default mode)
- Insert Mode (Press _i_ key)
- Visual Mode (Press _v_ key)

These modes are quite easy to understand and you can see which mode you are in on the bottom left corner of the terminal window. 

The normal mode is the default mode and the one activated as soon as you open Vim, you can move around, read the text, copy, insert lines, etc. The only thing you can't do in this mode is editing the text.

## Editing text

If you want to edit the text you can just press the _i_ key on your keyboard you can notice that the bottom left corner of the window now shows the text: --INSERT--. 

You will now be able to use your terminal as a text editor, you can add, edit and delete text like you would do in any other text editor. 

Once you are happy with the changes that you have just made, press the _esc_ key on your keyboard and you will be back to the Normal mode.

## Visual Mode

There is nothing much to say about this mode. It allows you to select big chunks of text in order for you to copy or cut. When this mode is active you can read the text: --VISUAL-- in the bottom left corner of the window.

Another thing you can do in the visual mode is to highlight text and then make small changes to the highlighted text such as changing to uppercase or indenting lines.

&nbsp;
# Vi/Vim Commands
-----
&nbsp;

Vim is meant to help you do things fairly quickly without the need for a mouse. Everything can be done with a keyboard, so learning some of the Vi/Vim commands will be helpful.

Things that you will learn:

- how to save a file
- how to quit Vi/Vim
- how to move around
- how to see line numbers

_Note: Vi/Vim has a lot of different commands and combinations, this is just an introduction and you should read other sources if you want to learn how to use Vi/Vim properly._

## Saving and quitting Vi/Vim

Now that you know how to edit a text in Vi/Vim, the most important thing you will learn will be how to save your changes and quit. If you press the _:_ key of your keyboard, you will be able to enter commands to Vi/Vim.

To save a file all you need to do is type `:w` and then press enter.

To quit a file and go back to the command line you need to type `:q`. 

Note that if you made changes to the file and didn't save them, Vi/Vim won't automatically exit, instead, it will tell you to run the command `:q!` which basically translates to force quit.

These two commands can be combined into one `:wq`. This will write the changes to the file and then quit Vi/Vim.

## Line numbers

Showing line numbers can be very useful when editing a file. Vi/Vim allows you to jump straight into a line if you know its number, so your editing can be done quicker if you know exactly where and what to edit.

To show line numbers you need to run the command `:set number`, once you press enter, you can see that Vi/Vim will show the number of each line.

If you want to jump straight to a line you can type the command `:<line number>` and the cursor will jump to the beginning of that line.

## Moving around

To move around all you need is pressing a few keys to do different things. Moving around doesn't require you to enter the command mode by pressing the `:` key.

- `h` or `arrow left` - move the cursor one character to the left
- `l` or `arrow right` - move the cursor one character to the right
- `j` or `arrow down` - move the cursor one line down
- `k` or `arrow up` - move the cursor one line up
- `0` - move the cursor to the beginning of the line
- `$` - move the cursor to the end of the line
- `w` - move the cursor one word forward
- `b` - move the cursor one word back
- `gg` - move to the beginning of the file (line 1)
- `G` - move to the end of the line (last line)

This two commands can be used while moving/editing the file:

- `o` - adds an empty line below the cursor, moves the cursor to that line, enters edit mode
- `O` - adds an empty line above the cursor, moves the cursor to that line, enters edit mode


## Deleting things

You can delete things by pressing the `d` key, this will serve as the _cut_ command as well. Vim allows you to combine commands to achieve a porpose, so you can combine the moving around commands with the delete to improve your editing skills.

- `dw` - delete from where the cursor is until the end of the word
- `d2w` - delete two words from cursor
- `d$` - delete to the end of the line from where the cursor is
- `dd` - delete whole block of text/line

## Other useful commands

Since we tend to delete the wrong things vim also comes with an undo and redo command that can come in handy in plenty of situations.

- `u` - undo previous command/action
- `CTRL-u` - redo previous command/action

You can also make vim search for a term in the whole file with the commands:

- `:?<term>` - searches for that term from the cursor down
- `:\<term>` - searches for that term from the cursor up
- `n` - go to the next searched term
- `N` - go to the previous searched term

&nbsp;
## Conclusion
-----
&nbsp;

This concludes the introduction to Vi/Vim, hopefully, you found it useful. There is a lot of things that you still need to learn but this should give you the basics to work around in this text editor.

If you would like to know more about Vi/Vim, you can run the Vim tutor by running this command on your terminal:

`$ Vimtutor`

This will open a text file with step-by-step instructions that cover all the basic commands in Vi/Vim.
