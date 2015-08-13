var expect = require("chai").expect;
var request = require("request");
var Faker = require('Faker');


describe('GET /lists/:id/listitems/:cohort', function(){
  var parsedResponse;
  var res;
  var listId = "55a70228e4b01fe8e5a3d93b"
  var cohort = "weka";
  before(function(done){
    request('http://localhost:3000/lists/'+listId+'/listitems/'+cohort, function(error,response,body){
      res = response;
      parsedResponse = JSON.parse(response.body)
      done();
    });
  });
  it("Is OK", function(done){
    expect(res.statusCode).to.equal(200);
    done();
  });
  it("Cohort returned is correct", function(done){
    expect(parsedResponse.cohort).to.equal(cohort);
    done();
  });
  it("Returns an array of students", function(done){
    expect(parsedResponse.students).to.be.a('array');
    done();
  });
  it("Returned student belongs to correct list", function(done){
    var student = parsedResponse.students[0].student.listId
    expect(student).to.equal(listId);
    done();
  })
});
