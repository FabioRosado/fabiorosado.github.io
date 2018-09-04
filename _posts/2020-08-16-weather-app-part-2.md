---
layout: post
title:  Weather App - Using geolocation and Vue
subtitle: Get the weather data from the user location
date:   2018-09-04 18:38:00
categories: Vue
tag-icon: <i class="fab fa-vuejs"></i>
image: weatherApp.jpg
excerpt: Learn how to implement HTML5 Geolocation API and VueJs together to get the current location of an user.
---

In this post, I will be using the same files as my previous tutorial - [Creating a weather app: using Vue and Axios](https://fabiorosado.github.io/vue/weather-app/) - because what I will show you is tightly tied to the previous tutorial.

*You might be wondering, why I am writing this post.*

The previous tutorial was an introduction to Vue and Axios, but the location was hardcoded in the Vue app. If you want a working weather app you will only be able to get the weather in London and not your city.

*Do you need to read the previous tutorial to follow this one?*

No. You can just [get the needed files](https://github.com/FabioRosado/fabiorosado.github.io/tree/master/assets/files/weather-tutorial) and start where we left off. You will also need to get an [API key from OpenWeatherMap](https://openweathermap.org/api) so you can get the weather information.

# Geolocation

HTML5 offers a Geolocation API so you can get the location of a user - in this case, you. Geolocation is also available on 93% of the browsers according to [Can I use](https://caniuse.com/#search=geolocation), which means that most browsers support this function.

When using geolocation you need to know a few things:

- The user needs to approve the request to share the location
- Geolocation is more accurate for devices with GPS
- Geolocation API will only work on secure contexts such as HTTP (some browsers won't ask for the permission and get decline straight away).

Because geolocation is dependent on the user accepting to share the location, we should have a strategy when our app can't get the location. 

A final thing worth to mention. I have tried a few ways to make geolocation work with Vue. A lot of them failed, but in the end, I was able to make it work by creating a function to check if geolocation is enabled. If it was, then a new function would be called and we would get the latitude and longitude details.

# VueJs

Our VueJs app was left in this state:

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

Immediately, we can see that the method `getWeather` will need to be refactored because the API URL is hardcoded to display the weather in London only. The rest of the function seems to be pretty good since we are just assigning values obtained from the API. If we change the URL bit everything will stay the same.

```js
    getWeather(url) {
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
```

The variable `URL` was deleted and we are simply adding a parameter `url` to the `getWeather` function. Now, we can get our hands into creating methods for the geolocation and getting the URL.

First, we will add two constant variables to the top of our main.js file(lines 1 and 2):

```js
const API = 'http://api.openweathermap.org/data/2.5/weather?units=metric'
const KEY = '&APPID={Your API Key Here}'
```

Now inside the VueJs app we will create two methods:

- `geolocation()`
- `buildUrl(position)`

As I said before, geolocation needs to have a function as a parameter if we want to do something with the latitude and longitude obtained through the browser. The method `buildUrl(position)` is just that, the position parameter will be used to extract these two things.

## Methods for the geolocation

The methods will be quite simple to understand, first, we will call the `getCurrentPosition` method from the Geolocation API. The two parameters passed are callback functions - one if it was successful(`this.buildUrl`) and one if an error was returned(`this.geoError`).

```js
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
    },
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeather(API + '&lat=' + lat + '&lon=' + lon + KEY);
    },
    geoError(error) {
      this.getWeather(API + '&lat=0&lon=0' + KEY);
    }
```

As you can see the methods are pretty straightforward, we are simply building the API URL depending on how successful it was to get the user location, if not then we will just use 0,0 as location. _Bonus points if you figure out where it is._

One final change we need to do to the VueJs app is replacing the method being called on `beforeMount()`. Instead of calling `this.getWeather()` we need to call `this.geolocation()`.

Our `main.js` file will look like this:

```js
const API = 'http://api.openweathermap.org/data/2.5/weather?units=metric'
const KEY = '&APPID=9ef28fe3735a820928decffcf48f5c3f'

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
    icon: '',
    location: ''
  },
  methods: {
    getWeather(url) {
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
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5);
      })
      .catch(error => {
        console.log(error);
      });
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
    },
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeather(API + '&lat=' + lat + '&lon=' + lon + KEY);
    },
    geoError(error) {
      this.getWeather(API + '&lat=0&lon=0' + KEY);
    }
  },
  beforeMount() {
    this.geolocation();
  },
});
```

# Conclusion

This is a very brief tutorial on how to use the Geolocation API with VueJs. The reason why I decided to write this tutorial was because I had plenty of issues trying to make it work on my [Quote and Weather landing page](https://github.com/FabioRosado/landing-page) so hopefully, this will help you in case you are stuck.

Finally, we should probably change the app so it shows the current location in order for our users to know which weather data did they get. I will leave this challenge for you to complete - you might have to fix the CSS a bit as well if you add the location.

_You can [get the updated main.js file here.](https://github.com/FabioRosado/fabiorosado.github.io/tree/master/assets/files/weather-tutorial%20part%20II)_