# Three Day Clearcast

A small weather application to see if the weather forecast in the next three days will be clear. This app allows you to check the weather for the day in three hour intervals, up to two days from the current day. You can then see if the weather is clear or not at these hours, making it easier to plan your day.

The motivation for this project originally came from the hindrance of checking the weather whenever I wanted to hang out with friends. For full day outings, it would be annoying having to always check the weather and see if it was clear when there are so many potential weather outcomes. The Three Day Clearcast is the result, even if it's far from what I would ideally like, but was fun to build and gave me some good practice in doing so.

## Table of Contents

- [Three Day Clearcast](#three-day-clearcast)
- [Setup](#setup)
- [Usage](#usage)
  - [Important Usage Notes](#important-usage-notes)
  - [Custom Search](#custom-search)
  - [Local Search](#local-search)
- [Testing](#testing)
- [Future Improvement Considerations](#future-improvement-considerations)
- [Useful References](#useful-references)

## Setup

To run the application, first install the dependencies using

```bash
npm install
```

Weather information is retrieved using [OpenWeatherMap](https://openweathermap.org/) so an API key is required for this application.

Once you have an API key, create we need to setup the environment variable needed for accessing OpenWeatherMap. Do so by creating a file for it as follows.

```bash
touch .env
```

Once the file is created, open it and assign your API key as an environment variable. This variable is the following:

```
OPENWEATHER_API_KEY=API_KEY_HERE
```

You can then start the application with the following command.

```bash
npm run start
```

## Usage

### Important Usage Notes

- Results are displayed in the **UTC** timezone, so results displayed may vary according to your local timezone.
- Results for a day are retrieved at every third hour and is limited only to the next two days.
- The weather covered is not representative of the overall weather conditions between every three hours, but of the weather at every third hour. There may be volatile conditions that are not displayed.
- This tool is used to get some quick insight of what to check over the next couple of days, it should be used in tandem with your local weather services regardless of what results are displayed.

### Custom Search

1. Click on all of the hours you want to receive results for. They will be darkened when selected.

![Hours Selection](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/hours-selection.png)

2. Click on your preferred format button.

![Format Selection](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/format-selection.png)

3. Type in your location following the format you selected.

![Location Selection](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/custom-input.png)

4. Click on the **Search** button and get your results!

![Search Button](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/search-custom.png)

### Local Search

1. Click on all of the hours you want to receive results for. They will be darkened when selected.

![Hours Selection](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/hours-selection.png)

2. Click on the **Local** button.

![Local Button](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/search-local.png)

3. If necessary, you may need to allow for geolocation services in your browser. Please allow them.

![Geolocation Permission](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/geolocation.png)

4. Your format will be set to **Latitude, Longitude** and your location will have your local coordinates automatically entered.

![Local Input](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/local-input.png)

5. Click on the **Search** button and get your results!

![Search Button](https://github.com/rgee258/three-day-clearcast/raw/master/public/images/search-custom.png)

## Testing

A couple of small test suites are also provided using the Jest testing framework. The tests available are done for most of the client-side features used in the application, as well as some of the backend methods that are used for handling weather responses.

To run the tests, use the following.

```
npm run test
```

Included is a jest directory which contains a file used for configuring the environment variables used in testing, any changes applied for tested environment variables can be done there.

## Future Improvement Considerations

- Switching the API to provide more accurate and a wider range of forecast results
- A toggle for military time
- If possible, adapt the API to handle local time zones for results
- Improved mobile layout handling

## Useful References

- Using res.locals in Express: https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
- Adding extra days to ISO formatted dates: https://stackoverflow.com/questions/38654793/how-to-add-an-extra-day-to-the-iso-format-date-in-javascript
- Error handling with async/await: https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
- Using return next() in Node: https://stackoverflow.com/questions/16810449/when-to-use-next-and-return-next-in-node-js
- Adding npm bootstrap to app.js: https://stackoverflow.com/questions/26773767/purpose-of-installing-twitter-bootstrap-through-npm/35580597#35580597
- Styling a set of elements but ignoring the first one: https://coderwall.com/p/uugurw/css-selector-trick-select-all-elements-except-the-first
- Using ES6 import and export in jest testing: https://medium.com/@saplos123456/using-es6-import-and-export-statements-for-jest-testing-in-node-js-b20c8bd9041c
- Workaround for _Unexpected token export_ (see second answer): https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
- Test process.env in Jest (see third answer): https://stackoverflow.com/questions/48033841/test-process-env-with-jest
