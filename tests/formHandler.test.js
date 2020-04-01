/**
 * formHandler.test.js
 *
 * Jest test file for testing formHandler.js
 * Tests the following methods:
 *  validateForm
 *  emptyValue
 *  invalidCheckbox
 *  invalidRadio
 * Remaining methods are avoided due to their extensive DOM manipulation
 */

const formHandler = require('../public/javascripts/formHandler.js');

// validateForm Tests

test('validateForm with no errors has an array of length 0', () => {
  // Create document body with similar form
  document.body.innerHTML = 
    '<form id="weather-form">' +
    ' <input type="text" id="weatherSearch" value="text">' +
    ' <input type="checkbox" class="hour" name="testOne" value="testOne" checked>' +
    ' <input type="checkbox" class="hour" name="testTwo" value="testTwo" checked>' +
    ' <input type="radio" class="format" name="testOne" value="testOne" checked>' +
    ' <input type="radio" class="format" name="testTwo" value="testTwo">' +
    '</form>';

    expect(typeof formHandler.validateForm()).toBe("object");
    expect(formHandler.validateForm()).toHaveLength(0);
    expect(formHandler.validateForm()).toEqual([]);
});

test('validateForm properly contains the emptyValue error', () => {
  // Create document body with similar form
  document.body.innerHTML = 
    '<form id="weather-form">' +
    ' <input type="text" id="weatherSearch">' +
    ' <input type="checkbox" class="hour" name="testOne" value="testOne" checked>' +
    ' <input type="checkbox" class="hour" name="testTwo" value="testTwo" checked>' +
    ' <input type="radio" class="format" name="testOne" value="testOne" checked>' +
    ' <input type="radio" class="format" name="testTwo" value="testTwo">' +
    '</form>';

    expect(typeof formHandler.validateForm()).toBe("object");
    expect(formHandler.validateForm()).toHaveLength(1);
    expect(formHandler.validateForm()).toEqual(['Location cannot be empty.']);
});

test('validateForm properly contains the invalidCheckbox error', () => {
  // Create document body with similar form
  document.body.innerHTML = 
    '<form id="weather-form">' +
    ' <input type="text" id="weatherSearch" value="text">' +
    ' <input type="checkbox" class="hour" name="testOne" value="testOne">' +
    ' <input type="checkbox" class="hour" name="testTwo" value="testTwo">' +
    ' <input type="radio" class="format" name="testOne" value="testOne" checked>' +
    ' <input type="radio" class="format" name="testTwo" value="testTwo">' +
    '</form>';

    expect(typeof formHandler.validateForm()).toBe("object");
    expect(formHandler.validateForm()).toHaveLength(1);
    expect(formHandler.validateForm()).toEqual(['At least one hour must be selected.']);
});

test('validateForm properly contains the invalidRadio error', () => {
  // Create document body with similar form
  document.body.innerHTML = 
    '<form id="weather-form">' +
    ' <input type="text" id="weatherSearch" value="text">' +
    ' <input type="checkbox" class="hour" name="testOne" value="testOne" checked>' +
    ' <input type="checkbox" class="hour" name="testTwo" value="testTwo" checked>' +
    ' <input type="radio" class="format" name="testOne" value="testOne">' +
    ' <input type="radio" class="format" name="testTwo" value="testTwo">' +
    '</form>';

    expect(typeof formHandler.validateForm()).toBe("object");
    expect(formHandler.validateForm()).toHaveLength(1);
    expect(formHandler.validateForm()).toEqual(['One search format must be selected.']);
});

test('validateForm with all errors has an array of length 3', () => {
  // Create document body with similar form
  document.body.innerHTML = 
    '<form id="weather-form">' +
    ' <input type="text" id="weatherSearch">' +
    ' <input type="checkbox" class="hour" name="testOne" value="testOne">' +
    ' <input type="checkbox" class="hour" name="testTwo" value="testTwo">' +
    ' <input type="radio" class="format" name="testOne" value="testOne">' +
    ' <input type="radio" class="format" name="testTwo" value="testTwo">' +
    '</form>';

    expect(typeof formHandler.validateForm()).toBe("object");
    expect(formHandler.validateForm()).toHaveLength(3);
    expect(formHandler.validateForm()).toEqual(['Location cannot be empty.', 'At least one hour must be selected.', 
      'One search format must be selected.']);
})

// emptyValue Tests

test('emptyValue returns true with an empty input value', () => {
  // Create document body with input tag without value
  document.body.innerHTML = 
    '<form>' +
    ' <input type="text" class="inputtest">' +
    '</form>';

  expect(formHandler.emptyValue(document.querySelector('.inputtest'))).toBeTruthy;
});

test('emptyValue returns false with an input with a default value', () => {
  // Create document body with input tag with a value
  document.body.innerHTML = 
    '<form>' +
    ' <input type="text" class="inputtest" value="default">' +
    '</form>';

  expect(formHandler.emptyValue(document.querySelector('.inputtest'))).toBeFalsy;
});

// invalidCheckbox Tests

test('invalidCheckbox returns true with no checked inputs', () => {
  // Create document body with checkboxes
  document.body.innerHTML = 
    '<form>' +
    ' <input type="checkbox" class="cbtest" name="testOne" value="testOne">' +
    ' <input type="checkbox" class="cbtest" name="testTwo" value="testTwo">' +
    '</form>';

  expect(formHandler.invalidCheckbox(document.querySelectorAll('.cbtest:checked'))).toBeTruthy;
});

test('invalidCheckbox returns false with at least one checked input', () => {
  // Create document body with checkboxes
  document.body.innerHTML = 
    '<form>' +
    ' <input type="checkbox" class="cbtest" name="testOne" value="testOne" checked>' +
    ' <input type="checkbox" class="cbtest" name="testTwo" value="testTwo" checked>' +
    '</form>';

  expect(formHandler.invalidCheckbox(document.querySelectorAll('.cbtest:checked'))).toBeFalsy;
});

// invalidRadio Tests

test('invalidRadio returns true when there are no selected radio inputs', () => {
  // Create document body with radio buttons
  document.body.innerHTML = 
    '<form>' +
    ' <input type="radio" class="rdtest" name="testOne" value="testOne">' +
    ' <input type="radio" class="rdtest" name="testTwo" value="testTwo">' +
    '</form>';

  expect(formHandler.invalidCheckbox(document.querySelectorAll('.rdtest:checked'))).toBeTruthy;
});

test('invalidRadio returns true when more than one radio input is selected', () => {
  // Create document body with radio buttons
  document.body.innerHTML = 
    '<form>' +
    ' <input type="radio" class="rdtest" name="testOne" value="testOne" checked>' +
    ' <input type="radio" class="rdtest" name="testTwo" value="testTwo" checked>' +
    '</form>';

  expect(formHandler.invalidCheckbox(document.querySelectorAll('.rdtest:checked'))).toBeTruthy;
});

test('invalidRadio returns false when only one radio input is selected', () => {
  // Create document body with radio buttons
  document.body.innerHTML = 
    '<form>' +
    ' <input type="radio" class="rdtest" name="testOne" value="testOne" checked>' +
    ' <input type="radio" class="rdtest" name="testTwo" value="testTwo">' +
    '</form>';

  expect(formHandler.invalidCheckbox(document.querySelectorAll('.rdtest:checked'))).toBeFalsy;
});