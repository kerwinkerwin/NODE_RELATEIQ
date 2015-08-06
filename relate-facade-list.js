var dotenv = require('dotenv')
var unirest = require('unirest')
var base_uri = "https://api.relateiq.com/v2/lists";
var auth = {
  user:process.env.APIKEY,
  pass:process.env.APISECRET,
  sendImmediately: true
};
var headers ={'Accept':'application/json', 'Content-Type':'application/json'};
dotenv.load()

var fetchList = function fetchList (){
  unirest.get(base_uri+ "/55a70228e4b01fe8e5a3d93b")
    .auth(auth)
    .header(headers)
    .end(function(response){
      console.log(response.body);
    });
};

var fetchAllLists = function fetchAllLists(){
  unirest.get(base_uri + "/?_start=0")
    .auth(auth)
    .header(headers)
    .end(function(response){
      console.log(response.body);
    });
};

var fetchListItems = function fetchListItems (){
  unirest.get(base_uri+ "/55a70228e4b01fe8e5a3d93b/listitems")
    .auth(auth)
    .header(headers)
    .end(function(response){
      console.log(response.body);
    });
};

module.exports = {
  fetchList:fetchList,
  fetchAllLists:fetchAllLists,
  fetchListItems: fetchListItems
};
