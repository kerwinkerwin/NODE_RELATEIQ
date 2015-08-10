var express = require('express');
var router = express.Router();
var relateIqContact = require('../relate-facade-contact.js')
var relateIqList = require('../relate-facade-list.js')
var contactInfo = {
  "id":"55c2d241e4b0db5e30e4f703",
  "properties":{
    "name":[
      {
        "value":"jeuss"
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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST create contact */
router.post('/contacts/new', function(req,res,next){
  relateIqContact.createContact(req.body, function(response){
    res.send(JSON.stringify({response:response.code, status: response.status}));
  });
});

/* PUT update contact */
router.put('/contacts/:id/update', function(req,res,next){
  var id = req.params.id;
  console.log(id);
  relateIqContact.updateContact(id, contactInfo, function(response){
    res.send(JSON.stringify({response:response}));
  });
})
/*GET return all contacts */
router.get('/contacts', function(req,res,next){
  relateIqContact.fetchContacts(function(response){
    res.send(JSON.stringify({response:response}));
  });
});
/* GET return one contact */
router.get('/contacts/:id', function(req,res,next){
  var id = req.params.id;
  relateIqContact.fetchContact(id, function(response){
    res.send(JSON.stringify({response:response}));
  });
});

/* GET return all lists */
router.get('/lists', function(req,res,next){
  relateIqList.fetchAllLists(function(response){
    res.send(JSON.stringify({response:response}));
  });
});

/* GET return one list */
router.get('/lists/:id', function(req,res,next){
  var id = req.params.id;
  relateIqList.fetchList(id, function(response){
    res.send(JSON.stringify({response:response}));
  });
});

/* Get return all students for a list */
router.get('/lists/:id/listitems', function(req,res,next){
  var id = req.params.id;
  relateIqList.fetchListItems(id,function(response){
    res.send(JSON.stringify({response:response}));
  });
});

router.get('/lists/:id/listitems/:cohort', function(req,res,next){
  var id = req.params.id;
  var cohort = req.params.cohort;
  relateIqList.fetchCohortStudents(id,cohort,function(response){
    console.log(response);
  })
});

module.exports = router;
