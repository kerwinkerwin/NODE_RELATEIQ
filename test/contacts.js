var expect = require("chai").expect;
var request = require("request");

xdescribe('GET /contacts', function(){
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

        describe('Contacts', function(done){
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
        it("has required fields", function(done){
          var props =["name","email","isgc"]
          expect(contact.properties).to.include.keys(props)
          done();
        });

        it("valid i.d", function(done){
          expect(contact.id).to.exist
          expect(contact.id.length).to.be.above(23)
          done();
        });
        it("valid email", function(done){
          expect(contact.properties.email[0].value).to.contain('@');
          done();
        })
      });
});

describe('POST /contacts/new', function(){
  var contactToCreate ={
       "properties":{
         "name":[
           {
             "value":"Mr tested"
           }
         ],
         "email":[
           {
             "value":"zz@test.com"
           }
         ],
         "phone":[
           {
             "value":"0277777777"
           }
         ],
         "address":[
           {
             "value":"123 fake street"
           }
         ]
       }
  };
  var res;
  before(function(done){
    request.post({
      headers: {'Content-Type':'application/json'},
      url:'http://localhost:3000/contacts/new',
      body:JSON.stringify(contactToCreate)
    },function(error,response,body){
      res = JSON.parse(response.body);
      done();
    });
  });

  it("returns 200", function(done){
    expect(res.statusCode).to.equal(200);
    done();
  });

  xit("creates correct contact", function(done){
    var cont = contactToCreate.properties.name[0].value
    var createdContactProps = res.body.properties.name[0].value
    expect(cont).to.equal(createdContactProps);
    done();
  })
})
