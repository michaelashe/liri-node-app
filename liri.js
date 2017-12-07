var twitterKeys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var argument = process.argv[2];
//var fs = require('fs');
//console.log(twitterKeys);

if (argument === "my-tweets") {
    var client = new twitter(twitterKeys);
    var params = {
        screen_name: 'IronMike280'
    };

    client.get('statuses/user_timeline', params, function(err, data, response) {
        if (!err) {
            for (i = 0; i < data.length; i++) {
                console.log("@IronMike280: " + data[i].text + " Date: " + data[i].created_at);
                console.log("--------------------------------------------------");
            };
        };
    });
};


if (argument === "spotify-this-song") {
    var nodeArgs = process.argv;
    var songName = "";

    if (nodeArgs[3]) {
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {

                songName = songName + "+" + nodeArgs[i];

            } else {

                songName += nodeArgs[i];

            }
        }
    } else {
        songName = "The+Sign+Ace+of+Base";
    }

    var spotify = new spotify({
        id: '985848e43f7947658d1693820dbc1e61',
        secret: 'a37b454c239a4a329234dbcbd243a567'
    });

    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
    }, function(err, data) {
        if (!err) {
            var data = data.tracks.items;
            for (var i = 0; i < data.length; i++) {

                console.log("Artist Name: " + data[i].artists[0].name); //artist's name
                console.log("----------------------------")
                console.log("Song name: " + data[i].name); //song track name
                console.log("----------------------------")
                console.log("Album name: " + data[i].album.name); //album name
                console.log("----------------------------")
                console.log("Preview link: " + data[i].preview_url); //preview link to the song
                console.log("----------------------------")
                    // console.log("Artist Name: " + data[i].artists[0].name); //artist's name

            };
        };

    });
};

if (argument === "movie-this") {

    var nodeArgs = process.argv;
    //console.log(nodeArgs);

    var movieName = "";

    if (nodeArgs[3]) {

        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {

                movieName = movieName + "+" + nodeArgs[i];

            } else {

                movieName += nodeArgs[i];

            }
        }
    } else {
        movieName = "Mr+Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("--------------------------------------");
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("--------------------------------------");
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Starring: " + JSON.parse(body).Actors);
            console.log("--------------------------------------");
        }
    });

}

if (argument === "do-what-it-says") {
    var fs = require('fs');
    fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }

    var dataArr = data.split(",");
    console.log(dataArr);
    argument = dataArr[0];
    console.log(argument);

        // for (var i=0; i < dataArr.length; i++) {
        // 	console.log(dataArr[1]);
        // // 	(dataArr[0] === process.argv[2]);
        // // 	(dataArr[1] === process.argv[3]);
        //  };

    });
}




// console.log(data);


// return console.log('Error occurred: ' + err);