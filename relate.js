var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/v2/contacts";
dotenv.load()
var auth = {
    user:process.env.APIKEY,
    pass:process.env.APISECRET,
    sendImmediately: true
  };
var headers ={
    'Accept':'application/json',
    'Content-Type':'application/json'
  };

function _uniGet(uri,callback){
  console.log(uri)
  unirest.get(uri)
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response.body);
    });
}

var getContacts = function getContacts (callback){
    _uniGet(base_uri,function(response){
      callback(response);
    });
};

var getContact = function getContact(identifier,callback){
  var contact_url = "/"
  if(identifier.indexOf("@") != -1){
    contact_url ="?properties.email="
  };
  url = base_uri + contact_url + identifier;
  _uniGet(url,function(response){
    callback(response);
  });
};

module.exports ={
  getContacts: getContacts,
  getContact: getContact
};
