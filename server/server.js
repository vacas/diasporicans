const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      nodemailer = require('nodemailer'),
      app = express(),
      env = require('dotenv').config(),
      port = process.env.PORT || 3000,
      Host = require('./db/host'),
      Donate = require('./db/donate');

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

app.post('/form/host-center', function(req, res){
  let accepted = false;
  if(req.body.accept === 'on'){
    accepted = true;
  }

  const result = {
    'first_name': req.body.FirstNameHost,
    'last_name': req.body.LastNameHost,
    'email': req.body.EmailAddressHost,
    'telephone': req.body.TelephoneHost,
    'date': req.body.TimeHost,
    'location': req.body.LocationHost,
    'accepted': accepted
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Host Center',
    text: JSON.stringify(result,null,2)
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

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
  const result = {
    'first_name': req.body.FirstNameDonate,
    'last_name': req.body.LastNameDonate,
    'email': req.body.EmailAddressDonate,
    'telephone': req.body.TelephoneDonate,
    'profession': req.body.ProfessionalDonate,
    'howtohelp': req.body.HowToHelp,
    'accepted': accepted
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Donate Time',
    text: JSON.stringify(result,null,2)
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

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
