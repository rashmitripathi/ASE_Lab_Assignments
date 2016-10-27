/**
 * Created by Rashmi on 25/10/2016. MashUp of REST APIs
 */
var express = require('express');
var app = express();
var request = require('request');
var async = require('async');


app.get('/getEventsWithWeather/:location', function (req, res) {
    var result={
        'eventsList': []
    };
    var currentEvent = '';

    async.series([
        //Load user to get `userId` first
        function(callback) {

            request('http://api.eventful.com/json/events/search?app_key=qdzQbz36GmB8C3KC&location='+req.params.location+'&date=Today', function (error, response, body)
            {
                //Check for error
                if(error){
                    return console.log('Error:', error);
                }

                //Check for right status code
                if(response.statusCode !== 200){
                    return console.log('Invalid Status Code Returned:', response.statusCode);
                }
                //All is good. Print the body
                body = JSON.parse(body);
                eventRes = body.events.event;

                for(var i=0;i<eventRes.length;i++)
                //for(var i=0;i<2;i++)
                {
                    event=eventRes[i];
                    result.eventsList.push({
                        'title': event.title,
                        'address': event.venue_address,
                        'description': event.description,
                        'latitude': event.latitude,
                        'longitude': event.longitude,
                        'start_time':event.start_time,
                        'venue_name':event.venue_name,
                        'url':event.url

                    });
                };


            });

            callback();

        },
        //Load posts (won't be called before task 1's "task callback" has been called)
        function(callback) {

            for(var i=0;i<result.eventsList.length;i++)
            {
                console.log("index"+i);
                event=result.eventsList[i];

                currentEvent=event;
                request('http://api.wunderground.com/api/24ec621b780f0040/conditions/q/' + event.latitude + ',' + event.longitude + '.json', function (error, response, body)
                {
                    if (error) {
                        console.log(weatherUrl);
                        //return console.log('Error weather:', error);
                        return callback(error);                    }

                    body1 = JSON.parse(body);
                    weatherRes = body1.current_observation;
                    //weatherArray.push(weatherRes);
                    console.log(weatherRes);

                    result.eventsList.push({
                        'title': event.title,
                        'address': event.venue_address,
                        'description': event.description,
                        'latitude': event.latitude,
                        'longitude': event.longitude,
                        'start_time':event.start_time,
                        'venue_name':event.venue_name,
                        'url':event.url,
                        'Temperature': weatherRes.temperature_string,
                        'Humidity': weatherRes.relative_humidity,
                        'weather': weatherRes.weather,
                        'weather_icon': weatherRes.icon_url
                    });

                    callback();
                });
            }



        },

        function(callback) {
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
            console.log(result);
            callback();
        }

    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with `user` and `posts`
        //Just like in the previous example
        //res.render('user-profile', result);
    });

})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})