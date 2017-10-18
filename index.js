var express = require('express');
var app = express();
var port = 3000;
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json());      
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.use(express.json());      
app.use(express.urlencoded({     
    extended: true
  })); 


app.listen(port, function(){
    console.log("Listening on port " + port);
});

var routes = require('./routes');
routes(app);