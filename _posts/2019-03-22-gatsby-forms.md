---
layout: post
title:  Handle form submission in Gatsby with Airtable
subtitle: Send forms directly to your Airtable Base
author: "FabioRosado"
date:   2019-03-22 12:50:00
categories: Gatsby
category_icon: <i class="fab fa-js-square"></i>
image: forms.jpg
excerpt: Submit your forms from your Gatsby website directly to your Airtable in a very easy and simple way.
---

I am currently building [Find Communities Today](https://findcommunities.today), a place where you can find communities online. I wanted to allow users to submit their favourite community so I added a page with a form that users could fill out and submit.

Initially, I was using an `<iframe>` with the form created by Airtable, but the page would take ages to load so I decided to try and make a form myself and sent it to Airtable.

# What will you need

- [Airtable Account](https://airtable.com/invite/r/abr1Wgbb) - This is my referal link.
- [Netlify Account](https://www.netlify.com) - I'm using environmental variables with Netlify
- [Gatsby](https://www.gatsbyjs.org/docs/environment-variables/) - Gatsby handles environmental variables automatically.
- .env folder - I am going to mention environmental variables

This example will be quite simple. Find Communities Today is being served by Netlify directly from a private repo of GitHub. I am already using Netlify forms for people to report problems with the details of a community, so I didn't want to use Netlify to handle this form.

Also, Airtable is pretty awesome when you need to see the data in a logical way. Since I had created the base in my Airtable, I decided to keep using it to handle the submission of the communities.

# Setting up Airtable

[Sign up to Airtable](https://airtable.com/invite/r/abr1Wgbb) if you haven't done so and then log in. There are a lot of templates that you can use, but we will start with a brand new one.

Press the button `+ Add a Base` and from the dropdown menu choose `start from scratch`, choose a name and press `Enter`. Airtable will create a spreadsheet with three columns

- Name
- Notes
- Attachments

Fill the first row with some random text and then on the bottom right corner look for the yellow icon with three dots. Click it and choose `API Documentation`

Then scroll down until you are on the `Create record`. On the right, you can see the curl call. This will help when we build the API call when submitting the form.

Finally, you will need your API key. Go to your [Airtable Account](https://airtable.com/account) and click on Generate API key, click the input field so you can see the key and copy it.

# Setting up the site

If you have never used Gatsby I'd recommend that you read the great tutorial on the [official Gatsby site](https://www.gatsbyjs.org/docs/quick-start).

Install Gatsby Cli with the command

```shell
npm install --global gatsby-cli
```

Then run this command to create a new site and change directory into the new folder.

```shell
gatsby new gatsby-site && cd gatsby-site
```

Finally, open the folder on your favourite code editor and run the following command to get your site running.

```
gatsby develop
```

# Create an Environmental Variable

If you are using Netlify, you can just head over to `Build & Deploy` tab and scroll down until you find the "Build environment variables", make sure your environmental variable starts with `GATSBY_<name>` so you can store your API key on a variable with the name `GATSBY_AIRTABLE` for example.

If you just want to test this with Gatsby on your development version, you can just create the file `.env.development` on the root of your project and then add the API key from airtable like this: `AIRTABLE_API=<your API key here>`.

Then, when you want to use your API key all you need to do is type `process.env.AIRTABLE_API` and Gatsby will automatically translate that into your API key.

# Build the form

Let's finally build the form. Create a new page on your `pages` folder, call it `contact` and add the following code to the page.

```react
import React from "react"

class Contact extends React.component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = e => {
    console.log(this.state);

    e.preventDefault();
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    return() (
      <form>
        <label>
          Name
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <label>
          Notes
          <input type="text" name="notes" onChange={this.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

Head over to [http://localhost:8000/contact](http://localhost:8000/contact), you will see the quite ugly form that we have created. Open devtools and then fill the form, you will see that whatever you just typed on the input fields will be logged into the console.

As you can see, our component is keeping track of what is being written to the input fields. We can now call Airtable API and send this to our base.

# Submit to Airtable

The API post request will be done in the `handleSubmit` method. Make sure you are on the *Create a record* in the API Documentation because you will need to know the URL to send the post request.

```js
handleSubmit = e => {
  const fields = {"fields": {"Name": this.state.name, "Notes": this.state.notes}}
  fetch("https://api.airtable.com/v0/<account id>/<table name>", {
    method: "POST",
    headers: {"Authorization": `Bearer ${process.env.AIRTABLE_API}`,
              "Content-Type": "application/json"},
    body: JSON.stringify(fields)
  })
  .then(() => alert("Form Sent!"))
  .catch(error => alert(error))

  e.preventDefault();
}

```

Notice that I am using backticks on the Authorization header if you want you can just write it like this: `"Bearer "  + process.env.AIRTABLE_API"`. Also, make sure you are passing the environmental variable with the exact name as on your `.env.development` file.


# Full code

So the full working code will look like this

```react
import React from "react"

class Contact extends React.component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = e => {
    const fields = {"fields": {"Name": this.state.name, "Notes": this.state.notes}}
    fetch("https://api.airtable.com/v0/<account id>/<table name>", {
      method: "POST",
      headers: {"Authorization": `Bearer ${process.env.AIRTABLE_API}`,
                "Content-Type": "application/json"},
      body: JSON.stringify(fields)
    })
    .then(() => alert("Form Sent!"))
    .catch(error => alert(error))

    e.preventDefault();
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    return() (
      <form>
        <label>
          Name
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <label>
          Notes
          <input type="text" name="notes" onChange={this.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

If you are using Netlify don't forget to change the environmental variable to `GATSBY_<your env variable name>`.

Note that you will need to change the form to use it in production, you probably want to change the input names, the airtable columns names and also create a honeypot to avoid bots from spamming your Airtable base. This was meant to be a quick and simple way to use the Airtable API to submit a form.

Let me know what you think about this. Also, let me know if there is a better way to do this or if you have any issue when trying the code!