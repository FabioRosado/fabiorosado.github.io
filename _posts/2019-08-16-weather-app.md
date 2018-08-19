---
layout: post
title:  Weather App
subtitle: Connecting to an API using Vue and Axios
date:   2018-08-16 15:25:00
categories: Vue
tag-icon: <i class="fab fa-vuejs"></i>
image: 
excerpt: A landing page that shows quotes, current weather and time, it also has a list of to do and notes.
---

One of the challenges on freecodecamp is to build a [weather app](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/show-the-local-weather/). The idea is pretty simple, get the weather data from the API provided, build a function to convert the temperature from Celsius to Fahrenheit and show the current weather.

In this article I'm not going to write a walkthrough on how to solve this challenge - but I can do in the future if you would like one. 

What I am going to show you, is how to use Vue and Axios to connect to [OpenWeatherMap Api](https://openweathermap.org), get the weather data from your town and display it.


## The OpenWeatherMap API

In order for you to connect to the API you need an API Key, otherwise the server will just reject your connection attempt.

You can get a free API Key by clicking the `subscribe` button under the Current Weather Data in [this page ](https://openweathermap.org/api).

The API will return you the data in JSON format, but you will need to provide a few things in order to get the data:

* The end point
* The API Key
* The units to get the data (Celsius, Fahrenheit)
* Either the city name, coordinates, zip code or city id

You can get all of this information from the [documentation page](https://openweathermap.org/current).

In this article I am declaring **celsius** as unit and **London** as city name. So the API link will look like this:

`http://api.openweathermap.org/data/2.5/weather` + `?q=London` +`&?units=metric` + `&APPID={API KEY}`

I have divided the link in order for you to see how you can add parameters to the API endpoint in order to get the data that you want. 

This is how the API link will look like:

`http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}`

If you add your API Key at the end of the link and paste it on your browser, you will get all the data you need. Now all we have to do is to get that data into Vue.


## Getting the Weather Data with Axios


In Javascript you can get data from an API with different tools, in this article I am using axios. The way you get data from the API doesn't really change much if you use a different tool, so you shouldn't have any issues using something different to connect to an API.

To use axios you can either do `npm install axios` or add `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>` to the header of your page. In this article I am using axios from the CDN link.

The code is pretty straight forward, first we call axios, then we do a get request from an url and then we get a response and catch an error if one is returned. 

The code will look like this:

```javascript
axios
  .get(url)
  .then(response => {
    console.log(response.data);
})
  .catch(error => {
    console.log(error);
});
```

As you can see the code is pretty straightforward, but perhaps you are wondering why we are getting `response.data` and not just response, the  reason for this is that `response` will return the data, but also status code, headers and the type of request made.


## Creating the Vue app

I am not going into depth about Vue and creating an app with it. But the very quick basics is that you create an app by triggering the Vue app to a div id.

A vue app looks like this:

```Javascript
let weather = new Vue ({
  el: "#app",
  data: {
    
  },
  methods: {
  
  }
})
```

The `el` parameter is the `id` of the div inside your `html`, this div is usually called `app` but you can name it whatever you wish, just make sure you change `el` inside the Vue.

The `data` parameter contains all the data that you might need for your app, usually you would create variables here and then use or modify them.

The `methods` parameter is were you specify all the functions that you might want to call when using the app.

I hope this very quick and brief introduction helps you making sense of things with Vue if you don't know about this framework.


## Building the Weather App

Now that we have the basic knowledge on how to connect to the OpenWeatherMap API, how to use axios and how to create a Vue app, I will show you how to create the weather app.

### HTML & CSS
The HTML for the app will be quite basic, it will contain a background color, a center piece where we will display the weather.



### Vue
Vue and axios are already imported through the script tag located in the header of our html code, which means that we are read to start giving shape to our app.

```javascript
let weatherApp = new Vue ({
  el: '#app',
  data: {
    city: '',
    country: '',
    temp: '',
    overcast: '', 
  },
  methods: {
    getWeather() {

  },
  mounted() {
    this.getWeather();
  }
});
```

The code will be pretty straightforward, we instiate a new Vue app attached to the div with the id `app`, inside the app we declare all the needed variables inside `data`, these variables will be the ones we will use to populate with the information obtained through the API.

Also, we declare a method called `getWeather`, this is the method that will use axios to get all the information we need from the OpenWeatherMap API.

*explain about the mounted bit*

We want the weather app to show the weather in the following format:

`12°C and cloudy in London, UK`

With the API it's quite easy to get these details, since it returns the temperature, the overcast, the city, the country.

So we will add the following to our data inside the Vue app:

```javascript
data: {
    city: '',
    country: '',
    temp: '',
    overcast: '', 
    weather: `${this.temp}°C and ${this.overcast} in ${this.city}, ${this.country}`
  },

```

The only reason why I decided to add this, is so we can just get the whole string build up once Vue is mounted.

#### Getting API Data with Axios

We are going to use our earlier example of [axios](getting-the-weather-data-with-axios) to build the `getWeather` method of our Vue app. This method will look like this:

```JavaScript
getWeather() {
  let url = "http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}";
  axios
    .get(url)
    .then(response => {
      this.city = response.data.name;
      this.country = response.data.sys.country ;
      this.temp = response.data.main.temp;
      this.overcast = response.data.weather[0].description ;
  })
  .catch(error => {
    console.log(error);
  })
}
```

Axios will connect to the API using the url provided and retrieve data with the following format:

```json
```

With the above code we are simply assigning each bit of data with the information retrieved from the API.