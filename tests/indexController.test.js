const indexController = require('../controllers/indexController.js');

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