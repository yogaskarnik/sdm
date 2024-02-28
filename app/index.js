const PORT = process.env.SERVER_PORT || 3000;
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  path = require('path');
mongoose = require('mongoose');
sessions = require('express-session');
const axios = require('axios');

mongoose = require('mongoose');
mongoose.connect(`mongodb://mongodb:27017/sdm`, (err, res) => {
  if (err) console.log(`ERROR: connecting to Database ${err}`);
  else console.log('Database Online');
});

// ImPORT routes of our app
//var routes = require('./routes/main');

// view engine setup and other configurations
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  sessions({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, welcome to SportStream!');
});

app.post('/api/location/retrieve', async (req, res) => {
  console.log(req.body);
  const options = {
    method: 'POST',
    url: 'https://location-retrieval.p-eu.rapidapi.com/retrieve',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '045a41f880msh934bba06750a7c5p137aadjsnd3cbc9a8e472',
      'X-RapidAPI-Host': 'location-retrieval.nokia.rapidapi.com',
    },
    data: {
      device: {
        phoneNumber: '21431000030',
      },
      maxAge: '60',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('DATA', response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get('/api/event-subscription', async (req, res) => {
  // Configuration for the external API request
  const options = {
    method: 'GET',
    url: 'https://device-status.p-eu.rapidapi.com/event-subscriptions/045a41f880msh934bba06750a7c5p137aadjsnd3cbc9a8e472',
    headers: {
      'X-RapidAPI-Key': '4ed0e194d0mshff39531bdaec257p1136e1jsnd62933539b8d',
      'X-RapidAPI-Host': 'device-status.nokia.rapidapi.com',
    },
  };

  try {
    // Make the GET request to the external API
    const response = await axios.request(options);
    // Send the response from the external API to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.listen(PORT, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`);
  else console.log(`Server is running on PORT ${PORT}`);
});
