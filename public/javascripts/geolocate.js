// geolocate.js
// Static JS to use the HTML5 native geolocation to get longitude and latitude

function getLocal() {
  function localInput(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.querySelector("#weatherSearch").value = `${latitude}, ${longitude}`;
  }

  function localError(err) {
    document.querySelector("#weatherSearch").placeholder = 'Error getting local location';
  }

  navigator.geolocation.getCurrentPosition(localInput, localError);
}