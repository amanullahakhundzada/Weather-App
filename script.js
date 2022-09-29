//https://api.openweathermap.org/data/2.5/weather?q=fountain valley & units=imperial&appid=6231125811f72919410760adeaba69dc

let weather = {
  cur: 0,
  mileOrMeter:["mph","m/s"],
  celOrFah:["F","C"],
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

    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".feels").innerText ="Low: " +temp_min +" °"+this.celOrFah[this.cur]+ "\n High: " +temp_max + " °"+this.celOrFah[this.cur]+"\n Feels like: " +feels_like +" °"+this.celOrFah[this.cur];
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " "+ this.mileOrMeter[this.cur];
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/2200x1000/?=" + name + "')";
      
     
  
    },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".unitFahrenheit").addEventListener("click", function (e) {
  document.querySelector(".search button").style.color="orange";
  document.querySelector(".search-bar").style.color="orange";
  document.querySelector(".city").style.color="orange";
  document.querySelector(".unitFahrenheit").style.color="orange";
  document.querySelector(".temp").style.color="orange";
  document.querySelector(".icon").style.color="orange";
  document.querySelector(".unitCelsius").style.color="Aqua";
  document.querySelector(".description").style.color="orange";
  document.querySelectorAll(".feels").forEach((el) => el.style.color = "orange"); 
  document.querySelector(".humidity").style.color="orange";
  document.querySelector(".wind").style.color="orange";
  
  weather.cur = 0;
  weather.fetchWeather(document.querySelector(".search-bar").value);
  e.preventDefault();
  });

document.querySelector(".unitCelsius").addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector(".city").style.color = "aqua";
  document.querySelector(".unitFahrenheit").style.color = "orange";
   document.querySelector(".unitCelsius").style.color = "aqua";
   document.querySelector(".temp").style.color = "aqua";
   document.querySelector(".humidity").style.color = "aqua";
   document.querySelector(".description").style.color = "aqua";
   document.querySelector(".wind").style.color = "aqua";
   document.querySelector(".icon").style.color = "aqua";
   document.querySelector(".search button").style.color = "aqua";
   document.querySelector(".search-bar").style.color = "aqua";
  document.querySelectorAll(".feels").forEach((ele)=>ele.style.color = "aqua");
  weather.cur = 1;
  weather.fetchWeather(document.querySelector(".search-bar").value);
});

document.querySelector(".search").addEventListener("click", function () {
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

//       cToFahr:  function (celsius)
// {
//   const cTemp = celsius;
//   const cToFahr = cTemp * 9 / 5 + 32;
//   const message = `${cTemp}\xB0C is ${cToFahr} \xB0F.`;
//     console.log(message);
// },
//    fToC: function (fahrenheit)
// {
//   const fTemp = fahrenheit;
//   const fToCel = (fTemp - 32) * 5 / 9;
//   const message = `${fTemp}\xB0F is ${fToCel}\xB0C.`;
//     console.log(message);
// }


// document.querySelector(".unitCelsius").removeEventListener("click",function (e){
//   e.preventDefault();
//  e.displayWeather();
// });