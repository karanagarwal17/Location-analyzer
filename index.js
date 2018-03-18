const Twitter = require('twitter');
const dotenv = require('dotenv').config();

var client = new Twitter({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token_key: process.env.access_token_key,
	access_token_secret: process.env.access_token_secret
});

var params = {screen_name: 'pineapples786', count: 100};
var tags = [];
var locations = [];

client.get('statuses/user_timeline/', params, function(error, tweets, response){
	if(error){
		throw error;
	}
	tweets.forEach((x) => {
		if(x.entities.hashtags.length !== 0){
			x.entities.hashtags.forEach((y) => {
				tags.push(y.text);
			});
		}
	});
	console.log(`Found ${tags.length} tags!`);
	for(t in tags){
		if(t < tags.length){
			console.log(`Analysing tag ${t}: ${tags[t]}`);
			client.get('search/tweets/', {q: `#${tags[t]}`, include_entities: true, count: 100}, function(error, tweets, response){
				if(error){
					throw error;
				}
				tweets.statuses.forEach((twt) => {
					var a = twt.user.time_zone;
					if(locations[a]){
						locations[a] += 1;
					} else {
						locations[a] = 1;
					}
				});
				locations.sort((a,b) => {
					return b - a;
				});
				console.log(locations);
			});
		}
	}
});
