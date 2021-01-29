const   express = require('express'),
        app = express(),
        methodOverride = require('method-override'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        flash = require('connect-flash'),
        path = require('path');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/webssh2');

const indexRoutes = require('./routes/index');
const connectionRoutes = require('./routes/connection');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../BrowSSH/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

app.use(
    require('express-session')({
        secret: 'Once again Star wins cutest dog!',
        resave: false,
        saveUninitialized: false
    })
);

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/connection', connectionRoutes);

app.listen(3333, function () {
  console.log('BrowSSH is running');
});