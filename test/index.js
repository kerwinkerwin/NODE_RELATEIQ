var expect = require("chai").expect;
var request = require("request");

describe('/contacts', function(){
    before(function(){

    });
    it("has 200 status", function(done){
      request("http://localhost:3000/contacts", function(error, response, body){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns an array of contacts", function(done){
      request("http://localhost:3000/contacts", function(error,response,body){
        // expect(response.body).to.contain("objects")
        var parsedResponse = JSON.parse(response.body);
        expect(parsedResponse.response.objects).to.have.length.above(0);
        done();
      });
    });
});
