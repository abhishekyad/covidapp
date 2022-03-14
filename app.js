var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var himalaya = require('himalaya');
var app     = express();


app.listen('8081')
function begin (){
  app.get('/', function(req, res){
  url = 'https://www.mohfw.gov.in/';
  url1 = 'https://www.mohfw.gov.in/data/datanew.json';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var active,discharged,deaths;
      var json = {active:"",discharged:"",deaths:"",vaccination:""};

      const datarow=$(".mob-hide");
      const vacc=$(".coviddata").text();
      const output=datarow.text().trim();
      var str=output.split(" ").join(',').split(")").join(',').split("(").join(',').split(",");
      for (var i = str.length - 1; i >= 0; i--) {
        str[i]=str[i].trim();
      }
      json.active=str[1];
      json.discharged=str[4];
      json.deaths=str[7];
      json.vaccination=vacc;
      var s=JSON.stringify(json);
      s=s.substring(1);
      s=','+s;
      fs.appendFile('./client/src/data.json', s, function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
      fs.appendFile('./client/public/assets/datalist.json', s, function(err){
    })
      
    }

    res.send('Check your console!')
  })
  request(url1,function(error, response,html) {
        if(!error){
          var v= himalaya.parse(html);          
          var str=JSON.stringify(v);
          str=str.split("state_name");
          var state=[];
          var active_cases=[];
          var cured = [];
          var death = [];
          for (var i = str.length - 1; i >= 0; i--) {
            str[i]=str[i].substring(6);
            state.push(str[i].substring(0,str[i].indexOf(",")-2));
          }
          state.shift();
          state.pop();
          str=str.join(",").split("active");
          for (var i = str.length - 1; i >= 0; i--) {
            if(i%2==0)
              continue;
            str[i]=str[i].substring(5);
            active_cases.push(str[i].substring(0,str[i].indexOf(",")-2));
          }
          active_cases.shift();
          str=str.join(",").split("cured");
          for (var i = str.length - 1; i >= 0; i--) {
            if(i%2==0)
              continue;
            str[i]=str[i].substring(5);
            cured.push(str[i].substring(0,str[i].indexOf(",")-2));
          }
          cured.shift();
          str=str.join(",").split("death");
          for (var i = str.length - 1; i >= 0; i--) {
            if(i%3==1)
            {
              str[i]=str[i].substring(5);
              death.push(str[i].substring(0,str[i].indexOf(",")-2));
            }
          }
          death.shift();
          var json="{";
          for (var i = state.length - 1; i >= 0; i--) {
            json+="\""+state[i]+"\" : {";
            json+="\"active\" : "+active_cases[i]+"\" ,";
            json+="\"cured\" : "+cured[i]+"\" ,";
            json+="\"deaths\" : "+death[i]+"\"}";
            if(i!=0)
              json+=",";
          }
          
      fs.writeFile('./client/src/data.json', json, function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
        }
      })
})
}

setInterval(begin,6);

console.log('Magic happens on port 8081');
exports = module.exports = app;
