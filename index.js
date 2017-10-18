var express = require('express');
var app = express();
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

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


app.listen(app.get('port'), function() {
  console.log("Listening on port " + app.get('port'))
});

var routes = require('./routes');
routes(app);