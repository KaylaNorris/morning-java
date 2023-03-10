
let timeEl=document.querySelector('#time')
timeEl.textContent = dayjs().format('MMM D, YYYY');

//Weather Forecast Code
let weatherContainer = document.querySelector('#weatherContainer')
let weatherCity = document.querySelector('#city')
let dayContainer0 = document.querySelector('#day0')
let dayContainer1 = document.querySelector('#day1')
let dayContainer2 = document.querySelector('#day2')
let dayContainer3 = document.querySelector('#day3')
let dayContainer4 = document.querySelector('#day4')

let dayContainersArray = [
    dayContainer0,
    dayContainer1,
    dayContainer2,
    dayContainer3,
    dayContainer4
]

let weatherBtn = document.querySelector('#weatherButton')

function start(event) {
    event.preventDefault()

    let city = weatherCity.value
    getWeatherForecast(city)

}

function getWeatherForecast(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=b26ef5e661df23ce4ce2891ab8eebc4d'

    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)

            dayContainer0.innerHTML = '';
            dayContainer1.innerHTML = '';
            dayContainer2.innerHTML = '';
            dayContainer3.innerHTML = '';
            dayContainer4.innerHTML = '';

            for (let i = 0; i < 5; i++) {
                let dateEl = document.createElement('h3')
                dateEl.textContent = dayjs().add(i, 'day').format('MMM D, YYYY')
                let currentContainer = dayContainersArray[i]
                currentContainer.append(dateEl)


                let imgCode = data.list[i].weather[0].icon
                let imgUrl = "https://openweathermap.org/img/w/" + imgCode + ".png";
                let imgEl = document.createElement('div')
                let img = document.createElement('img')
                img.setAttribute('src', imgUrl)
                imgEl.appendChild(img)
                currentContainer.append(imgEl)

                let tempEl = document.createElement('p')
                tempEl.textContent = ("Temp: " + data.list[i].main.temp + " F")
                currentContainer.append(tempEl)

                let humidityEl = document.createElement('p')
                humidityEl.textContent = ("Humidity: " + data.list[i].main.humidity + "%")
                currentContainer.append(humidityEl)

                let windEl = document.createElement('p')
                windEl.textContent = ("Wind: " + data.list[i].wind.speed + " MPH")
                currentContainer.append(windEl)
                console.log(currentContainer)

                currentContainer.classList.remove('is-hidden')
                
            }
        })

}
weatherBtn.addEventListener('click', start)
//End Weather Forecast Code

function getQuote() {
    var queryURL = "https://api.themotivate365.com/stoic-quote"
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var author = document.getElementById("author");
            author.innerHTML = "-" + data.author;
            var quote = document.getElementById("quote");
            quote.innerHTML = '"' + data.quote + '"';
        })
}
getQuote();

//notes submit button 
function saveNote() {
    var saveBtn = document.getElementById("saveBtn");
    var notesInput = document.getElementById("notes-input");
    var notes = localStorage.getItem("notes");
    
    notesInput.textContent = notes;

    saveBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var notesInput = document.getElementById("notes-input").value;
        
        localStorage.setItem("notes", notesInput);
    });
}
saveNote();

//Stock Functionality Code


//Stock Global Variables

let stockEl = document.getElementById('nasdaq');
let stockElTwo = document.getElementById('dowjones');
let stockText = document.getElementById('stocktext')
let stockButton = document.getElementById('stockbutton')
let stockAPI = 'https://financialmodelingprep.com/api/v3/stock/list?apikey=a5f18dde834ae8efbaf1f45490e8b1ff';

//Stock API Code

stockButton.addEventListener('click', function () {
    fetch(stockAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            let stockVal = stockText.value
            for (i = 0; i < data.length; i++) {
                let ranName = Math.floor(Math.random() * i)
                let helpMe = data[ranName].name
                if (helpMe.indexOf(stockVal) != -1) {
                    var stockID = data[ranName].symbol

                    //Second API Code

                    let stockAPITwo = 'https://financialmodelingprep.com/api/v3/quote/' + stockID + '?apikey=a5f18dde834ae8efbaf1f45490e8b1ff'
                    fetch(stockAPITwo)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            function removeIfExists(selector) {
                                var x = document.querySelector(selector)
                                if (x) x.remove()
                            }
                            // console.log(data)
                            // console.log(stockText.value)
                            removeIfExists('#nasdaq div')
                            var spanOne = document.createElement('div')
                            var spanTwo = document.createElement('div')
                            spanOne.textContent = data[0].name;
                            spanTwo.textContent = data[0].change;
                            stockEl.appendChild(spanOne)
                            spanOne.appendChild(spanTwo)
                            // console.log(spanOne)
                            if (data[0].change <= 0) {
                                spanTwo.style.color = 'red'
                            } else if (data[0].change >= 0) {
                                spanTwo.style.color = 'green'
                            }

                        });
                } else {
                    stockText.value = 'Enter Valid Name';
                }
            }
        })


})
