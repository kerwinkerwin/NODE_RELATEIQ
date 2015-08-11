var relate = require('./relate.js');


var fetchContact = function fetchContact(student, callback){
  var contact = relate.getContact(student,function(info){
    callback(info);
  });
};

var fetchContacts = function fetchContacts(callback){
  var contacts = relate.getContacts(function(info){
    callback(info);
  });
};

var createContact = function createContact(contactProperties, callback){
  var newContact = relate.createContact(contactProperties,function(info){
    callback(info);
  })
};

var updateContact = function updateContact(contactId, contactInfo, callback){
  var updateContact = relate.updateContact(contactId, contactInfo, function(info){
    callback(info);
  })


}

module.exports ={
  fetchContacts: fetchContacts,
  fetchContact: fetchContact,
  createContact: createContact,
  updateContact: updateContact
};
