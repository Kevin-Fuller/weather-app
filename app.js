window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationName = document.querySelector(".location-name");
  let myIcon = document.getElementById("icon");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ac3a8b02e492b3adc0b4d5e8595bfeda`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];

          //Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationName.textContent = data.name;

          //update Icon
          myIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;

          //Change temperature to Celsius/Fahrenheit/Kelvin
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "K") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = kelvinToCelsius(
                Number(temperatureDegree.textContent)
              );
            } else if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = celsiusToFahrenheit(
                Number(temperatureDegree.textContent)
              );
            } else {
              temperatureSpan.textContent = "K";
            }
          });
        });
    });
  }
});

function kelvinToCelsius(number) {
  if (isNaN(number) === false) {
    return number - 273.15;
  } else {
    return 0;
  }
}
//Test Case: Should return -271.15
//console.log(kelvinToCelsius(2));

//Test Case-Should return 0
//console.log(kelvinToCelsius("test"));

function celsiusToFahrenheit(number) {
  if (isNaN(number) === false) {
    return (number * 9) / 5 + 32;
  } else {
    return 0;
  }
}

//Test Case: Should return 113.648
//console.log(celsiusToFahrenheit(45.36));

//Test Case: Should return 0
//console.log(celsiusToFahrenheit("test"));
