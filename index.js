/**
 * Created by ashikvc on 9/3/17.
 */
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pokemon = require('./data/pokemon.json');

var health_app = express();
var app = express();

var timeout = -1;
var startTime = 0;

app.use(bodyParser.json());

var httpPort = 80;
var healthPort = 81;

app.get('/id/:id',function(req,res){
    var id = req.params.id;
    if(id > pokemon.length)
        res.send({error: 'Pokemon Not Found'});
    res.send(pokemon[id-1]);
});
health_app.get('/liveness_test',function(req,res){
  if(timeout < 0) {
    timeout = 0;
    startTime = new Date().getTime();
  }
  else{
    timeout = new Date().getTime() - startTime;
  }
  if(timeout > 30000) {
    res.status(500);
    res.send({status: 'dead'});
  }
  else{
    res.status(200);
    res.send({status: 'alive'});
  }
});

health_app.get('/livenessBeamer', function(req,res) {
  res.status(200);
  res.send({status: 'alive'});
});

// Check the readiness of this application. This app does not
// ..use any memory intensive tasks or database operations. So this part can be skipped
health_app.get('/readinessBeamer', function(req,res){
  res.status(200);
  res.send({status: 'ready'});
});

health_app.listen(healthPort,function(){
  console.log("Nurse Joy to the rescue. <3");
});

app.listen(httpPort,function(){
    console.log("Gotta Catch 'em all")
});
