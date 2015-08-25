var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/v2/contacts";
var listUri = "https://api.relateiq.com/v2/lists"
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
  unirest.get(uri)
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response.body);
    });
};

function _uniPost(uri,info,callback){
  unirest.post(uri)
    .auth(auth)
    .header(headers)
    .send(info)
    .end(function(response){
      callback(response);
    });
};

function _uniPut(contactId, info, callback){
  unirest.put(base_uri + "/" + contactId)
  .auth(auth)
  .header(headers)
  .send(info)
  .end(function(response){
    callback(response);
  })
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

var createContact = function createContact(contact, callback){
  _uniPost(base_uri,contact,function(response){
    console.log(contact);
    callback(response);
  });
};

var updateContact = function updateContact(contactId, contactInfo,callback){
  _uniPut(contactId,contactInfo,function(response){
    callback(response);
  })
}

var getLists = function getLists(callback){
  _uniGet(listUri + "/?_start=0",function(response){
    callback(response);
  })
}
module.exports ={
  getContacts: getContacts,
  getContact: getContact,
  createContact: createContact,
  updateContact: updateContact,
  getLists: getLists
};
