---
layout: post
title:  Creating A Jekyll Theme
subtitle: What I've learned 
author: "FabioRosado"
date:   2017-12-29 16:00:02
categories: Code
category_icon:  <i class="fa fa-code" aria-hidden="true"></i>
image: niebieski.jpg
excerpt: Niebieski is the first theme that I've created from scratch. In this post I look back at what I've learned and the struggles I faced when creating the theme.
---
The first time I tried to customize my blog, I used the minima theme alongside with bootstrap. I was just starting to dab into bootstrap and CSS, so my code was a big, scrambled mess. It was so bad, that the blog looked pretty broken on small screens.

I wanted to improve the theme, so I did move reading on bootstrap and CSS. I searched different themes for inspiration and did some sketches on how I wanted the theme to look like.

The planning phase was pretty fun.

Then the hard work started, when the time came to turn a bad sketch into code. These are a few things I've learned while creating my Jekyll theme called [Niebieski](https://github.com/FabioRosado/Niebieski).

# Planning is important

When you are starting a theme, there is a big nothing waiting for you. After you type the command `Jekyll new <my theme name>` on the command line, Jekyll will create a new site with the usual default blog post and that's it.

Everything needs to be done at this point and it's very easy to get lost.

Having a plan or a sketch of how you want your theme to look, not only will it guide you, but you will know where to focus your efforts first. I was set in using bootstrap on this theme, so I started on the `head.html` file by including all the links to the bootstrap, font awesome and my main CSS file.

# Getting the hands dirty

With bootstrap working on the site and a file to add my CSS I was ready to get my hands dirty and start working on the theme. I really liked how the theme [minima](https://github.com/jekyll/minima)
organizes their sass files, so I grabbed them and deleted pretty much everything, other than some CSS rules and the names of the default variables.

As I was trying to upgrade my very first - and bad - theme, I already knew which colour scheme to use, so all I did was replacing the defaults with my colours and add a few others that I might need in the future.

## Navbar and Footer

After reading bootstrap's documentation, creating a navbar seem to be a very quick and easy thing to do. Never was I so wrong in my life.

The elements didn't position how I wanted, the bar looked pretty strange and I spend almost a full day playing around with it, until I got something that looked good and I was happy with. Half of this time was also spent on trying to make the hamburger menu work (it didn't, so I used a font awesome icon to replace it).

Luckily, the footer was easier to create. I had fun especially when making the latest post part of the footer. By using a for loop in liquid and a variable, that increases by 1 when a post is not marked as a Project.

## Posts

To make things easier everything is a post on the theme. So a project is nothing, but a post in the _Projects_ category. I also wanted the possibility to highlight certain posts, so I created a _Featured_ tag, that puts these posts on top of the normal ones.

The blog page was quite fun to create.

Since I wanted to move the image of every second post to the right, I took the modulo of the loop's index with the code `assign mod = forloop.index | modulo: 2`, then all went down to a simple test to see if the value of _mod_  was equal to 0 or 1.

## CSS

Working with CSS rules was extremely fun. It's interesting to see how much can change, when you replace a value for something else.

I encountered my share of struggles when it came to try and keep all the elements tied together. Padding created some problems as well, but managed to fix them after several tries. Working with Sass also made things so much easier, since the use of variables keeps the theme consistent.

# The Struggles

Perhaps, the biggest issue that I've encountered while creating the theme, was when an element didn't look exactly like the others. I've learned, that using padding in the wrong place can really mess up the design on smaller screens.

Looking back, I've also realised how much time I've spent on little details. Sometimes something seems easy to do in your head, but when you start working on it, it will take far longer than you were prepared for.

All this time spent creating the theme, made me put on hold my other things. I didn't do any courses, nor did I contribute to Open Source, all my time was being used in designing the theme. Now that the theme is pretty much finished, I feel the urge to catch up with the time and do a million things in a day.

Finally, I would like to say how much I enjoyed working with Liquid. It is such a nice language, that allowed me to shape every page of the theme without any issues. From time to time, I had to read the documentation, but that is expected. Liquid sure helped me keep the code short and allowed me to modify a lot of things with their control flow.

**Credit:** [Photo by Galymzhan Abdugalimov on Unsplash](https://unsplash.com/photos/ICW6QYOcdlg)
