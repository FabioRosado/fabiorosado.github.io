---
layout: post
title:  Creating an Weather App
subtitle: Connect to an API using Vue and Axios
date:   2018-08-25 16:50:00
categories: Vue
category_icon: <i class="fab fa-vuejs"></i>
image: weatherApp.jpg
excerpt: Using VueJs with Axios to connect to OpenWeatherMap API then we build a simple weather web application.
---

One of the challenges on freecodecamp is to build a [weather app](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/show-the-local-weather/). The idea is pretty simple. Get the weather data from the API provided, build a function to convert the temperature from Celsius to Fahrenheit and show the current weather.

In this article, I'm not going to write a walkthrough on how to solve this challenge fully, but this might be a good start, if you have no clue what to do.

What I am going to show you, is how to use Vue and Axios to connect to the [OpenWeatherMap Api](https://openweathermap.org), get the weather data from a town(London) and display it.

# The OpenWeatherMap API

In order for you to connect to the API you need an API Key, otherwise, the server will just reject your connection attempt.

You can get a free API Key by clicking the `subscribe` button under the Current Weather Data in [this page](https://openweathermap.org/api).

The API will return you the data in JSON format, but you will need to provide a few things in order to get it:

* The endpoint
* The API Key
* The units to get the data (Celsius, Fahrenheit) - defaults to imperial
* Either the city name, coordinates, zip code or city id

You can check the parameters that the API expects you to pass to get the right JSON data from the [documentation page](https://openweathermap.org/current).

In this article, I am declaring **metric (Celsius)** as the unit and **London** as the city name. So the API link will look like this:

`http://api.openweathermap.org/data/2.5/weather` + `?q=London` +`&?units=metric` + `&APPID={API KEY}`

I have divided the link, so you can see how to add parameters to the API endpoint to get the data that you want.

This is how the API link will look like:

`http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}`

If you add your API Key at the end of the link and paste it into your browser, you will get all the data you need. Now, all we have to do, is to get that data into Vue.

# Getting the Weather Data with Axios

In Javascript, you can use different tools to get data from an API. In this article, I am using axios. The way you get data from the API doesn't really change much. If you use a different tool you shouldn't have any issues.

To use axios you can either do `npm install axios` or add the CDN link `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>` to your page. 

_In this article I am using axios from the CDN link._

The code that you need to write is pretty straightforward. First, we call axios, then we do a get request from an URL and then we either get a response or catch an error if one is returned. 

The code will look like this:

```js
axios
  .get(url)
  .then(response => {
    console.log(response.data);
})
  .catch(error => {
    console.log(error);
});
```

If you are wondering why we are getting `response.data` and not just response, the reason for this is simple. The `response` will not only return the data, but also status code, headers and the type of request made.

Use the OpenWeatherMap URL and add another `console.log(response);` and see what you get when you run the code.

# Creating the Vue app

I am not going into depth about [VueJs](https://vuejs.org/v2/guide/) or how to create an app with it. But the very quick basics is that you create an app by triggering the Vue object to a div id.

A Vue app looks like this:

```js
let weather = new Vue ({
  el: "#app",
  data: {

  },
  methods: {
  
  }
})
```

The `el` parameter is the `id` of the div inside your `html`. This div id is usually called `app` but you can name it whatever you wish, just make sure you change `el` inside the Vue object.

The `data` parameter contains all the data that you might need for your app, usually, you would create variables here and then use or modify them. This is also where VueJs will try to get the variable names to translate the tags `{{name}}` in our HTML.

The `methods` parameter is where you specify all the functions that you might want to call when using the app.

In order to use VueJs you have to install it either with the command, `npm install vue` or add the CDN link `<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>` on your page.

I hope this very quick and brief introduction helps you to make sense of things with Vue if you don't know anything about this framework.

# Building the Weather App

Now that we have the basic knowledge on how to connect to the OpenWeatherMap API, how to use axios and how to create a Vue app, I will show you how to create the weather app.


## HTML & CSS
The HTML for the app will be quite basic. The page will have a background and a centre div with the `id="app"` that Vue will use. This div will also have a simple background image just to make it look nicer.

So, let's start by creating the HTML code. We will import our `css` and `js` files to have a working webpage, we will also import VueJs, axios and the two fonts that we will use in our app.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Weather App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:extra-light|Vast+Shadow" rel="stylesheet">
  </head>

  <body>
    <div id="app">
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="main.js"></script>
  </body>

</html>
```

Now that all the needed files are imported and the page has a title, we will create the skeleton for our div. In order for your data to be displayed, you will use the format `{{ variableName }}`, this `variableName` will be the name used within the Vue `data` in our Vuejs app.


The HTML will be divided into three parts. The left top part that will show the icon, the current weather and the description of the weather. The right top part which will show the min and max temperatures of the day. Finally, the bottom part where we will display other information such as humidity, pressure, the time of the sunrise/sunset and the wind speed.

The `<div id="app">` will look like this:

```html
<div id="app">
  <div id="weather">
    <img src="images/sunny.svg"> {{overcast}}
    <span class="temperature">{{currentTemp}}°</span><br>
    <span id="temp-values">Min {{minTemp}}° <br> Max {{maxTemp}}°</span>
  </div>
  <div id="info">
    <img class="icon" :src=icon> {{sunrise}}
    <img class="icon" src="images/sunset.svg"> {{sunset}}
    <img class="icon" src="images/humidity.svg"> {{humidity}}
    <img class="icon" src="images/pressure.svg"> {{pressure}}
    <img class="icon" src="images/wind.svg"> {{wind}}
  </div>
```

Now that the skeleton of the page is done, we need to update our `main.css` file in order to have the page look a little bit better.

_Note: The code that I am going to show you here isn't responsive and it's a bit hacky. I'm sure there is a better way to do things, but it will do for the purpose of this tutorial._

### main.css File

```css
body {
  background: #3d4869; /* Old browsers */
  background: -moz-linear-gradient(#3d4869, #263048) fixed; /* FF3.6-15 */
  background: -webkit-linear-gradient(#3d4869,#263048) fixed; /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(#3d4869,#263048) fixed; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  background-repeat: no-repeat;

  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  text-shadow: 0px 0px 2px #000000;
  color: #ffffff;
}

#app {
  background: url(images/waves.svg) no-repeat;

  width:    520px;
  height:   170px;

  position: absolute;
  top:      35%;
  left:     35%;
}

#weather {
  padding: 15px;
  vertical-align: middle;
}

.temperature {
  font-family: 'Vast Shadow', cursive;
  font-size: 40px;
  vertical-align: top;
  position: absolute;
  left: 80px;
}

#temp-values {
  text-align: right;
  text-justify: distribute;
  display: block;
  position: relative;
  top: -60px;
}

#info {
  padding-left: 20px;
  position: relative;
  top: -20px;
}

.icon {
  position: inherit;
  top: 2px;
  padding-left: 8px;
}
```

### index.html file

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Weather App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:extra-light|Vast+Shadow" rel="stylesheet">
  </head>

  <body>
    <div id="app">
      <div id="weather">
        <img src="images/sunny.svg"> {{overcast}}
        <span class="temperature">{{currentTemp}}°</span><br>
        <span id="temp-values">Min {{minTemp}}° <br> Max {{maxTemp}}°</span>
      </div>
      <div id="info">
        <img class="icon" :src=icon> {{sunrise}}
        <img class="icon" src="images/sunset.svg"> {{sunset}}
        <img class="icon" src="images/humidity.svg"> {{humidity}}
        <img class="icon" src="images/pressure.svg"> {{pressure}}
        <img class="icon" src="images/wind.svg"> {{wind}}
      </div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

If you try to open the page you will notice that the app doesn't look that great at the moment, that's because we don't have Vue doing the heavy lifting for us. Let's go ahead and fix this.

_Note: that I'm using SVG files for the weather app background and icons, you can get the files [here](https://github.com/FabioRosado/fabiorosado.github.io/tree/master/assets/files/weather-tutorial)_.


# Vue

Vue and axios are already imported through the script tag located in our html code, what means that we are ready to start giving shape to our app.

```js
let weatherApp = new Vue ({
  el: '#app',
  data: {

  },
  methods: {
    getWeather() {
    },
  }
  beforeMount() {
    this.getWeather();
    }
});
```

The code will be pretty straightforward, we initiate a new Vue app attached to the div with the id `app`. Inside the Vue app, we declare all the needed variables inside the `data` object, these variables will be the ones we will use to populate with the information obtained through the API.

Also, we declare a method called `getWeather`, this is the method that will use axios to get all the information we need from the OpenWeatherMap API.

We want the weather app to show the current weather and other weather information such as:

* Minimum temperature for the day
* Maximum temperature for the day
* Sunset time
* Sunrise time
* Wind speed
* Pressure
* Humidity percentage

The API will return all of these details so we don't need to do much. Inside our Vue object, we will declare all the variables that we need to update the tags (`{{variableName}}`) in our HTML, once we connect to the API and get the needed data.

The data object inside our VueJs will look like this:

```
data: {
  currentTemp: '',
  minTemp: '',
  maxTemp: '',
  sunrise: '',
  sunset:'',
  pressure: '',
  humidity: '',
  wind: '',
  overcast: '',
  icon: ''
  },

```

## Getting API Data with Axios

The OpenWeatherMap API returns a JSON response that looks like this:

```json
{
    "coord": {
        "lon": -0.13,
        "lat": 51.51
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 24.82,
        "pressure": 1016,
        "humidity": 51,
        "temp_min": 23,
        "temp_max": 27
    },
    "visibility": 10000,
    "wind": {
        "speed": 8.2,
        "deg": 270
    },
    "clouds": {
        "all": 75
    },
    "dt": 1534695600,
    "sys": {
        "type": 1,
        "id": 5091,
        "message": 0.003,
        "country": "GB",
        "sunrise": 1534654394,
        "sunset": 1534706018
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
}
```

We are going to use our earlier example of [axios](#getting-the-weather-data-with-axios) to build the `getWeather` method of our Vue app. This method will look like this:

```js
getWeather() {
  let url = "http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}";
  axios
    .get(url)
    .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
  })
  .catch(error => {
    console.log(error);
  })
}
```

As you can see by the JSON response that we get from the API, the above code is simply assigning each bit of data retrieved from the API to the variables declared in the `data` object in Vue, this will allow us to use the data everywhere in the app.

Notice that we are adding something to some variables.

In the `icon` variable we add the path for the images folder, the file name and file extension. When Vue runs it will change the `src` of the image to whatever the value inside `icon` is.

For the file name, we will slice the string that we get from the API from the char located on index 0 up to char at index 2 - this is because OpenWeatherMap changes the icon name depending on if it is day or night.

The `sunrise` and `sunset` times are given in Unix epoch time, so we just convert the time to a human-readable format and then slice the string in order to get only the hours and minutes.

Your `main.js` file and the Vue app should look like this now:

```js
let weatherApp = new Vue({
  el: '#app',
  data: {
    currentTemp: '',
    minTemp: '',
    maxTemp:'',
    sunrise: '',
    sunset: '',
    pressure: '',
    humidity: '',
    wind: '',
    overcast: '',
    icon: ''
  },
  methods: {
    getWeather() {
      let url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID={Your API Key}";
      axios
        .get(url)
        .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  beforeMount() {
    this.getWeather();
  },
});
```

Replace `{Your API Key}` with the API key that you obtained from OpenWeatherMap and reload the page, you should see the app with the current weather data now.

# Conclusion

This post was rather long, I would like to first thank you for sticking up with it. I hope you learned how to use axios and Vue together to get data from an API. I would like now to ask you if you would like something to be explained more clearly or if you would like me to explain something else.

Finally, what was the first thing you created by using an API?