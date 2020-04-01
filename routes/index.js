/**
 * index.js
 *
 * Router for the index path
 * Handles GET and POST requests to the index
 * Also contains the GET to /about
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController.js')

// GET home page
router.get('/', function(req, res, next) {
  res.render('index');
});

// POST weather search
router.post('/', async function(req, res, next) {

  // Precautionary server side validation for form buttons
  if (controller.formButtonError(req.body.weatherHours, req.body.weatherFormat)) {
    return next();
  }

  try {
    const weatherResults = await controller.getWeather(req.body.weatherSearch, req.body.weatherFormat);

    // Throw the error object received if the response code is not 200
    if (weatherResults.cod !== '200') {
      throw weatherResults;
    }

    const displayResults = controller.gatherResults(req.body.weatherHours, weatherResults);
    res.render('index', { weather: displayResults });
  }

  catch (error) {
    res.render('index', { error: controller.formatError(error.cod) });
  }

}, function(req, res, next) {
  // Handle error case where the API response is not 200
  res.render('index', { error: controller.formatError('400') })
});

// GET about page
router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
