const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      nodemailer = require('nodemailer'),
      app = express(),
      env = require('dotenv').config(),
      router = require('express').Router();
      Host = require('./db/host'),
      Donate = require('./db/donate');

// Configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// Body Message for Confirmation Email
const message = function(section){
  let body = "Thank you for contacting <a href='http://www.diasporicans.com'>diasporicans.com</a><br><br>We will be contacting as soon as possible regarding to your submission in the " + section + " section. <br><br> Remember to 'Like' and 'Share' our page, <a href='https://www.facebook.com/diasporicans/'>Diasporicans</a> on Facebook, to create more awareness in the diaspora and in your network about what's going on in Puerto Rico.<br><br> Cheers y ¡pa' lante, Boricua!"
  return body;
}

// Main page view
router.get('/', function (req, res) {
    res.render('home');
});


// Form for Hosting a Donation Center
router.post('/form/host-center', function(req, res){
  let accepted = false;
  if(req.body.accept === 'on'){
    accepted = true;
  }

// Getting details about form
  const result = {
    'first_name': req.body.FirstNameHost,
    'last_name': req.body.LastNameHost,
    'email': req.body.EmailAddressHost,
    'telephone': req.body.TelephoneHost,
    'date': req.body.TimeHost,
    'location': req.body.LocationHost,
    'accepted': accepted
  }

  // Setting options for delivery for Diasporicans
  const mailOptions_to_diasporicans = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Host Center',
    text: JSON.stringify(result,null,2)
  };

  // Setting options for delivery for sender
  const mailOptions_to_sender = {
    from: process.env.EMAIL,
    to: result.email,
    subject: 'Thank you for contacting us',
    html: message('Hosting a Donation Center')
  };

  // Deliver message to Diasporicans
  transporter.sendMail(mailOptions_to_diasporicans, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Deliver message to sender
  transporter.sendMail(mailOptions_to_sender, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Store in DB
  Host.create(result,function(err, data){
  if (err) {
      res.json({ message: 'Something went wrong'});
      res.send(err);
   } else {
     res.status(202).redirect('/');
   }
  })
})


// Form to Donate Time
router.post('/form/donate-time', function(req, res){
  let accepted = false;
  if(req.body.accept === 'on'){
    accepted = true;
  }
  // Getting details about form
  const result = {
    'first_name': req.body.FirstNameDonate,
    'last_name': req.body.LastNameDonate,
    'email': req.body.EmailAddressDonate,
    'telephone': req.body.TelephoneDonate,
    'profession': req.body.ProfessionalDonate,
    'howtohelp': req.body.HowToHelp,
    'accepted': accepted
  }

  // Setting options for delivery for Diasporicans
  const mailOptions_to_diasporicans = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Donate Time',
    text: JSON.stringify(result,null,2)
  };

  // Setting options for delivery for sender
  const mailOptions_to_sender = {
    from: process.env.EMAIL,
    to: result.email,
    subject: 'Thank you for contacting us',
    html: message('Donate Time')
  };


  // Deliver message to Diasporicans
  transporter.sendMail(mailOptions_to_diasporicans, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Deliver message to sender
  transporter.sendMail(mailOptions_to_sender, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Store in DB
  Donate.create(result,function(err, data){
  if (err) {
      res.json({ message: 'Something went wrong'});
      res.send(err);
   } else {
     res.status(202).redirect('/');
   }
  })
})


// Form for Contact Us
router.post('/form/contactus', function(req, res){
  // Getting details about form
  const result = {
    'first_name': req.body.FirstNameContact,
    'last_name': req.body.LastNameContact,
    'email': req.body.EmailAddressContact,
    'telephone': req.body.TelephoneContact,
    'profession': req.body.ProfessionalContact,
    'message': req.body.MessageContact
  }

  // Setting options for delivery for Diasporicans
  const mailOptions_to_diasporicans = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Message for Diasporicans',
    text: JSON.stringify(result,null,2)
  };

  // Setting options for delivery for sender
  const mailOptions_to_sender = {
    from: process.env.EMAIL,
    to: result.email,
    subject: 'Thank you for contacting us',
    html: message('Contact Us')
  };

  // Deliver message to Diasporicans
  transporter.sendMail(mailOptions_to_diasporicans, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Deliver message to sender
  transporter.sendMail(mailOptions_to_sender, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Redirect to main page
  res.status(202).redirect('/');
});

module.exports = router;
