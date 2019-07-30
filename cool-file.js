const http = require('http');
var express = require('express');
var app = express();

function getXCSRF(cookie){
  return new Promise((resolve, reject) => {
    app.request.post("https://auth.roblox.com/v2/logout", {
      headers:{
      "Cookie": '.ROBLOXSECURITY=' + cookie
      }
      
    }, (error, response, body) => {
      if(!response.headers['x-csrf-token']){
        return reject(body);
      }
      let xcsrf = response.headers['x-csrf-token'];
      app.settings.xcsrf = xcsrf
      resolve(xcsrf)
    
    })
  });
}