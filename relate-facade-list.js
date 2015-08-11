var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/v2/lists";
dotenv.load()
var auth = {
  user:process.env.APIKEY,
  pass:process.env.APISECRET,
  sendImmediately: true
};
var headers ={'Accept':'application/json', 'Content-Type':'application/json'};
var testid = "55a70228e4b01fe8e5a3d93b";


var fetchList = function fetchList (id,callback){
  unirest.get(base_uri+ "/" + id)
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response.body);
    });
};

var fetchAllLists = function fetchAllLists(callback){
  unirest.get(base_uri + "/?_start=0")
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response.body)
    });
};

var fetchListItems = function fetchListItems (id,callback){
  unirest.get(base_uri+ "/"+id+"/listitems")
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response.body);
    });
};

var fetchCohortStudents = function fetchCohortStudents(id, cohort, callback){
  var cohort = cohort.toLowerCase();
  var cohortList = {
    "0":"kahu",
    "1":"ruru",
    "2":"weka"
  };
  var students = [];
  fetchListItems(id, function(response){
    response.objects.forEach(function(student){
      if(student.fieldValues['30']!= undefined){
        var cohortId = student.fieldValues['30'][0].raw
        if(cohortList[cohortId]===cohort){
          students.push({student:student.name, cohort:cohortList[cohortId]})
        };
      }
    });
    callback(students);
  });
};

module.exports = {
  fetchList:fetchList,
  fetchAllLists:fetchAllLists,
  fetchListItems: fetchListItems,
  fetchCohortStudents: fetchCohortStudents
};
