// import fetch from "node-fetch";    nie dziala
// globalThis.fetch = fetch

// import fetch from 'cross-fetch';     nie dziala

function toggleRegisterPassword() {
    let x = document.getElementById("userRegisterPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function toggleLoginPassword() {
    let x = document.getElementById("userLoginPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

let a = document.getElementById('loginForm');
let b = document.getElementById('registerForm');
window.onclick = function(close) {
    if (close.target == a ) {
        a.style.display = "none";
    }
    if (close.target == b) {
        b.style.display = "none";
    }
}

function closeLogin(){
    document.getElementById('loginForm').style.display = "none";
}
function closeRegister(){
    document.getElementById('registerForm').style.display = "none";
}

function responsiveNavFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// API NBP

function getNOK() {
    fetch("https://api.nbp.pl/api/exchangerates/rates/a/nok/?format=json")
        .then( resp => resp.json()) // bez tego dziwne rzeczy wyswietla ale wyswietla
        .then( data => {
            document.getElementById("insertNOK").innerText = data.rates[0].mid;
        })
}


function getEUR() {
    fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json")
        .then( resp => resp.json()) // bez tego dziwne rzeczy wyswietla ale wyswietla
        .then( data => {
            document.getElementById("insertEUR").innerText = data.rates[0].mid;
        })
}




// WEATHER ///////////////
const timeE1 =document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('currentWeatherItems');
const timeZone = document.getElementById('timeZone');
const countryE1 = document.getElementById('country');
const currentTempE1 = document.getElementById('currentTemp');

const days = ['Niedziela', 'Poniedziałek','Wtorek','Środa', 'Czwartek','Piątek','Sobota']
const months = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru']
const API_KEY = '51612eb2145ad04933582f900fd084ec';

setInterval(()=> {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >=13 ? hour %12: hour
    const minutes = time.getMinutes();
    const amPM = hour >=12 ? 'PM' : 'AM';
    timeE1.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes : minutes) + ' ' + `<span id="amPM">${amPM}</span>`
    dateE1.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 1000);

getWeatherDataM ()
function getWeatherDataM () {
    // navigator.geolocation.getCurrentPosition((succes) => {
    //     let{latitude, longitude} = succes.coords;
        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=54.0381&lon=21.7644&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    // })
}

getWeatherDataL ()
function getWeatherDataL () {
    // navigator.geolocation.getCurrentPosition((succes) => {
    //     let{latitude, longitude} = succes.coords;
        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=63.4305&lon=10.3951&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    // })
}

getWeatherDataK ()
function getWeatherDataK () {
    // navigator.geolocation.getCurrentPosition((succes) => {
    //     let{latitude, longitude} = succes.coords;
        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=28.2915&lon=-16.7301&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    // })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timeZone.innerHTML = data.timezone;
    countryE1.innerHTML = data.lat + 'N ' + (data.lon >= 0 ? data.lon + 'E' : + data.lon + 'W'); 

    currentWeatherItemsE1.innerHTML =
    `<div class="weatherItem">
        <div>Wilgotność</div>
        <div>${humidity}%</div>
    </div>
    <div class="weatherItem">
        <div>Ciśnienie</div>
        <div>${pressure}</div>
    </div>
    <div class="weatherItem">
        <div>Wiatr</div>
        <div>${wind_speed}m/s</div>
    </div>
    <div class="weatherItem">
        <div>Wschód</div>
        <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>
    <div class="weatherItem">
        <div>Zachód</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    `;

    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempE1.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="wIcon">
            <div>
                <div class="temp">Noc: ${day.temp.night}&#176;C</div>
                <div class="temp">Dzień: ${day.temp.day}&#176;C</div>
            </div>
            `
        }
    })
    
}


// funkcje wypisywania ceny z json do fomrlarza rejestracyjnego

function getPriceM(){
    fetch('./data/ceny.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("priceM").innerText = data.priceM;
    })
}

function getPriceK(){
    fetch('./data/ceny.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("priceK").innerText = data.priceK;
    })
}


function getPriceL(){
    fetch('./data/ceny.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("priceL").innerText = data.priceL;
    })
}
