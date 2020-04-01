/**
 * indexController.test.js
 *
 * Jest test file for testing indexController.js
 * Tests the following methods:
 *  formButtonError
 *  formatUrl
 *  parseInput
 *  gatherResults
 *  formatError
 *  getStartDate
 *  addDays
 */

const indexController = require('../controllers/indexController.js');

// formButtonError Tests

test('formButtonError returns true with no hours inputted', () => {
    expect(typeof indexController.formButtonError(undefined, 'cs')).toBeTruthy;
});

test('formButtonError returns true with no format inputted', () => {
    expect(typeof indexController.formButtonError(['00:00:00', '00:03:00'], undefined)).toBeTruthy;
});

test('formButtonError returns true when it is not a string', () => {
    expect(typeof indexController.formButtonError(['00:00:00', '00:03:00'], ['cs', 'll'])).toBeTruthy;
});

test('formButtonError returns false with no proper inputs', () => {
    expect(typeof indexController.formButtonError(['00:00:00', '00:03:00'], 'cs')).toBeFalsy;
});

// formatUrl Tests

test('formatUrl returns the proper url when format is cs', () => {
  expect(typeof indexController.formatUrl('city, state', 'cs')).toBe("string");
  expect(indexController.formatUrl('city, state', 'cs')).toEqual('https://api.openweathermap.org/data/2.5/forecast?q=city,state&appid=0');
});

test('formatUrl returns the proper url when format is z', () => {
  expect(typeof indexController.formatUrl('00000', 'z')).toBe("string");
  expect(indexController.formatUrl('00000', 'z')).toEqual('https://api.openweathermap.org/data/2.5/forecast?zip=00000&appid=0');
});

test('formatUrl returns the proper url when format is ll', () => {
  expect(typeof indexController.formatUrl('0, 0', 'll')).toBe("string");
  expect(indexController.formatUrl('0, 0', 'll')).toEqual('https://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&appid=0');
});

// parseInput Tests

test('parseInput returns an array of length 2 with proper input', () => {
  expect(typeof indexController.parseInput('city, state')).toBe("object");
  expect(indexController.parseInput('city, state')).toHaveLength(2);
  expect(indexController.parseInput('city, state')).toEqual(['city', 'state']);
});

test('parseInput returns an array of length 2 with input that had multiple commas', () => {
  expect(typeof indexController.parseInput('city, state, country, planet')).toBe("object");
  expect(indexController.parseInput('city, state, country, planet')).toHaveLength(2);
  expect(indexController.parseInput('city, state, country, planet')).toEqual(['city', 'state']);
});

test('parseInput returns an array of length 1 with input without a comma', () => {
  expect(typeof indexController.parseInput('city state')).toBe("object");
  expect(indexController.parseInput('city state')).toHaveLength(1);
  expect(indexController.parseInput('city state')).toEqual(['city state']);
});

// gatherResults Tests

