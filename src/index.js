import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;

   request.onreadystatechange = function() {
     console.log(this.readyState);
     if (this.readyState === 4 && this.status === 200) {
        //turns JSON into a real js object
        const response = JSON.parse(this.responseText);
        //JSON.stringify(response) turns a real js object into a json file
        console.log(response);
        getElements(response);
      } 
      
    };

    request.open("GET", url, true);
    request.send();

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
    }
  });
});