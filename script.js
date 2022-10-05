//https://api.openweathermap.org/data/2.5/weather?q=fountain valley & units=imperial&appid=6231125811f72919410760adeaba69dc

let weather = {
  cur: 0,
  mileOrMeter: ["mph", "m/s"],
  celOrFah: ["F", "C"],
  unit: ["imperial", "metric"],
  apiKey: "6231125811f72919410760adeaba69dc",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
        this.unit[this.cur]
      }&appid=${this.apiKey}`
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
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity, temp_min, temp_max, feels_like } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText =
      "Weather in " + name + " " + country;
    document.querySelector(".temp").innerText = temp + "°";

    document.querySelector(".unitFahrenheit ").innerText = "°F";
    document.querySelector(".or").innerHTML = "|";
    document.querySelector(".unitCelsius").innerText = "°C";

    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;
    document.querySelector(".feels").innerText =
      "Low: " +
      temp_min +
      " °" +
      this.celOrFah[this.cur] +
      "\n High: " +
      temp_max +
      " °" +
      this.celOrFah[this.cur] +
      "\n Feels like: " +
      feels_like +
      " °" +
      this.celOrFah[this.cur];
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " " + this.mileOrMeter[this.cur];
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage ="url('https://source.unsplash.com/2200x1000/?="+name+" flag')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".unitFahrenheit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".card").style.color = "orange";
    weather.cur = 0;
    weather.fetchWeather(document.querySelector(".search-bar").value);
  });
document.querySelector(".unitCelsius").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".card").style.color = "aqua";
  weather.cur = 1;
  weather.fetchWeather(document.querySelector(".search-bar").value);
});

document
  .querySelector(".search > button")
  .addEventListener("click", function () {
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
