//dotevn package to set environment variables
require('dotenv').config();

//require to access api and files
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var axios = require('axios');
var moment = require('moment');

//spotify gets environment variable from exported keys file with attached env file of client/client secrets
var spotify = new Spotify(keys.spotify);

//set input to variables
var option = process.argv[2];
var param = process.argv[3];

//query movie and concert 
var queryMovieUrl = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy";
var queryConcertUrl = "https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp";


//==========================
//      movie-this
//==========================

var showMovieInfo = (queryMovieUrl) => {
    axios.get(queryMovieUrl)
        .then((response, error) => {
            if (error) throw error;

            let movieData = response.data;
            if (param === undefined) {
                console.log(`If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
                console.log("It's on Netflix!`);
            } else {
                console.log('**********  MOVIE INFO  *********');
                //append to (file),(content)
                fs.appendFileSync('log.txt', '**********  MOVIE INFO  ********\n')
                console.log(`Title: ${movieData.Title}`);
                fs.appendFileSync('log.txt', `Title: ${movieData.Title} \n`);
                console.log(`Year: ${movieData.Year}`);
                fs.appendFileSync('log.txt', `Year: ${movieData.Year} \n`)
                console.log(`Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}`);
                fs.appendFileSync('log.txt', `Rotten Tomatoes Rating: ${movieData.Ratings[1].Value} \n`);
                console.log(`Country of production: ${movieData.Country}`);
                fs.appendFileSync('log.txt', `Country of production: ${movieData.Country} \n`);
                console.log(`Language: ${movieData.Language}`);
                fs.appendFileSync('log.txt', `Language: ${movieData.Language} \n`);
                console.log(`Synopsis: ${movieData.Plot}`);
                fs.appendFileSync('log.txt', `Synopsis: ${movieData.Plot} \n`);
                console.log(`Actor(s): ${movieData.Actors}`);
                fs.appendFileSync('log.txt', `Actor(s): ${movieData.Actors} \n`);
                console.log('********************************');
                fs.appendFileSync('log.txt', '********************************\n');
            };
        });
};

//==========================
//      spotify-this-song
//==========================

var showSongInfo = (param) => {
    if (param === undefined) {
        param = "The Sign";
    }
    spotify.search({
        type: "track",
        query: param,
        limit: '1'
    },
        (error, data) => {
            if (error) throw error;

            else {
                var songs = data.tracks.items;
                //console.log("sasda", songs);
                for (var i = 0; i < songs.length; i++) {
                    console.log('**********  SONG INFO  *********');
                    fs.appendFileSync('log.txt', '**********  SONG INFO  *********\n');
                    console.log(`Song: ${songs[i].name}`);
                    fs.appendFileSync('log.txt', `Song: ${songs[i].name} \n`);
                    console.log(`Artist(s): ${songs[i].artists[0].name}`);
                    fs.appendFileSync("log.txt", `Artist(s): ${songs[i].artists[0].name} \n`);
                    console.log(`Preview: ${songs[i].preview_url}`);
                    fs.appendFileSync('log.txt', `Preview: ${songs[i].preview_url} \n`);
                    console.log(`Album: ${songs[i].album.name}`);
                    fs.appendFileSync('log.txt', `Album: ${songs[i].album.name} \n`);
                    console.log('********************************');
                    fs.appendFileSync('log.txt', '********************************\n');
                }
            }
        }
    );
};

//==========================
//      concert-this
//==========================

var showConcertInfo = (queryConcertUrl) => {
    axios.get(queryConcertUrl)
        .then((response, error) => {
            if(error) throw error;

            let concertData = response.data[0];
            console.log('********  CONCERT INFO  ********');
            fs.appendFileSync('log.txt', '********  CONCERT INFO  ********\n');
            console.log(`Artist(s): ${concertData.lineup[0]}`);
            fs.appendFileSync('log.txt', `Artist(s): ${concertData.lineup[0]} \n`);
            console.log(`Datetime: ${(moment(concertData.datetime).format('MM DD YYYY'))}`);
            fs.appendFileSync('log.txt', `Datetime: ${(moment(concertData.datetime).format('MM DD YYYY'))} \n`);
            console.log(`Venue: ${concertData.venue.name}`);
            fs.appendFileSync('log.txt', `Venue: ${concertData.venue.name} \n`);
            console.log(`       ${concertData.venue.city}, ${concertData.venue.region}`);
            fs.appendFileSync('log.txt', `       ${concertData.venue.city}, ${concertData.venue.region} \n`);
            console.log(`Lineup: ${concertData.lineup}`);
            fs.appendFileSync('log.txt', `Lineup: ${concertData.lineup} \n`);
            console.log('********************************');
            fs.appendFileSync('log.txt', '********************************\n')
        });
}

//read txt file from random.txt
var readTxtFile = () => {
    //fs path to file
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) throw error;
    
        //split data by comma
        data = data.split(",");

        //set option variable to data[0] to pass in function
        option = data[0];
        param = data[1];

        //call function pass in params 
        switchStatements(option, param);
    });
}

//function with switch statement will check which case the user wants

var switchStatements = (option, param) => {
    switch (option) {
        case "movie-this":
            showMovieInfo(queryMovieUrl)
            break;
        case 'spotify-this-song':
            showSongInfo(param);
            break;
        case "concert-this":
            showConcertInfo(queryConcertUrl);
            break;
        case 'do-what-it-say':
            readTxtFile();
            break;
        default:
            console.log("Invalid Option");
            break;
    };
}

//call function and pass in two process.argv arguments
switchStatements(option, param);