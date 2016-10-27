/**
 * Created by Puchu on 10/26/2016.
 */

var express = require('express');
var app = express();
var request = require('request');
app.get('/getdata/:id', function (req, res) {
    var result={
        'body': []
    };

    request('http://api.eventful.com/json/events/search?app_key=qdzQbz36GmB8C3KC&location='+req.params.id+'&date=Today', function (error,response,body) {
        if(error){
            return console.log('Error:', error);
        }

        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        body = JSON.parse(body);
        conti = body.events.event;

        for(var i=0;i<conti.length;i++)
        {

        lat = conti[i].latitude;
        lang = conti[i].longitude;

            request('http://api.wunderground.com/api/24ec621b780f0040/conditions/q/' + lat + ',' + lang + '.json', function (error, response, body1) {

                if (error) {
                    return console.log('Error:', error);
                }

                if (response.statusCode !== 200) {
                    return console.log('Invalid Status Code Returned:', response.statusCode);
                }

                body1 = JSON.parse(body1);
                weath = body1;

                result.body.push({"title": conti[i].title,"weather":weath.current_observation.temperature_string});

                res.contentType('application/json');
                res.write(JSON.stringify(result));
                res.end();

            });

        }
       });

})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

})