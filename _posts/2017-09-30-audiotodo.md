---
layout: post
title:  Audio To-Do List
date:   2017-09-30 10:00:00 +0000
categories: Projects
image: audiotodo.jpg
excerpt: A To-Do List controlled by voice commands that keeps track of unfinished items on a simple txt file.

---
The idea of creating a To-Do List that could be controlled by voice came to me when I was developing the Assistant project. I wanted to add more and more functionality to the Assistant and one night the idea of a to-do list controlled by voice popped in my head.

Initially I thought it would be an easy task. Slowly it became a bit more complex than expected. In the end I thought it would be good to just use this To-Do List as a single program instead of a full integration with the Assistant project.

The decision to implement the To-Do List on a txt file was made simply because it allows the user to edit the file directly without the need of saying the commands out loud.

&nbsp;
#### Overview
-----
&nbsp;

- **The Good**
  - The commands are simple and easy to remember
  - The `help` command comes in handy
  - Using a txt file makes it easy to edit the to do list without voice commands
- **The Bad**
  - Can't be used on noisy environments
  - The speech seems unnatural and too fast at times
- **The Ugly**
  - The speech recogniser might have trouble recognising words if the user has an accent
  - There must be an internet connection for the recogniser to work
  - The loop will run forever. If no command is given the message `Sorry, I couldn't understand that command.` will be repeated over and over again.

&nbsp;
#### Info
-----
&nbsp;

GitHub repo: [https://github.com/FabioRosado/AudioToDoList/](https://github.com/FabioRosado/AudioToDoList/)
