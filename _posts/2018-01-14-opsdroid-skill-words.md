---
layout: post
title:  Opsdroid Skill - Words
date:   2018-01-14 09:30:00 +0000
categories: Projects
tag: Chat Bot
tag-icon: <i class="fab fa-android"></i>
image: opsdroid-skill.jpg
excerpt: A skill to be used with Opsdroid that takes advantage of the NLTK library to allow opsdroid to translate or define a word. 

---
[Opsdroid](2017-10-01-opsdroid.md) is a chatbot framework powered by different kinds of skills - which are basically python functions that interact with Opsdroid. 
The skill - _words_ - takes advantage of the NLTK library to do things with words such as: 
- Providing help by unscrambling letters in a scrabble game
- Providing definitions for a word
- Translating a word from a language into another language

Each function of the skill uses regex and groups to trigger the event and give meaning to what the user wishes to do. 

&nbsp;
# The Good
------
&nbsp;

- The scrabble helper only returns words that are at least 4 characters long
- If there is a long list of words that the user can form with the letters, 5 random words from that list are suggested
- The dictionary function gives a good basic information about a word
- Translating a word from English to another language works well

&nbsp;
# The Not So Good
------
&nbsp;
- When the user triggers a function it takes between 1-3 seconds for results to appear
- Translating a word from a language other than English might not return any results
- The dictionary function doesn't show all the definitions of a word
- The dictionary examples come up as empty sometimes
- The synonyms list in the dictionary doesn't really show up synonyms


&nbsp;
# How it all came to be
------
&nbsp;

By doing the _100 Days Of Code_ challenge and working on the challenges on Pybites. 
On challenge 5, we need to compare two twitter accounts and get the similarity index from them, after a quick research I figured it out that I could use NLTK to solve the issue. I spent a few days reading the documentation and working the examples. 
That's when I thought that perhaps we could implement these things in opsdroid. I started working on the idea and the skill - _words_ came to be.
 
There are still plenty of things that can be improved and I have plans to fix the issues in order to make this skill even better and more pleasant to use.


&nbsp;
# Info
------
&nbsp;

**GitHub repo:** [https://github.com/opsdroid/skill-words](https://github.com/opsdroid/skill-words)
