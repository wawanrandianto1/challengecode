const express = require('express');

// read .env file for config settings
require('dotenv').config();

const app = express();
const path = require('path');
// const passport = require('passport');
const server = require('http').createServer(app);
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const logger = require('morgan');

// ROUTES
const routerApp = require('./routes/index');
const { binaryGap } = require('./controller/SecondController');

const port = process.env.PORT || 8081;
let sess = {
  secret: process.env.SECRET_KEY || 'abcd4',
  resave: false,
  saveUninitialized: true,
  cookie: {},
};
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// Initializing passport
// require('./config/passport')(passport);

// Enable body parser for express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable the CORS
// app.use(cors());

// enable session. cookie + flash
app.use(cookieParser('abcd4'));
app.use(session(sess));
app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());

// set static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Global variable for flash (it's a middleware)
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('success');
  res.locals.warningMsg = req.flash('warning');
  res.locals.infoMsg = req.flash('info');
  res.locals.errorMsg = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routerApp);

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/main.html')));
server.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Running and listening on PORT:${port}`);
});

// binaryGap()
