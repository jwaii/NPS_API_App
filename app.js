'use strict'

//practice leaving notes for self

const apiKey = 'FBe049r5SFNJexyYlNWdK3yefsxXLziaq2qhKTB1';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=KYMawks2jpDel05cxQgHKKH9OmWfhAxj4yQ9nGrr
// developer.nps.gov/api/v1

console.log('api keys working');



function formatQueryParams(params){
    console.log('format Q params ran')
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        console.log(queryItems) //call for the keys
        return queryItems.join('&');
}

/*
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&'); // .join will join values by turing value into strings, EX: value1&value2&value3
  }
  */

function formatApiUrl(state, limit=10){
    const params = {
        api_key: apiKey,
        stateCode: state,
        maxResults: limit,
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
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchPark = $('#js-search-park').val();
        const maxResults = $('#js-max-results').val();
        console.log(searchPark, maxResults);
        console.log('watch form working');
        formatApiUrl(searchPark,maxResults);
        // function to get NPS Results
    })
}

$(watchForm);


//order 
    //user form
    //api
    //show to user


    //url built line 39 "const Url = searchURL+ '?' + queryStrings"
    //get park results takes 1 argument (Url)  X
        //Fetch will live here  X
            //return response in Jsonform  
            //display results :)