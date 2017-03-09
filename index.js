/**
 * Created by ashikvc on 9/3/17.
 */
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pokemon = require('./data/pokemon.json');

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.get('/id/:id',function(req,res){
    var id = req.params.id;
    if(id > pokemon.length)
        res.send({error: 'Pokemon Not Found'});
    res.send(pokemon[id-1]);
});

var server = app.listen(port,function(){
    console.log("Gotta Catch 'em all")
});