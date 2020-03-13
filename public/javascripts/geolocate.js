/**
 * geolocate.js
 *
 * Static client side JS to use the HTML5 native geolocation to get latitude and longitude
 * Sets the format radio button needed to retrieve weather from latlong coordinates
 */


/**
 * getLocal()
 *
 * Uses the HTML Geolocation to get user latitude and longitude
 * Sets the format buttons to the lat/long format
 * Removes previous errors, then creates and displays error if geolocation cannot be accessed
 */
function getLocal() {

  // localInput() retrieves the latitude and longitude of the user and sets it in the form
  function localInput(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.querySelector("#weatherSearch").value = `${latitude}, ${longitude}`;
    radioBtns = document.querySelectorAll('#weather-form .format:checked');
    for (let i = 0; i < radioBtns.length; i++) {
      radioBtns[i].checked = false;
    }
    document.querySelector('#weather-form #llFormat').checked = true;
  }

  // localError removes previous display results then creates and displays a geolocation error
  function localError(err) {

    let geoErrorDisplay = document.querySelector('.geo-error');
    let previousResults = document.querySelectorAll('.form-error, .search-results, .search-error');

    if (previousResults.length !== 0) { 
      for (let i = 0; i < previousResults.length; i++) {
        previousResults[i].remove();
      }
    }

    if (geoErrorDisplay === null) {
      let errorDisplay = document.createElement('div');
      errorDisplay.classList.add('geo-error', 'alert', 'alert-danger', 'col-8', 'offset-2');

      let errorHeader = document.createElement('p');
      errorHeader.textContent = 'Error retrieving local coordinates.';
      errorDisplay.appendChild(errorHeader);

      document.querySelector('.main-content').appendChild(errorDisplay);
    }
  }

  navigator.geolocation.getCurrentPosition(localInput, localError);
}

// Adds listener for Local button
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('#localBtn').addEventListener('click', getLocal);
});