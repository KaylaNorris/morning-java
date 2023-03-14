let PickBtn = document.getElementById('PickNewsMenu');
let NewsArea = $('#NewsTxtArea').get(0);
let boxs = $('#NewsTxtArea');

let Title = ''
let Desc = ''
let Url = ''

    apikey = 'b70ba63684612fa2c72f98547c0e8bb8';
    url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            articles = data.articles;

            for (i = 0; i < articles.length; i++) {

                Title = articles[i]['title']
                Desc = articles[i]['description']
                Url = articles[i]['url'];

                boxs.append('<ul id="NewsData"> <li><span>Title:</span></li> <li><span>Description:</span></li> <a></a> </ul>');
                $('#NewsData').children('li').eq(0).append( Title);
                $('#NewsData').children('li').eq(1).append( Desc);
                $('#NewsData').children('a').append('<a href=' + Url + '>Read it here!</a>');
                $('#NewsData').children('a').attr("href", Url);


                $('#NewsData').find('span').addClass('is-size-5 has-text-primary');
                $('#NewsData').find('a').addClass('is-size-6 has-text-primary');
                break;
            }
        });

