const fetch = require('node-fetch');

async function getWeather(input, urlChoice) {
  try {
    const weatherUrl = formatUrl(input, urlChoice);
    const response = await fetch(weatherUrl);

    const json = await response.json();
    return json;
  } 
  catch(error) {
    return error;
  }
}

/**
 * formButtonError()
 *
 * Checks if any of the form button inputs are undefined
 * Checks that there is only one format selected
 * Returns a boolean
 */
function formButtonError(hoursSelected, formatSelected) {

  if (typeof hoursSelected === 'undefined' || typeof formatSelected === 'undefined') {
    return true;
  }

  if (typeof formatSelected !== 'string') {
    return true;
  }

  return false;
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
      throw 400;
  }
}

/** 
 * parseInput()
 * Parses string input from form for API call
 */
function parseInput(input) {
  const searchQuery = input.split(',', 2);
  for (let i = 0; i < searchQuery.length; i++) {
    searchQuery[i] = searchQuery[i].trim();
  }
  return searchQuery;
}

function gatherResults(hours, response) {

  let hoursList = [];
  let days = [];

  let results = {};
  let displayHours = [];
  let displayDays = [];
  let daysForecast = [];

  const startDate = getStartDate(hours, response);

  // Case handling if one hour is selected, which is not an array but a string
  // Otherwise hoursList is pushed the values of the original hours array
  if (typeof hours === 'string') {
    hoursList.push(hours);
  } else {
    hoursList = [...hours];
  }

  // Convert hours into 12 hour clock format for display
  for (let i = 0; i < hoursList.length; i++) {
    switch (hoursList[i]) {
      case '00:00:00':
        displayHours.push('12:00 AM');
        break;
      case '03:00:00':
        displayHours.push('3:00 AM');
        break;
      case '06:00:00':
        displayHours.push('6:00 AM');
        break;
      case '09:00:00':
        displayHours.push('9:00 AM');
        break;
      case '12:00:00':
        displayHours.push('12:00 PM');
        break;
      case '15:00:00':
        displayHours.push('3:00 PM');
        break;
      case '18:00:00':
        displayHours.push('6:00 PM');
        break;
      case '21:00:00':
        displayHours.push('9:00 PM');
        break;
      default:
        displayHours.push('Error');
        break;
    }
  }

  // For usage in retrieving weather results for forecast results
  // Later parsed for display
  for (let i = 0; i < 3; i++) {
    days.push(addDays(startDate, i));
  }

  // Go through each day, check that the date is in the days list
  // Also check that the hour is in the hour list
  // Then check the weather code and assign the status for that day
  for (let i = 0; i < days.length; i++) {

    let currentDay = [];

    for (let j = 0; j < response.list.length; j++) {
      if (days[i] === response.list[j].dt_txt.slice(0, 10) && hoursList.includes(response.list[j].dt_txt.slice(11))) {
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

  // Parse the days for display
  for (let i = 0; i < days.length; i++) {
    let splitDate = days[i].split('-');
    let dayMonthSplit = splitDate.slice(1);
    displayDays.push(dayMonthSplit.join('/'));
  }

  // Handle undefined typing for the city name
  if (typeof response.city.name === 'undefined') {
    results.locationName = 'Unknown City Name';
  } else {
    results.locationName = response.city.name;
  }


  for (let i = daysForecast[0].length; i < daysForecast[1].length; i++) {
    daysForecast[0].unshift(' ');
  }

  results.displayDays = displayDays;
  results.displayHours = displayHours;
  results.dayOne = daysForecast[0];
  results.dayTwo = daysForecast[1];
  results.dayThree = daysForecast[2];

  return results;
}

function formatError(errorCode) {

  let error = {};

  switch (errorCode) {
    case ('401'):
      error.code = '401';
      error.message = 'Invalid or missing API key.';
      break;
    case ('404'):
      error.code = '404';
      error.message = 'The weather of the location you searched for could not be found.'
      break;
    case ('429'):
      error.code = '429';
      error.message = 'The API call limit has been met, try again later.';
      break;
    case ('400'):
      error.code = '400';
      error.message = 'Bad request sent. Make sure your search query is correct and try again.';
      break;
    default:
      error.code = '500';
      error.message = 'A problem occurred on the server, ensure your submission was valid and try again later.';
  }

  return error;
}

function getStartDate(hours, response) {

  let todayDate = new Date(Date.now() + (response.city.timezone * 1000)).toISOString().slice(0, 10);

  for (let i = 0; i < response.list.length; i++) {
    const currentDate = response.list[i].dt_txt.slice(0, 10);
    // If the response contains hours for today and the hours selected have not passed yet, then the startDate is today
    if (response.list[i].dt_txt.slice(0, 10) == todayDate && hours.includes(response.list[i].dt_txt.slice(11))) {
      return todayDate;
    }
  }

  return addDays(todayDate, 1);
}

// Changes the oldDate passed in into a date with the amount of days passed in dayCount
function addDays(oldDate, dayCount) {
  let nextDate = new Date(oldDate);
  nextDate.setDate(nextDate.getDate() + dayCount);
  return nextDate.toISOString().slice(0, 10);
}

module.exports = {
  getWeather,
  formButtonError,
  formatUrl,
  parseInput,
  gatherResults,
  formatError,
  getStartDate,
  addDays
}