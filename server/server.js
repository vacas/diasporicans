const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3000,
      Host = require('./db/host'),
      Donate = require('./db/donate');

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/form/host-center', function(req, res){
  let accepted = false;
  if(req.body.accept === 'on'){
    accepted = true;
  }
  var result = {
    'first_name': req.body.FirstNameHost,
    'last_name': req.body.LastNameHost,
    'email': req.body.EmailAddressHost,
    'telephone': req.body.TelephoneHost,
    'location': req.body.LocationHost,
    'accepted': accepted
  }
  console.log(result);
  Host.create(result,function(err, data){
  if (err) {
      res.json({ message: 'Something went wrong'});
      res.send(err);
   } else {
     res.status(202).redirect('/');
   }
  })
})

app.post('/form/donate-time', function(req, res){
  let accepted = false;
  if(req.body.accept === 'on'){
    accepted = true;
  }
  var result = {
    'first_name': req.body.FirstNameDonate,
    'last_name': req.body.LastNameDonate,
    'email': req.body.EmailAddressDonate,
    'telephone': req.body.TelephoneDonate,
    'profession': req.body.ProfessionalDonate,
    'howtohelp': req.body.HowToHelp,
    'accepted': accepted
  }
  console.log(result);
  Donate.create(result,function(err, data){
  if (err) {
      res.json({ message: 'Something went wrong'});
      res.send(err);
   } else {
     res.status(202).redirect('/');
   }
  })
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})
