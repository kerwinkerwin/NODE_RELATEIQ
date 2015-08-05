var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/"
dotenv.load()
var auth = {
  user:process.env.APIKEY,
  pass:process.env.APISECRET,
  sendImmediately: true
};
var headers ={'Accept':'application/json'};
var contact_uri = "v2/contacts"

var fetchContacts = function fetchContacts(){
  unirest.get(base_uri + contact_uri)
  .auth(auth)
  .headers(headers)
  .end(function(response){
    console.log(response);
  });
}

var fetchContact = function fetchContact(student){
  var contact_url = contact_uri
  if(student.indexOf("@") != -1){
    contact_url = contact_uri +"?properties.email="
  };

  unirest.get(base_uri+ contact_url + student)
    .auth(auth)
    .headers(headers)
    .end(function(response){
      console.log(response.body.objects[0])
    });
};

var createContact = function createContact(contactProperties){
  unirest.post(base_uri + contact_url)
    .auth(auth)
    .headers(headers)
    .
}

module.exports ={
  fetchContacts: fetchContacts,
  fetchContact: fetchContact
};
