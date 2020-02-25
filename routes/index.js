var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST weather search */
router.post('/', async function(req, res, next) {
  const weatherResults = await getWeather(req.body.weatherSearch, req.body.weatherFormat);
  console.log("API call finished");
  const displayResults = gatherResults(req.body.weatherHours, weatherResults);
  console.log(displayResults);
  res.render('index', { weather: weatherResults });
});

async function getWeather(input, urlChoice) {
  try {
    const weatherUrl = formatUrl(input, urlChoice);
    const response = await fetch(weatherUrl);

    if (response.status !== 200) {
      throw response.status;
    }

    const json = await response.json();
    return json;
  } 
  catch(error) {
    console.log()
    return error;
  }
}

function formatUrl(input, choice) {
  switch (choice) {
    case 'cs':
      const csQuery = parseInput(input);
      return `https://api.openweathermap.org/data/2.5/forecast?q=${csQuery[0]},${csQuery[1]}&appid=${process.env.OPENWEATHER_API_KEY}`;
    case 'z':
      return `https://api.openweathermap.org/data/2.5/forecast?zip=${input.trim()}&appid=${process.env.OPENWEATHER_API_KEY}`;
    case 'll':
      const llQuery = parseInput(input);
      return `https://api.openweathermap.org/data/2.5/forecast?lat=${llQuery[0]}&lon=${llQuery[1]}&appid=${process.env.OPENWEATHER_API_KEY}`;
    default:
      throw '400';
  }
}

/** 
 * parseInput()
 * Parses string input from form for API call
 */
function parseInput(input) {
  searchQuery = input.split(',', 2);
  for (let i = 0; i < searchQuery.length; i++) {
    searchQuery[i] = searchQuery[i].trim();
  }
  return searchQuery;
}

function gatherResults(hours, response) {

  let results = {};
  let days = [];
  let daysForecast = [];

  const startDate = getStartDate(hours, response);

  for (let i = 0; i < 3; i++) {
    days.push(addDays(startDate, i));
  }

  for (let i = 0; i < days.length; i++) {

    let currentDay = [];

    for (let j = 0; j < response.list.length; j++) {
      if (days[i] === response.list[j].dt_txt.slice(0, 10) && hours.includes(response.list[j].dt_txt.slice(11))) {
        // Add clear or not clear based on weather id
        if (response.list[j].weather[0].id >= 800 || (response.list[j].weather[0].id >= 700 && response.list[j].weather[0].id < 750)) {
          currentDay.push('Clear');
        } else {
          currentDay.push('Reconsider');
        }
      }
    }

    daysForecast.push(currentDay);
  }

  results.days = days;
  results.dayOne = daysForecast[0];
  results.dayTwo = daysForecast[1];
  results.dayThree = daysForecast[2];

  return results;
}


function getStartDate(hours, response) {
  let todayDate = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < response.list.length; i++) {
    const currentDate = response.list[i].dt_txt.slice(0, 10);
    // If the response contains hours for today and the hours selected have not passed yet, then the startDate is today
    if (response.list[i].dt_txt.slice(0, 10) == todayDate && hours.includes(response.list[i].dt_txt.slice(11))) {
      return todayDate;
    }
  }

  return addDays(todayDate, 1);
}

function addDays(oldDate, dayCount) {
  let nextDate = new Date(oldDate);
  nextDate.setDate(nextDate.getDate() + dayCount);
  return nextDate.toISOString().slice(0, 10);
}

module.exports = router;
