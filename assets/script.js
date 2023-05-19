 var APIKey = "70dbb2a7d07b8c1ca5346bfa22a84fe5"

// let dayjs = dayjs('').format('DD-MM-YYYY');
// $('#day').text(dayjs)

// const dayjs = require('dayjs');

// import dayjs from 'dayjs';
const now = dayjs(); // Current date and time
const customDate = dayjs('2023-05-12'); // Specific date
const fromJSDate = dayjs(new Date()); // JavaScript Date object
let localStorageArr = [] 

let cardBlock = document.getElementById("cardBlock")
let searchForm = document.getElementById("searchForm")
let findCity = document.getElementById("findCity");
let pastSearches = document.getElementById("pastSearches");
let cityDetails = document.getElementById("cityDetails");
let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");
let day5 = document.getElementById("day5");

const currentDate = dayjs().format('DD-MM-YYYY');
console.log(currentDate);

let date1 = dayjs().add(1, 'day').format('DD-MM-YYYY');
let date2 = dayjs().add(2, 'day').format('DD-MM-YYYY');
let date3 = dayjs().add(3, 'day').format('DD-MM-YYYY');
const date4 = dayjs().add(4, 'day').format('DD-MM-YYYY');
const date5 = dayjs().add(5, 'day').format('DD-MM-YYYY');

window.onload = () => {
   //get loacal storage items and append them to 'placeholder' div 
   //get the reference of the div to append to
   
   let past = JSON.parse(localStorage.getItem("name"))
   
    //loop through an object
   for(city of past) {
    localStorageArr.push(city)
    //console.log(city.cityName, '#####3##3#3')
    let divOne = document.createElement("p")
    //console.log(city.cityName)
    divOne.textContent = city.cityName
    pastSearches.appendChild(divOne)
   }
}

function displayWeather (cityName) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`
    fetch(url)
    .then(response => {
        return response.json()
    }).then(data =>{
        console.log(data)
        cardBlock.innerHTML = ""
        for (let i = 2; i < data.list.length; i+=8) {
            cardBlock.innerHTML+=`<div class="card">
            <div id="date1">
                <h2>${dayjs.unix(data.list[i].dt).format(" MM-DD-YYYY")}</h2>
                <p id="day1"> </p>
                <p>Temp:${data.list[i].main.temp}</p>
                <p>Wind:${data.list[i].wind.speed}</p>
                <p>Humidity:${data.list[i].main.humidity}</p>
            </div>
        </div>`
            
        }
    })
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`
    fetch(currentURL)
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        cityDetails.innerHTML = `<p><b>${data.name}${dayjs.unix(data.dt).format(" MM-DD-YYYY")} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> </b></p>
        <br>
        <br>
        <p>temp : ${data.main.temp}°F</p>
        <p>wind : ${data.wind.speed}mph</p>
        <p>humidity : ${data.main.humidity}%</p>`
    })

}

searchForm.addEventListener("submit", function(event){
   event.preventDefault()
    var cityName = findCity.value 
    //set cityname in local storage 
    //push obj into you rarray 
    //console.log(localStorageArr)
    let obj = {'cityName': cityName}
    localStorageArr.push(obj)
    localStorage.setItem('name', JSON.stringify(localStorageArr))
    displayWeather(cityName)
})


