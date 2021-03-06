var app = require('express')();
var dotenv = require('dotenv')
dotenv.load()
var relateCredentials = {
  user:process.env.APIKEY,
  pass:process.env.APISECRET,
  sendImmediately: true
}
var bodyParser = require('body-parser')
var relate = require('@eda/relate-facade')(relateCredentials)
app.use(bodyParser.json())

var server = app.listen(3001, function () {
var port = server.address().port
  console.log('Server started on port: ' + port)
})

/* GET home page. */
app.get('/', function(req, res, next) {
  res.send('MMMKAY');
});

/* POST create contact */
app.post('/contacts/new', function(req,res,next){
  console.log(req)
  relate.createContact(req.body, function(response){
    res.setHeader('Content-Type','application/json');
    res.status(response.code);
    res.send(JSON.stringify(response));
  });
});

/* PUT update contact */
app.put('/contacts/:id/update', function(req,res,next){
  var id = req.params.id;
  relate.updateContact(id, contactInfo, function(response){
    res.send(JSON.stringify({response:response}));
  });
})
/*GET return all contacts */
app.get('/contacts', function(req,res,next){
  relate.getContacts(function(response){
    res.status(200).json(response);
  });
});
/* GET return one contact */
app.get('/contacts/:id', function(req,res,next){
  var id = req.params.id;
  relate.getContact(id, function(response){
    res.status(200).json(response);
  });
});

/* GET return all lists */
app.get('/lists', function(req,res,next){
  relate.getLists(function(response){
    res.status(200).json(response);
  });
});

/* GET return one list */
app.get('/lists/:id', function(req,res,next){
  var id = req.params.id;
  relate.getList(id, function(response){
    res.status(200).json(response);
  });
});

/* Get return all students for a list */
app.get('/lists/:id/listitems', function(req,res,next){
  var id = req.params.id;
  relate.getListItems(id,function(response){
    res.status(200).json(response);
  });
});

/* return all students from a cohort */
app.get('/students/:cohort', function(req,res,next){
  var cohort = req.params.cohort;
  relate.getCohortStudents(cohort,function(response){
    res.status(200).json(response);
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
