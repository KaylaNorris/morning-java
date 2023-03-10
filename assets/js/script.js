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
