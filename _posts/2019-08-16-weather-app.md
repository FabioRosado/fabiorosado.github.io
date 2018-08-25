---
layout: post
title:  Creating an Weather App
subtitle: Connect to an API using Vue and Axios
date:   2018-08-16 15:25:00
categories: Vue
tag-icon: <i class="fab fa-vuejs"></i>
image: 
excerpt: A landing page that shows quotes, current weather and time, it also has a list of to do and notes.
---

# Connecting to an API with Vue and Axios

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

You can check the parameters that the API expects you to pass in order to get the right JSON data from the [documentation page](https://openweathermap.org/current).

In this article I am declaring **celsius** as unit and **London** as city name. So the API link will look like this:

`http://api.openweathermap.org/data/2.5/weather` + `?q=London` +`&?units=metric` + `&APPID={API KEY}`

I have divided the link in order for you to see how you can add parameters to the API endpoint in order to get the data that you want. 

This is how the API link will look like:

`http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}`

If you add your API Key at the end of the link and paste it on your browser, you will get all the data you need. Now all we have to do is to get that data into Vue.


## Getting the Weather Data with Axios


In Javascript you can use with different tools to get data from an API. In this article I am using axios. The way you get data from the API doesn't really change much if you use a different tool, so you shouldn't have any issues using something different.

To use axios you can either do `npm install axios` or add the CDN link `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>` to the header of your page. 

In this article I am using axios from the CDN link.

The code is pretty straight forward. First we call axios, then we do a get request from an url and then we either get a response or catch an error if one is returned. 

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

In order to use VueJs you have to install it either with the command `npm install vue` or add the CDN link `<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>` on the header of your page.

I hope this very quick and brief introduction helps you making sense of things with Vue if you don't know about this framework.


## Building the Weather App

Now that we have the basic knowledge on how to connect to the OpenWeatherMap API, how to use axios and how to create a Vue app, I will show you how to create the weather app.

---
### HTML & CSS
The HTML for the app will be quite basic, it will contain a background color and a center div where we will display the weather.

Let's start by creating the HTML code, we will import our `css` and `js` files in order to have a working webpage, we will also import Vuejs, axios and the two fonts that we will use.

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

Now that all the needed files are imported and the page has a title, we will create the skeleton for our div. In order for your data to be displayed you will use the format `{{ variableName }}`, the variable name will be the one located in `data` in our Vuejs app.

_Note: The code that I am going to show you here isn't responsive and it's a bit hacky but it works for the porpose of this tutorial._

Both the HTML and CSS for the page will be quite easy to understand, you can either try to understand or just copy the code into your favourite editor. Note that I'm using SVG files for the weather app background and icons, you can get the files [here]([fabiorosado.github.io/assets at master · FabioRosado/fabiorosado.github.io · GitHub](https://github.com/FabioRosado/fabiorosado.github.io/tree/master/assets/files/weather-tutorial).

#### HTML

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
        <img class="icon" src="images/sunrise.svg"> {{sunrise}}
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

#### CSS
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


If you try to open the page you will notice that the app doesn't look that great at the moment, that's because we don't have Vue doing the heavy lifting for us. Let's go ahead and fix this.


---

### Vue
Vue and axios are already imported through the script tag located in the header of our html code, which means that we are read to start giving shape to our app.

```javascript
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

The code will be pretty straightforward, we instiate a new Vue app attached to the div with the id `app`. Inside the Vue app we declare all the needed variables inside the `data` object, these variables will be the ones we will use to populate with the information obtained through the API.

Also, we declare a method called `getWeather`, this is the method that will use axios to get all the information we need from the OpenWeatherMap API.


We want the weather app to show the current weather an other weather information such as:

* Mininum temperature for the day
* Maximum temperature for the day
* Sunset time
* Sunrise time
* Wind speed
* Pressure
* Humidity percentage

The API will return all of these details so we don't need to do much. Inside our VueJs w e will declare all the variables that we need in order to change the values in our HTML once we connect to the API and get the needed information.

The data object inside our VueJs will look like this:

```javascript
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

```


#### Getting API Data with Axios

The Openweathermap API returns a JSON response that looks like this:

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

```JavaScript
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
          this.icon = response.data.weather[0].icon.slice(0, 2);
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
  })
  .catch(error => {
    console.log(error);
  })
}
```
As you can see by the JSON response that we get from the API, the above code is simply assigning each bit of data retrieved from the API to the variables declared in the `data` object in Vue, this will allow us to use the data everywhere in the app.

Notice that we are doing something else to `icon` and both the `sunset` and `sunrise` variables. The icon we are slicing the string from the char located on index 0 up to char at index 2 - this is because openweathermap changes the icon depending if its day or night time.

The `sunrise` and `sunset` times are given in unix epoch time, so we just convert the time to an human readable format and then slice the string in order to get only the hours and minutes.


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
          this.icon = response.data.weather[0].icon.slice(0, 2);
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

Replace `{Your API Key}` with the API key that you obtained from openweathermap and reload the page, you should see the app with the current weather data now.
