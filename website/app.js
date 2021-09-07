/* Global Variables */

// open weather map API key
const apiKey = '6d3545c9499cdbd86bb7345dc6c9c767';
const weatherMapUrl = "https://api.openweathermap.org/data/2.5/weather" ;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();



const getWeatherMapApiData = async (url, zip, apiKey) => {
	const response = await fetch(`${url}?zip=${zip}&units=metric&appid=${apiKey}`);

	try {
		return await response.json();
	} catch (error) {
		console.log("error: ", error);
	}
};



// get the data from the server
const getData = async (url) => {
	const response = await fetch(url);
	try {
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};



const saveWeatherData = async (url, data) => {
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	try {
		const responseData = await response.json();
		return;
	} catch (error) {
		console.log("error: ", error);
	}
};


const updateUi = (data) => {
	document.getElementById('date').innerHTML = "Date: " + data.date;
	document.getElementById('temp').innerHTML = "Temprature: " + data.temp + ' &#8451';
	document.getElementById('content').innerHTML = `You are felling "${data.response}"`;
};


// Handle submit
document.getElementById('generate').addEventListener('click', (e) => {
	e.preventDefault();

	const zip = document.getElementById('zip').value.trim();
	const response = document.getElementById('feelings').value.trim();



	getWeatherMapApiData(weatherMapUrl, zip, apiKey)
	.then((res) => {
		saveWeatherData('/save', {temp: res.main.temp, date: newDate, response: response})
		.then(getData('weather').then(data => {
				updateUi(data)
				document.querySelector('form').reset();
			}

		))
	});


});