var express = require('express');
var router = express.Router();
var relateIqContact = require('../relate-facade-contact.js')
var relateIqList = require('../relate-facade-list.js')
var id = "55c2d241e4b0db5e30e4f703";
var contactInfo = {
  "id":id,
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
  id = req.params.id;
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
  id = req.params.id;
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
router.get('/lists/students/one', function(req,res,next){
  relateIqList.fetchList();
})

/* Get return all students for a list */
router.get('/lists/:id/items', function(req,res,next){
  id = req.params.id;
  relateIqList.fetchListItems(id,function(response){
    res.send(JSON.stringify({response:response}));
  });
})

module.exports = router;
