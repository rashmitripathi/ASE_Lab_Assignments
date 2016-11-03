/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:root@ds031995.mlab.com:31995/asedemo';
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('demoase').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

})

app.get('/update/:s_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};
        var newData={};

        if(req.params.s_id){
            find._id = new ObjectID(req.params.s_id);
        }
        if(req.query.ISBN){
            newData.ISBN = req.query.ISBN;
        }
        if(req.query.bookName){
            newData.bookName = req.query.bookName;
        }

        if(req.query.authorName){
            newData.authorName = req.query.authorName;
        }

        db.collection('demoase').update(find,{'$set':newData},
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
})

app.get('/delete/:s_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};

        if(req.params.s_id)
            find._id = new ObjectID(req.params.s_id);

        db.collection('demoase').remove(find,function(err,result){
            if(err)
                throw err;
            res.send('Delete Success');
        });
    });
})

ar insertDocument = function(db, data, callback) {
    db.collection('demoase').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})