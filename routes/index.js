var express = require('express');
var router = express.Router();
var relateiq = require('../relate-facade.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(req,res,next){
  relateiq.fetchContacts();
});

router.get('/contact', function(req,res,next){
  relateiq.fetchContact('mmmcgrath5@hotmail.com')
});

router.post('/contact', function(req,res,next){
  var contactInfo = {
    name: "Facade",
    email:"Facade@test.com",
    phone:"0277777777",
    address: "123 fake street"
  }
  relateiq.createContact(contactInfo)
})

module.exports = router;
