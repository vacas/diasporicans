const express = require('express'),
      path = require('path'),
      compression = require('compression'),
      bodyParser = require('body-parser'),
      exphbs  = require('express-handlebars'),
      layouts = require('handlebars-layouts'),
      flash = require('express-flash'),
      session = require('express-session'),
      app = express(),
      port = process.env.PORT || 3000,
      routes = require('./routes');

const sessionStore = new session.MemoryStore;

// Static File
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../views')));
app.use(express.static(path.join(__dirname, '../views/layouts')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true }));
app.use(compression());
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

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
app.get('/pr', routes);
app.get('/pr/maps', routes);
app.get('/maps', routes);
app.get('/miner', routes);
app.get('/donations', routes);
app.get('/contact', routes);
app.get('/toolsForPR', routes);
app.get('/', routes);

// Listening to port
app.listen(port, function () {
  console.log('Listening on port ' + port + '!')
})
