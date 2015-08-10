var relate = require('./relate.js');


var fetchContact = function fetchContact(student, callback){
  var contact = relate.getContact(student,function(info){
    callback(info);
  });
};

var fetchContacts = function fetchContacts(){
  var contacts = relate.getContacts(function(info){
    console.log(info);
  });
};

var createContact = function createContact(contactProperties, callback){
  var newContact = relate.createContact(contactProperties,function(info){
    callback(info);
  })
};

var updateContact = function updateContact(contactId, contactInfo){
  var updateContact = relate.updateContact(contactId, contactInfo, function(info){
    console.log(info);
  })


}

module.exports ={
  fetchContacts: fetchContacts,
  fetchContact: fetchContact,
  createContact: createContact,
  updateContact: updateContact
};
