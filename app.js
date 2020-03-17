'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { initGoogleCalendar, } = require('./Google-Calendar/GoogleInitializtion');

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.engine('jsx', require('express-react-views').createEngine());
	
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  initGoogleCalendar(googleEvents => {
    res.render('index', { googleEvents, });
  });
});

app.listen(port);
