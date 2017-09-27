const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      exphbs  = require('express-handlebars'),
      layouts = require('handlebars-layouts'),
      app = express(),
      port = process.env.PORT || 3000,
      routes = require('./routes');

// Static File
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../views')));
// app.use(express.static(path.join(__dirname, '../views/layouts')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Handlebars config
var hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: [
        'views/layouts',
        'views/layouts/partials',
    ]
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.post('/form/host-center', routes);
app.post('/form/donate-time', routes);
app.post('/form/contactus', routes);
app.get('/maps', routes);
app.get('/donations', routes);
app.get('/contact', routes);
app.get('/toolsForPR', routes);
app.get('/', routes);

// Listening to port
app.listen(port, function () {
  console.log('Listening on port ' + port + '!')
})
