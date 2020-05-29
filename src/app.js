const path = require("path");
const express = require("express");
const forecast = require("./util/forecast.js");
const geocode = require("./util/geocode.js");

const app = express();
const hbs = require("hbs");

// define paths for Express config
const viewPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsDirectory = path.join(__dirname, "../templates/partials");

// Setup handelbars engine and view location

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsDirectory);

// console.log(publicDirectoryPath);

//For serving static page!
// app.use(express.static(path.join(__dirname)))

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "harsh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "shubham",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "siddesh",
  });
});

// app.get('/help', (req, res) => {
//     res.send('home page')
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>About</h1>')
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        // res.send(location);
        res.send({
          location: location,
          forecast: forecastData,
        });
        // console.log(forecastData);
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Help article not found",
    name: "harsh",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Page not found:",
    name: "shubham",
  });
});

app.listen(3000, () => {
  console.log("server running at 3000");
});
