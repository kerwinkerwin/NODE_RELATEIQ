var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/";
var contact_uri = "v2/contacts";
dotenv.load()
var auth = {
  user:process.env.APIKEY,
  pass:process.env.APISECRET,
  sendImmediately: true
};
var headers ={'Accept':'application/json', 'Content-Type':'application/json'};


var fetchContacts = function fetchContacts(){
  unirest.get(base_uri + contact_uri)
  .auth(auth)
  .header(headers)
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
    .header(headers)
    .end(function(response){
      console.log(response.body.objects[0])
    });
};

var createContact = function createContact(contactProperties){
  var prop = JSON.stringify(contactProperties);
  console.log(prop);
  unirest.post(base_uri + contact_uri)
    .auth(auth)
    .headers(headers)
    .send(contactProperties)
    .end(function(response){
      console.log(response);
    });
};

module.exports ={
  fetchContacts: fetchContacts,
  fetchContact: fetchContact,
  createContact: createContact
};
