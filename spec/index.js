var request = require('request');
var path = require('path');

it("should return a contacts object",function(done){
  request("http://localhost:3000/contacts", function(error,response,body){
    console.log(response);
    console.log(body);
    done();
    expect(body).toBeTruthy();
  });
},250);
