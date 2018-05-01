---
layout: post
title:  Improving a Classifier Training Speed
subtitle: Things I've learned while creating a tweets classifier
author: "FabioRosado"
date:   2018-02-17 18:10:02
categories: Code
category_icon:  <i class="fa fa-code" aria-hidden="true"></i>
image: galymzhan-abdugalimov-181.jpg
excerpt: A problem that I have encountered while working on a Pybites challenge, libraries used and how I have optimized the tweets classifier to be faster.
---
[Pybites challenge 07](https://pybit.es/codechallenge07.html) challenges us to create a sentiment analysis script that takes tweets related to a term and does some analysis in order to give us a positive/negative percentage of the general opinion of a term.

Since I was learning how to best user NLTK I have decided to use this library for the challenge. Working on this project was quite fun and I have learned quite a lot. In this post, I will show you I will tell you about my mistakes, how I worked around them and how to improve the classifier speed training.

&nbsp;
# Problem: Training the classifier on every tweet
-----
&nbsp;

My first mistake was running the method that trains the classifier on every tweet received. So if there are 2,000 tweets to analyse and each training takes 1 minute (it's more than that), it will take ages until you get the score of the term that you searched.

I didn't save this code but basically, I created a single function that did two things: it trained the classifier and gave the classification of a term. Straight away you can see that this was bad practice, things should be modular and in this case, the function should only do one thing.

Imagine scrapping 1,000 tweets and training the classifier on every single one of them in order to get the classification. This was a huge time sink and bad approach to the problem since the classifier data didn't change, it should be trained only once and that's it.

&nbsp;
# Solution: initializing the classifier on __init__
-----
&nbsp;

The solution was obvious - train the classifier once and be done with it.

At first, I was unsure how to do this, but then I realised that since the classifier was a class, I could just call the class once, train the classifier and then call a method on the class to get the classification of a term.

After experimenting a bit with the code, I've decided to try to initialize the method that trains the classifier on the `__init__` of the class. A soon as the class is instantiated the training of the classifier is the first thing to be done.

This speeded up the classification of 1000 tweets by a lot, but there is still room for improvement after all, the training data is still unchanged at this point. I had to come up with some way to optimize this process somehow.

&nbsp;
# Optimization: using pickle to save/load classifier
-----
&nbsp;

The only way to optimize the classifier and make it blazing fast would be to train it once, save the trained classifier somehow and use it in all other future terms that we wish to classify.

After a quick search, I came across the _pickle_ library, it was exactly what I needed. Pickling an object will simply save the object in its current state, you can then unpickle it whenever you want to use it in the future.

After the classifier finishes its training, I pickled it and added a piece of code to check if the pickled file with the name `classifier.pickle` is found in the directory of the program. If it is, then we have a trained classifier and we can simply load it and skip the training. 

Pickling a class method is as simple and doing `pickle.dump()`  on the method that we wish to save. To load up all we need is to add `pickle.load` to unpickle the file and return the classifier.

```python
    def save_classifier(self, classifier):
        with open('classifier.pickle', 'wb') as save_classifier:
            pickle.dump(classifier, save_classifier)

    def load_classifier(self):
        with open("classifier.pickle", "rb") as loaded_classifier:
            return pickle.load(loaded_classifier)
```


These were the two methods that I added to the `TweetsClassifier` class in order to call them on every run of the program.


&nbsp;
# Final thoughts
-----
&nbsp;

This was my first attempt at creating a classifier and my decision to just use the NLTK library probably made the program run a little bit slower than if I had opted for other libraries which use vectors in order to train and classify the data.

The classifier is not very accurate (79% accurate) due to the false positives (such as sarcasm) or due to repetitive tweets (this issue I finished by using a set of all the tweets gathered).

None the less, this was a very interesting exercise that gave me much pleasure when I saw the results of a term based off on twitter opinions.