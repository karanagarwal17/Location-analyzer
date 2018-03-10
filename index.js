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
});
