// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8080;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));



app.post('/save', (req, res) => {
	projectData.temp = req.body.temp;
	projectData.date = req.body.date;
	projectData.response = req.body.response;
	res.send(projectData);
});


app.get('/weather', (req, res) => {
	res.send(projectData);
});


// Setup Server
app.listen(port, () => {
	console.log(`App runnint at localhost:${port}`);
});