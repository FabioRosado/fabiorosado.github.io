---
layout: post
title:  Quote and Weather
date:   2018-08-16 15:25:00
categories: Projects
tag: Landing Page
tag-icon: <i class="fas fa-file"></i>
image: landingpage.jpg
excerpt: A landing page that shows quotes, current weather and time, it also has a list of to do and notes.
---

&nbsp;
# Overview
-----
&nbsp;

- **The Good**
  - The background updates depending on the weather outside
  - The clock updated every second
  - To do and Notes list fully functional
- **The Bad**
  - Used Bulma.io but it wasn't really necessary
  - The weather status should be updated from time to time
  - The weather bit is not fully included in Vue as it relies on external functions -  they should be added to the component
- **The Ugly**
  - On a small screen, a few elements look wonky
  - The Notes List area moves slightly when the To Do list is open/closed
  - Used mostly ES6 syntax - not compatible with some browsers
  - The API key for openweathermap shouldn't be hardcoded on the `main.js` file

&nbsp;
# Explanation
-----
&nbsp;

The idea of creating a Landing page that shows quotes and the current weather came to me when doing the challenges on freecodecamp. Two of the javascript challenges were to create two separated apps - one a weather station, one for quotes.

I thought it could be cool to have a page that shows both. So I spent a few hours brainstorming about the landing page and what sort of things I would like to add to it. A To Do List, a Notes List and a clock seemed like a good thing to add.

With the idea in my head, I wanted a guide that I could follow while creating the app. I sketched the basic idea on a piece of paper and then opened up [GravitDesigner](https://designer.io) and designed the landing page.

Since I wanted to learn VueJS I took the opportunity to use it and create a project. I had issues with using geolocation and Vue together, so as a workaround I wrote basic javascript code to call the [OpenWeatherMap API](https://openweathermap.org).

One thing I wanted to do was to change the background of the page depending on the weather outside. A quick function was created so that it updates the page background depending on the name of the weather icon passed.

Once the page was showing the current weather, I jumped to the quotes. The hardest part was to try and find an API that generated quotes - after a long, long search I ended up using [FavQuotes Api](https://favqs.com).

Working on the To Do List created some issues - I thought you could create different VueJS apps before reading about components, so I had to do some refactoring and working around with the quotes app and integrate the to-do list.  It was a quite fun thing to do.

How to create a notes app kind of puzzled me, but in the end, I figured that it could be nothing more than an extended version of the To Do List so hack away I went and managed to make it work after struggling with a few bits.

### Few things I'm happy with

- How I used GravitDesigner to mock the landing page and use it while coding the page
- How I used VueJs to hide/unhide elements of the lists
- How I learned about things I needed to change in the app by observing my fiancé and mom using the landing page
- How I implemented a sort of Scrum board with trello to implement this project - it was good practice


&nbsp;
# Info
-----
&nbsp;

GitHub repo: [https://github.com/FabioRosado/landing-page/](https://github.com/FabioRosado/landing-page/)