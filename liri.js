// main js file
var args = process.argv;
var arg1 = args[2];
// Core node package for reading and writing files
var fs = require("fs");
var request = require("request");
var twitterKeys = require("./keys.js");

switch (arg1) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

function myTweets() {

}

function spotifyThisSong() {

}

function movieThis() {
    var movieName = "";
    if (args.length !== 4) {
        movieName = "Mr. Nobody";
    } else {
        movieName = args[3];

    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // Then run a request to the OMDB API with the movie specified
    request(queryUrl, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            var movie = JSON.parse(body);
            // console.log(movie);
            console.log("* " + movie.Title);
            console.log("* " + movie.Year);
            console.log("* " + movie.imdbRating);
        }
    });

}

function doWhatItSays() {
    fs.readFile("random.txt", {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            console.log('received data: ' + data);

            var phrases = data.split(",");
            for (var i = 0; i < phrases.length; i++) {
                var phrase = phrases[i].trim();
                console.log(phrase);
            }
        } else {
            console.log(err);
        }
    });
}


