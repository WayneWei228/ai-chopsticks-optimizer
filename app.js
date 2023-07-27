const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// firebase
const {initializeAppSA} = require('./firebase/admin.js');
// routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser')

// init express app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// init firebase service account
initializeAppSA();

app.set('port', 8080);
app.listen(app.get('port'));
console.log(`port ${app.get('port')}`)

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
