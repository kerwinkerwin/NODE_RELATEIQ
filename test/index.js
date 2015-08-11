var expect = require("chai").expect;
var request = require("request");

describe('/contacts', function(){
    var res;
    var parsedResponse;
    beforeEach(function(done){
      request("http://localhost:3000/contacts", function(error, response, body){
        res = response;
        parsedResponse = JSON.parse(res.body);
        done();
      });
    });

    it("has 200 status", function(done){
      expect(res.statusCode).to.equal(200);
      done();
    });

    it("returns an array of contacts", function(done){
      expect(parsedResponse.response.objects).to.have.length.above(0);
      done();
    });

        describe('Contact', function(done){
          var res;
          var parsedResponse;
          var contact;

        before(function(done){
          request("http://localhost:3000/contacts", function(error, response, body){
            res = response;
            parsedResponse = JSON.parse(res.body);
            contact = parsedResponse.response.objects[0];
            done();
          });
        });
        it("has all fields of contact", function(done){
          var props =["name","email","isgc"]
          expect(contact.properties).to.include.keys(props)
          done();
        });

        it("contains i.d", function(done){
          expect(contact.id).to.exist
          expect(contact.id.length).to.be.above(23)
          done();
        });
        it("contains email", function(done){
          expect(contact.properties.email[0].value).to.contain('@');
          done();
        })
      });
});
