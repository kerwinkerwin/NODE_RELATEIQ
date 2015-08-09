var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/v2/contacts";
dotenv.load()
var auth = {
  user:process.env.APIKEY,
  pass:process.env.APISECRET,
  sendImmediately: true
};
var headers ={'Accept':'application/json', 'Content-Type':'application/json'};

function _uniGet(callback){
  unirest.get(base_uri)
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response.body);
    });
}


var getContacts = function getContacts (callback){
    return _uniGet(function(response){
      callback(response);
    });

};

var getContact = function getContact(){

};

module.exports ={
  getContacts: getContacts,
  getContact: getContact
};