test('gatherResults returns the correct object using sample data', () => {
  const response = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
      {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now()).toISOString().slice(0,10)} 15:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now()).toISOString().slice(0,10)} 18:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now() + (86400000 * 1)).toISOString().slice(0,10)} 15:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now() + (86400000 * 1)).toISOString().slice(0,10)} 18:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now() + (86400000 * 2)).toISOString().slice(0,10)} 15:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now() + (86400000 * 2)).toISOString().slice(0,10)} 18:00:00`
    },
  ],
  "city": {
      "id": 2643743,
      "name": "London",
      "coord": {
        "lat": 51.5073,
        "lon": -0.1277
      },
      "country": "GB",
      "timezone": 0,
      "sunrise": 1578384285,
      "sunset": 1578413272
    }
  }

  expect(indexController.gatherResults(['15:00:00', '18:00:00'], response)).toEqual(
  {
    "dayOne": ['Clear', 'Clear'],
    "dayThree": ['Clear', 'Clear'],
    "dayTwo": ['Clear', 'Clear'],
    "displayDays": [
      `${new Date(Date.now()).toISOString().slice(0,10).split('-').slice(1).join('/')}`,
      `${new Date(Date.now() + (86400000 * 1)).toISOString().slice(0,10).split('-').slice(1).join('/')}`,
      `${new Date(Date.now() + (86400000 * 2)).toISOString().slice(0,10).split('-').slice(1).join('/')}`,
    ],
    "displayHours": [
      "3:00 PM",
      "6:00 PM",
    ],
    "locationName": "London",
  });
});

// formatError Tests

test('formatError returns missing API key with error code 401', () => {
  expect(typeof indexController.formatError('401')).toBe("object");
  expect(indexController.formatError('401')).toEqual({ code: '401', message: 'Invalid or missing API key.' });
});

test('formatError returns not found with error code 404', () => {
  expect(typeof indexController.formatError('404')).toBe("object");
  expect(indexController.formatError('404')).toEqual({ code: '404', message: 'The weather of the location you searched for could not be found.' });
});

test('formatError returns API call limit reached with error code 429', () => {
  expect(typeof indexController.formatError('429')).toBe("object");
  expect(indexController.formatError('429')).toEqual({ code: '429', message: 'The API call limit has been met, try again later.' });
});

test('formatError returns bad request with error code 400', () => {
  expect(typeof indexController.formatError('400')).toBe("object");
  expect(indexController.formatError('400')).toEqual({ code: '400', message: 'Bad request sent. Make sure your search query is correct and try again.' });
});

test('formatError defaults to internal server problem with error code 500', () => {
  expect(typeof indexController.formatError('500')).toBe("object");
  expect(indexController.formatError('500')).toEqual({ code: '500', message: 'A problem occurred on the server, ensure your submission was valid and try again later.' });
});

// getStartDate Tests

test('getStartDate returns the current day when there is a matching hour and day', () => {
  const response = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
      {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now()).toISOString().slice(0,10)} 15:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now()).toISOString().slice(0,10)} 18:00:00`
    }
  ],
  "city": {
      "id": 2643743,
      "name": "London",
      "coord": {
        "lat": 51.5073,
        "lon": -0.1277
      },
      "country": "GB",
      "timezone": 0,
      "sunrise": 1578384285,
      "sunset": 1578413272
    }
  }

  expect(indexController.getStartDate(['15:00:00', '18:00:00'], response)).toEqual(`${new Date(Date.now()).toISOString().slice(0,10)}`);
});

test('getStartDate returns the current day when there is a matching hour and day', () => {
  const response = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
      {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now()).toISOString().slice(0,10)} 15:00:00`
    },
    {
        "dt": 1578409200,
        "main": {
          "temp": 284.92,
          "feels_like": 281.38,
          "temp_min": 283.58,
          "temp_max": 284.92,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 1016,
          "humidity": 90,
          "temp_kf": 1.34
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": {
          "all": 100
        },
        "wind": {
          "speed": 5.19,
          "deg": 211
        },
        "sys": {
          "pod": "d"
        },
        "dt_txt": `${new Date(Date.now()).toISOString().slice(0,10)} 18:00:00`
    }
  ],
  "city": {
      "id": 2643743,
      "name": "London",
      "coord": {
        "lat": 51.5073,
        "lon": -0.1277
      },
      "country": "GB",
      "timezone": 0,
      "sunrise": 1578384285,
      "sunset": 1578413272
    }
  }

  expect(indexController.getStartDate(['12:00:00', '21:00:00'], response)).toEqual(`${new Date(Date.now() + 86400000).toISOString().slice(0,10)}`);
});

// addDays Tests

test('addDays properly increases the date by one day', () => {
  expect(indexController.addDays('2000-01-01', 1)).toBe('2000-01-02');
});

test('addDays properly increases the date by multiple days', () => {
  expect(indexController.addDays('2000-01-01', 3)).toBe('2000-01-04');
});
