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
const { validSudoku } = require('./controller/FourthController');

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
// server.listen(port, () => {
//   console.log(`Running and listening on PORT:${port}`);
// });


// let board = [
//   [2,4,6,7,9,2,3,8,5],
//   [2,5,8,3,4,6,7,9,1],
//   [3,7,9,5,8,1,4,6,2],
//   [4,3,7,9,1,5,8,2,6],
//   [5,8,1,6,2,7,9,3,4],
//   [6,9,2,4,3,8,1,5,7],
//   [7,1,3,2,6,9,5,4,8],
//   [8,2,4,1,5,3,6,7,9],
//   [9,6,5,8,7,4,2,1,3],
// ];
let board = [
  [1,4,6,7,9,2,3,8,5],
  [2,5,8,3,4,6,7,9,1],
  [3,7,9,5,8,1,4,6,2],
  [4,3,7,9,1,5,8,2,6],
  [5,8,1,6,2,7,9,3,4],
  [6,9,2,4,3,8,1,5,7],
  [7,1,3,2,6,9,5,4,8],
  [8,2,4,1,5,3,6,7,9],
  [9,6,5,8,7,4,2,1,3],
];

console.log(validSudoku(board));
// binaryGap()

// const printSegitiga = (num) => {
//   for (let i = 0; i < num; i++) {
//     let str = '';

//     // first [CARA PERTAMA]
//     // let count = num - (num - 1 - i);
//     // let adding = '*'.repeat(count);
//     // str += adding;
//     // str += '\n';

//     // second [CARA KEDUA]
//     let count = num - (num - 1 - i);
//     let adding = new Array(count + 1).join('*');
//     str += adding;
//     str += '\n';

//     // third [CARA KETIGA]
//     // for (let j = 0; j < i+1; j++) {
//     //   str += '*';
//     // }
//     // str += '\n';
//     console.log(str);
//   }
// };
// printSegitiga(5);

// const printKotak = (num) => {
//   let length = num - 1;
//   for (let i = 0; i <= length; i++) {
//     let str = '';
//     for (let j = 0; j <= length; j++) {
//       if (i == 0 || j == 0 || i == length || j == length) {
//         str += '*';
//       } else {
//         str += ' ';
//       }
//     }
//     console.log(str);
//   }
// };
// printKotak(4);
