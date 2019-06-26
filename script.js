const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;
    const server = ' https://api.themoviedb.org/3/search/multi?api_key=f95ef34c77054f283fdc44e55160716f&language=ru&query=' + searchText;
    requestApi('GET', server);

}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {

    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
            console.log('error:' + request.status);
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            inner += '<div class="col-6">' + nameItem + '</div>';
        });

        movie.innerHTML = inner;

        console.log(output);
    });

}