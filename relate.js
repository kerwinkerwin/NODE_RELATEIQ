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

function _uniGet(uri,callback){
  unirest.get(base_uri)
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response);
    });
}
var getContacts = function getContacts (callback){
    return _uniGet(function(response){
      callback(response);
    });

};

module.exports ={
  getContacts: getContacts
};
