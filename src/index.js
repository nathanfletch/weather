import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$(document).ready(function () {
  $("#weatherLocation").click(function () {
    const city = $("#location").val();
    $("#location").val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;

    /*
    https://api.openweathermap.org/data/2.5/onecall?lat=45.5234&lon=-122.6762&exclude=hourly,minutely&appid=0373dba2dadbe36645254ce4f9320087
    */

    request.onreadystatechange = function () {
      console.log(this.readyState);
      if (this.readyState === 4 && this.status === 200) {
        //turns JSON into a real js object
        const response = JSON.parse(this.responseText);
        //JSON.stringify(response) turns a real js object into a json file
        console.log(response);
        getElements(response);
      }
      // if (this.status === 401) {
      //   throw new Error("Your API key is invalid");
      // }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $(".showHumidity").text(
        `The humidity in ${city} is ${response.main.humidity}%`
      );
      $(".showTemp").text(
        `The temperature in Fahrenheit is ${response.main.temp} degrees.`
      );
    }
  });

  $("#weekly-forecast").click(function () {
    let request2 = new XMLHttpRequest();
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=45.5234&lon=-122.6762&exclude=hourly,minutely&appid=${process.env.API_KEY}`;
    console.log(url2);
    request2.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response2 = JSON.parse(this.responseText);
        console.log(response2);
        console.log(response2.daily[0].temp);
        displayData(response2);
      }
    };
    request2.open("GET", url2, true);
    request2.send();
  });

  function displayData(data) {
    const week = data.daily;
    let weeklyForecastHtml = "";
    week.forEach((day, index) => {
      if(index != 0) {
        weeklyForecastHtml += `<li>Forecast for day ${index}: High is ${day.temp.max}, low is ${day.temp.min} </li>`;
      }
    });
    // for(let index = 1; index < week.length; index++) {
    //   weeklyForecastHtml += `<li>Forecast for day ${index}: High is ${week[index].temp.max}, low is ${week[index].temp.min} </li>`;
    // }
    $("#showWeekly").append(weeklyForecastHtml);
  }
});
