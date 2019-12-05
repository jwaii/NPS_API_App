'use strict'

//practice leaving notes for self

const apiKey = 'FBe049r5SFNJexyYlNWdK3yefsxXLziaq2qhKTB1';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

console.log('api keys working');



function formatQueryParams(params){
    console.log('format Q params ran')
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        console.log(queryItems) //call for the keys
        return queryItems.join('&');
}


function formatApiUrl(state, limit=10){
    console.log(limit)
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit: limit,
    }
    //console.log('params')
    const queryStrings = formatQueryParams(params);
   // console.log(queryStrings);
    const Url = searchURL+ '?' + queryStrings
    console.log(Url);

    fetch(Url)
        .then(response => {
            if (response.ok) {
                console.log('response ok working');
                return response.json();
            }
            throw new Error(response.status.Text);
        })
        .then(data => {displayResults(data)})
        .catch(err => {
            $('js-error-message').text(`Something went wronf: ${err.message}`);
        });
}

function displayResults(responseJson){
    console.log("I am displayResults")
    console.log(responseJson);
    const parkList = responseJson.data
    for (let i=0; i< parkList.length; i++){
        console.log(parkList[i])
        $('.ul-results').append(`<li> <a href="${parkList[i].url}" target="_blank">${parkList[i].fullName}</a> <br> ${parkList[i].description}</li>`);
    }
}
console.log('Hello world')

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchPark = $('#js-search-park').val();
        const maxResults = $('#js-max-results').val();
        console.log(searchPark, maxResults);
        console.log('watch form working');
        $('.ul-results').html(" ");
        formatApiUrl(searchPark,maxResults);
    })
}

$(watchForm);