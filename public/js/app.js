const LOCATION_REQUIRED = 'Please enter a location';

function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector('small');
  msg.innerText = message;
  // update the class for the input
  input.className = type ? 'success' : 'error';

  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, '', true);
}

function hasValue(input, message) {
  if (input.value.trim() === '') {
    return showError(input, message);
  }
  return showSuccess(input);
}

window.addEventListener('load', () => {
  const form = document.getElementById('forecastForm');
  const forecastParagraph = document.getElementById('forecast');
  const addressParagraph = document.getElementById('address');
  const errorParagraph = document.getElementById('error');
  const submitButton = document.getElementById('submit');

  function clearUI() {
    forecastParagraph.innerText = '';
    addressParagraph.innerText = '';
    errorParagraph.innerText = '';
  }

  form.addEventListener('submit', function (event) {
    // stop form submission
    event.preventDefault();
    clearUI();
    // validate the form
    let locationValid = hasValue(form.elements['location'], LOCATION_REQUIRED);
    // if valid, submit the form.
    if (locationValid) {
      submitButton.disabled = true;
      forecastParagraph.innerText = 'Loading...';
      fetchWeather(form.elements['location'].value);
    }
  });

  function fetchWeather(address) {
    fetch(`http://localhost:3000/weather?address=${address}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          forecastParagraph.innerText = '';
          errorParagraph.innerText = data.error;
        } else {
          forecastParagraph.innerText = data.forecast;
          addressParagraph.innerText = data.location;
          errorParagraph.innerText = '';
        }
      })
      .catch((error) => {
        forecastParagraph.innerText = '';
        errorParagraph.innerText = data.error;
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});
