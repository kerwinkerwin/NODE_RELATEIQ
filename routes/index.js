var express = require('express');
var router = express.Router();
var relateIqContact = require('../relate-facade-contact.js')
var relateIqList = require('../relate-facade-list.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(req,res,next){
  relateIqContact.fetchContacts();
});

router.get('/contact', function(req,res,next){
  relateIqContact.fetchContact('mmmcgrath5@hotmail.com')
});

router.get('/contact/new', function(req,res,next){
  var contactInfo = {
    "properties":{
      "name":[
        {
          "value":"abdullah"
        }
      ],
      "email":[
        {
          "value":"ab@test.com"
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
  relateIqContact.createContact(contactInfo)
});


router.get('/lists', function(req,res,next){
  relateIqList.fetchAllLists();
});

router.get('/lists/students', function(req,res,next){
  relateIqList.fetchList();
})

router.get('/lists/students/all', function(req,res,next){
  relateIqList.fetchListItems();
})

module.exports = router;
