const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');



function apiSearch(event) {
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;
    const server = ' https://api.themoviedb.org/3/search/multi?api_key=f95ef34c77054f283fdc44e55160716f&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка';
    requestApi(server)
        .then(function(result) {
            const output = JSON.parse(result);

            let inner = '';

            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += '<div class="col-6 col-md-4 col-xl-3">' + nameItem + '</div>';
            });

            movie.innerHTML = inner;

            console.log(output);
        })
        .catch(function(reason) {
            movie.innerHTML = '<div class="col-12 error">Ой-ой, что-то пошло не так!</div>';
            console.log('error:' + request.status);
        });

}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    return new Promise(function(resolve, reject) {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', function() {
            if (request.status !== 200) {
                reject({ status: request.status });
                return;
            }

            resolve(request.response);
        });

        request.addEventListener('error', function() {
            reject({ status: request.status })
        });

        request.send();
    })

    // request.addEventListener('readystatechange', () => {
    //     if (request.readyState !== 4) {
    //         movie.innerHTML = 'Загрузка';
    //         return;
    //     }

    //     if (request.status !== 200) {
    //         movie.innerHTML = 'Ой, ой, что-то пошло не так!';
    //         console.log('error:' + request.status);
    //     }


    // });

}