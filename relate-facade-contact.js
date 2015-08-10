var relate = require('./relate.js');


var fetchContact = function fetchContact(student){
  var contact = relate.getContact(student,function(info){
    console.log(info);
  });
};

var fetchContacts = function fetchContacts(){
  var contacts = relate.getContacts(function(info){
    console.log(info);
  });
};

var createContact = function createContact(contactProperties){
  var prop = JSON.stringify(contactProperties);
  unirest.post(base_uri)
    .auth(auth)
    .header(headers)
    .send(contactProperties)
    .end(function(response){
      console.log(response);
    });
};

// var upsertContact = function upsertContact(contactEmail, contactInfo){
//   var prop = JSON.stringify(contactInfo);
//   unirest.post(base_uri + "?_upsert=email")
//     .auth(auth)
//     .header(headers)
//     .send(prop)
//     .end(function(response){
//       console.log(response);
//     });
// };

var updateContact = function updateContact(contactId, contactInfo){
  unirest.put(base_uri + "/" + contactId)
  .auth(auth)
  .header(headers)
  .send(contactInfo)
  .end(function(response){
    console.log(response);
  })
}

module.exports ={
  fetchContacts: fetchContacts,
  fetchContact: fetchContact,
  createContact: createContact,
  updateContact: updateContact
};
