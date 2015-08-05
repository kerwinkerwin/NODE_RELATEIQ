var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var base_uri = "https://api.relateiq.com/"
require('dotenv').load();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(req,res,next){
  console.log(base_uri);
  unirest.get(base_uri +"v2/contacts")
  .auth({
    user:process.env.APIKEY,
    pass:process.env.APISECRET,
    sendImmediately: true
  })
  .headers({'Accept':'application/json','username': process.env.APIKEY,'password': process.env.APISECRET})
  .end(function(response){
    res.render('/index',{contacts:response});
  });
});

module.exports = router;
