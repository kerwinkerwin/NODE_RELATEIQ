var express = require('express');
var router = express.Router();
var relateIqContact = require('../relate-facade-contact.js')
var relateIqList = require('../relate-facade-list.js')
var id = "55c2d241e4b0db5e30e4f703";
var contactInfo = {
  "properties":{
    "name":[
      {
        "value":"jeuss"
      }
    ],
    "email":[
      {
        "value":"ss@test.com"
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

router.get('/contacts', function(req,res,next){
  relateIqContact.fetchContacts();
});

router.get('/contact', function(req,res,next){
  relateIqContact.fetchContact('expenses@loomio.org')
});

// router.get('/contacts/edit', function(req,res,next){
//   var contactInfo = {
//     "properties":{
//       "name":[
//         {
//           "value":"abdullah"
//         }
//       ],
//       "email":[
//         {
//           "value":"ce@jyes.com"
//         }
//       ],
//       "phone":[
//         {
//           "value":"0277777777"
//         }
//       ],
//       "address":[
//         {
//           "value":"123 fake street"
//         }
//       ]
//     }
//   };
//   relateIqContact.upsertContact("ab@test.com",contactInfo);
// });

router.get('/contacts/update', function(req,res,next){
  relateIqContact.updateContact(id, contactInfo);
})

router.get('/contacts/new', function(req,res,next){
  relateIqContact.createContact(contactInfo)
});


router.get('/lists', function(req,res,next){
  relateIqList.fetchAllLists();
});

router.get('/lists/students/one', function(req,res,next){
  relateIqList.fetchList();
})

router.get('/lists/students', function(req,res,next){
  relateIqList.fetchListItems();
})



module.exports = router;
