var expect = require("chai").expect;
var request = require("request");
var Faker = require('Faker');

describe('GET /contacts', function(){
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
          var props =["name","email"]
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

xdescribe('POST /contacts/new', function(){
  var name = Faker.name.firstName();
  var email = Faker.internet.email();
  var contactToCreate ={
       "properties":{
         "name":[
           {
             "value":name
           }
         ],
         "email":[
           {
             "value":email
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

  it("creates correct contact", function(done){
    var cont = contactToCreate.properties.name[0].value
    var createdContactProps = res.body.properties.name[0].value
    expect(cont).to.equal(createdContactProps);
    done();
  })
})

xdescribe('PUT /contacts/:id:update', function(){
  before(function(){

  })
})

xdescribe('GET /lists/:id/listitems/:cohort', function(){
  var res;
  var listID = "55a70228e4b01fe8e5a3d93b"
  var cohort = "weka";
  beforeEach(function(done){
    request('/lists/'+listId+'/listitems/:cohort', function(error,response,body){
      res = response;
    });
  });
});
