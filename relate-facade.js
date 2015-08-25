var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/v2/contacts";
var listUri = "https://api.relateiq.com/v2/lists"
var headers ={
      'Accept':'application/json',
      'Content-Type':'application/json'
    };
var user;
var pass;
var auth;


var initialize = function initialize(relateCredentials){
  auth = {
    user: relateCredentials.user,
    pass: relateCredentials.pass,
    sendImmediately:true
  };
  return {
    getContacts: getContacts,
    getContact: getContact,
    createContact: createContact,
    updateContact: updateContact,
    getLists: getLists,
    getList: getList,
    getCohortStudents: getCohortStudents
  }
}

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
var getList = function getList(id,callback){
  _uniGet(listUri + "/" + id, function(response){
    callback(response);
  })
};

var getLists = function getLists(callback){
  _uniGet(listUri + "/?_start=0",function(response){
    callback(response);
  })
}

var getListItems = function getListItems(id, callback){
    _uniGet(listUri+"/"+id+"/listitems", function(response){
      callback(response);
    })
}

var getCohortStudents = function getCohortStudents(cohort,callback){
  var cohort = cohort.toLowerCase();
  var cohortRelateId = "55a70228e4b01fe8e5a3d93b";
  var cohortList = {
    "0":"kahu",
    "1":"ruru",
    "2":"weka"
  };
  var studentsObject = {cohort:cohort,students:[]};
  getListItems(cohortRelateId, function(response){
    response.objects.forEach(function(student){
      if(student.fieldValues['30']!= undefined){
        var cohortId = student.fieldValues['30'][0].raw
        if(cohortList[cohortId]===cohort){
          studentsObject.students.push({student:student})
        };
      }
    });
    callback(studentsObject);
  });
}

module.exports = initialize;
