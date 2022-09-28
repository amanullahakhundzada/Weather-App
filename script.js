//https://api.openweathermap.org/data/2.5/weather?q=fountain valley & units=imperial&appid=6231125811f72919410760adeaba69dc
let weather = {
    apiKey: "6231125811f72919410760adeaba69dc",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
     
      const { name,timezone } = data;
      const {country} =data.sys;
      const { icon, description } = data.weather[0];
      const { temp, humidity,temp_min,temp_max,feels_like} = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name+" "+ country;
      document.querySelector(".feels").innerText="Low: "+temp_min+" °F \n High: " +temp_max + " °F\n Feels like: "+feels_like+" °F";
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " mph";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/2300x1600/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Fountain Valley");