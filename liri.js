// main js file
var choice = "";
var userInput = "";
// Core node package for reading and writing files
var fs = require("fs");
var request = require("request");
var twitterKeys = require("./keys.js");
var inq = require("inquirer");
var Twitter = require('twitter');

inq.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        name: "userChoice",
        choices: ["movie-this", "my-tweets", "spotify-this-song", "do-what-it-says"]
    }
]).then(function (userResponse) {
    // Use user feedback for... whatever!!
    choice = userResponse.userChoice;
    if (choice === "movie-this" || choice === "spotify-this-song") {
        var msg = "";
        if (choice === "movie-this") {
            msg = "Name the movie.";
        } else {
            msg = "Name the song.";
        }
        inq.prompt([
            {
                type: "input",
                message: msg,
                name: "userInput"
            }
        ]).then(function (uResponse) {
            userInput = uResponse.userInput;
            if (choice === "movie-this") {
                movieThis();
            } else {
                spotifyThisSong();
            }
        });
    } else if (choice === "my-tweets") {
        myTweets();
    } else if (choice === "do-what-it-says") {
        doWhatItSays();
    }
});

function myTweets() {
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });

    var params = {};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length && i < 19; i++) {
                var tweet = tweets[i];
                console.log("* Tweet created at: " + tweet.created_at);
                console.log("* Tweet: " + tweet.text);
            }
            // console.log(tweets);
        }
    });

}

function spotifyThisSong() {

}

function movieThis() {
    if (userInput.length === 0) {
        movieName = "Mr. Nobody";
    } else {
        movieName = userInput;
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
            console.log("* Year it came out: " + movie.Year);
            console.log("* ImbDb Rating: " + movie.imdbRating);
            var ratings = movie.Ratings;
            for (var i = 0; i < ratings.length; i++) {
                var rat = ratings[i];
                // console.log("Rat: " + rat);
                if (rat.Source === "Rotten Tomatoes") {
                    console.log("* Rotten Tomatoes Rating: " + rat.Value);
                    break;
                }
            }
            console.log("* Country where produced: " + movie.Country);
            console.log("* Language: " + movie.Language);
            console.log("* Plot: " + movie.Plot);
            console.log("* Actors: " + movie.Actors);
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


