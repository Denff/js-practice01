const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

const urlPoster = 'http://image.tmdb.org/t/p/w342';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = ' https://api.themoviedb.org/3/search/multi?api_key=f95ef34c77054f283fdc44e55160716f&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка';

    fetch(server)
        .then(function(value) {
            console.log(value.status);
            if (value.status !== 200) {
                return Promise.reject(new Error('Ошибка'));
            }

            return value.json();
        })
        .then(function(output) {
            console.log(output);
            let inner = '';
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `
                <div class="col-6 col-md-4 col-xl-3 item">
                    <img src="${urlPoster + item.poster_path}" alt="${nameItem}">
                    <h5>${nameItem}</h5>
                </div>
                `;

                // inner += '<div class="col-6 col-md-4 col-xl-3">' + nameItem + '</div>';
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = '<div class="col-12 error">Ой-ой, что-то пошло не так!</div>';
            console.log('error:' + reason);
        });

}

searchForm.addEventListener('submit', apiSearch);