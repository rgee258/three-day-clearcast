/**
 * formHandler.js
 *
 * Static JS for client side form validation
 * Checks for the following criteria:
 * 1. Location input is not empty
 * 2. At least one hour is selected
 * 3. Only one format option is selected
 */

// checkForm() checks for validation errors, removes previous alerts, and appends an error alert if present
function checkForm(event) {

  const errors = validateForm();

  if (errors.length > 0) {

    event.preventDefault();

    let previousAlerts = document.querySelectorAll('.form-error, .geo-error, .search-results, .search-error');

    if (previousAlerts.length !== 0) { 
      for (let i = 0; i < previousAlerts.length; i++) {
        previousAlerts[i].remove();
      }
    }

    document.querySelector('.main-content').appendChild(createError(errors));
  }

}

// createError() creates the error elements for display
function createError(errors) {
  let errorDisplay = document.createElement('div');
  errorDisplay.classList.add('form-error', 'alert', 'alert-danger', 'col-8', 'offset-2');

  let errorHeader = document.createElement('p');
  errorHeader.textContent = 'Submission failed from the following error(s):';
  errorDisplay.appendChild(errorHeader);

  let errorList = document.createElement('ul');
  errorList.classList.add('list-group');

  for (let i = 0; i < errors.length; i++) {
    let currentError = document.createElement('li');
    currentError.classList.add('list-group-item');
    currentError.textContent = errors[i];
    errorList.appendChild(currentError);
  }

  errorDisplay.appendChild(errorList);

  return errorDisplay;
}

// validateForm() checks for each invalid input and stores them in an array
function validateForm() {

  let errors = [];

  if (invalidInput()) {
    errors.push('Location cannot be empty.');
  }

  if (invalidHours()) {
    errors.push('At least one hour must be selected.');
  }

  if (invalidFormat()) {
    errors.push('One search format must be selected.');
  }

  return errors;
}

// invalidInput() checks that the weather text input is not empty
function invalidInput() {
  const search = document.querySelector('#weatherSearch');
  if (search.value == null || search.value == undefined || search.value.length === 0) {
    return true;
  }

  return false;
}

// invalidHours() checks that at least one hour is selected
function invalidHours() {
  const hours = document.querySelectorAll('#weather-form .hour:checked');
  if (hours.length === 0) {
    return true;
  }

  return false;
}

// invalidFormat() checks that only one format is selected
function invalidFormat() {
  const formats = document.querySelectorAll('#weather-form .format:checked');
  if (formats.length !== 1) {
    return true;
  }

  return false;
}

// Adds listener for submit button
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('#weather-form').addEventListener('submit', checkForm);
});