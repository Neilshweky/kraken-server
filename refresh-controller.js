'use strict';
const cheerio = require('cheerio');
const request = require('request');
var roman_numerals = require('roman-numerals').toArabic;

var admin = require("firebase-admin");

var serviceAccount = require("./the-kraken-force-firebase-adminsdk-j9p4f-61d1bcc030.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-kraken-force.firebaseio.com"
});

var db = admin.database();
var ref = db.ref();

exports.update_guildies = function (req, res) {

  getGuildMates(function(guildMatesDic){
    
    var i = 0;
    for(var key in guildMatesDic){
      var newDoc = ref.child("Guilds").child("the-kraken-force").child('guildies').child(key).set(guildMatesDic[key], function (error) {
        if(!error){
          i++;
          if (i >= Object.keys(guildMatesDic).length){
            console.log("Done!");
            res.send("Done Updating Guildies!");
          }
        }else{
          console.log(error);
        }
      });
      
    }

  });

}

exports.update_guildie_chars = function (req, res) {
  
  getGuildieChars(parseInt(req.params.index), function(guildieCharsDic){
    var i = 0;
    var j = 1;
    for(var key in guildieCharsDic){
      console.log(guildieCharsDic[key])
      j++;
      // Object.keys(guildieCharsDic[key]).forEach(function(charName){ console.log(charName)}, this);
      for(var charName in guildieCharsDic[key]){
        console.log(guildieCharsDic[key][charName])
        
        var newDoc = ref.child('Guilds').child("the-kraken-force").child('all_characters').child(key).child(charName).set(guildieCharsDic[key][charName], function (error) {
          if (error) console.log (error);

          i++;
          console.log("Result " + i + " , " + Object.keys(guildieCharsDic[key]).length);
          if (i >= Object.keys(guildieCharsDic[key]).length*Object.keys(guildieCharsDic).length && j >= Object.keys(guildieCharsDic).length){
            console.log("Done!");
            res.send("Done Updating Guildie Chars!");
          }
        });
      
      }
    }

  });

}


var getGuildMates = function(callback){

  request('https://swgoh.gg/g/6958/thekrakenforce/', function(err, response, body) {
    if (err) { return console.error(err); }
    
    
    var guildMatesDic = {};


    var $ = cheerio.load(body);
      

    $('table.table-condensed.table-striped tr').each(function(i, item){
      if(i !== 0){
        var link = $('td', this).first().find('a').attr('href');
        var swgoh_name = link.substring(3, link.length-1);
        var name = $('td', this).first().find('a').text();
        
        var galactic_power = parseInt($('td', this).eq(1).text());
        var collection_score = parseFloat($('td', this).eq(2).text());
        if(!collection_score) collection_score = 0;
        if(!galactic_power) galactic_power = 0;
      
        guildMatesDic[swgoh_name] = {
          game_name: name,
          galactic_power: galactic_power,
          collection_score: collection_score
        };
      }
      

    });
    console.log("Done Getting Guild Data")
    callback(guildMatesDic);
  });

}
    

var getGuildieChars = function(index, callback){

  var guildieChars = {};
  var guildies = {};
  
  getGuildMates(function(guildMatesDictionary){
    
    var swgoh_name_array = Object.keys(guildMatesDictionary).sort();
    console.log (index);
    var gMatesDic = {}
    var array_to_use = [];
    var x = 0;
    for(x = index * 10; x < Math.min((index + 1) * 10, swgoh_name_array.length-1); x++){
      array_to_use[x%10] = swgoh_name_array[x];
    }


    var p = -1;
    array_to_use.forEach(function(name) {
      request('https://swgoh.gg/u/' + name + '/collection', function(err, response, body){
        if (err) { return console.error(err); }

        console.log(p + ': ' + name + ' - ' + guildMatesDictionary[name]['game_name']);

        
        var $ = cheerio.load(body);
        
        var item = $('li.media.list-group-item.p-a.collection-char-list')
        var characters = item.find('.collection-char-name-link');

        p++;

      
        for(var i = 0; i < characters.length; i++){

          var charName = item.find('.collection-char-name-link').eq(i).text();
          var charLvl = parseInt(item.find('.char-portrait-full-level').eq(i).text());
          var charGear = item.find('.char-portrait-full-gear-level').eq(i).text();
          var charLink = item.find('a.char-portrait-full-link').eq(i).attr('href');
          var percent = parseFloat($(item).find('.collection-char-gp-label-value').eq(i).text())/100;
          var gp = item.find('.collection-char-gp').eq(i).attr('title');
          var gp_array = gp ? gp.split(' ') : gp_array = [0, 0];
          console.log('GP: ' + gp_array[1]);
          if(!charLink) charLink = '';
          
          
          var charStar = 0;
          if (!percent) percent = 0;					
          if(!charLvl) charLvl = 0;
          if (!charGear) charGear = 0;
          else charGear = roman_numerals(charGear);

          // console.log(charName + ' ' + item.find('.char-portrait-full-link').eq(i).find('div.star.star7.star-inactive'));
          // console.log (charName);
          for(var j = 7; j >= 1; j--){
          
            if (item.find('.char-portrait-full-link').eq(i).find('.star.star'+j+'.star-inactive').length>0){
              charStar = j-1;
              
            }
          }
          if (charStar === 0){
            if(item.find('.char-portrait-full-link').eq(i).find('.star.star7').length>0)
              charStar = 7;
          }

          guildieChars[charName] = {
            level: charLvl,
            gear_tier: charGear,
            rarity: charStar,
            percent: percent,
            link: charLink,
            galactic_power: gp_array[1]
          }
        
        }
      
        guildies[name] = guildieChars;
        guildieChars = {};
        

        
        if(p === (x-1)%10){
          console.log("Done getting guildie char data!");
          callback(guildies);
          return;
        }

      }, this);

    });

  });	
}
