const express = require('express');
const connection = require('./config/db');
const session = require('express-session');
const app = express();
app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = 3000;
const passport = require('passport');
const passportConfig = require('./config/passport');

passportConfig();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./router/router'));


connection;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});