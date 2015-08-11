var request = require('request');
var path = require('path');


describe('/contacts', function(){
    it("responds with text", function(done){
      request("http://localhost:3000", function(error, response, body){

        expect(response.statusCode).to.equal(200);
        done();
      });
    });
});
