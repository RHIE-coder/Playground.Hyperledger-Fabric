/* const FileStore = require('session-file-store')(server_session); /* TEST */
const express = require('express')
const app = express()
const https = require('https')
const path = require('path')
const cookieParser = require('cookie-parser');
const server_session = require('express-session');
const helmet = require('helmet')
const favicon = require('serve-favicon');
const { serverConfig, uploadConfig } = require("./config/configurations");
const database = require("./database/mongodb")

// View Setting
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// Favicon & Static
app.use(favicon(path.join(__dirname, 'public', 'money.ico')));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(server_session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
}))

// Helmet
app.use(helmet());

// Passport
const passport = require('passport');
const flash = require('connect-flash'); //passport의 플래시 메시지가 사용하는  기능
const immigration = require('./lib/immigration');

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
immigration.init(passport);
app.set('passport', passport)


// Request Logging on Console
app.use("/", (req, res) => {
    console.log({
        method: req.method,
        url: req.url
    });
    req.next()
})

// Database
database.init(app, serverConfig);

// Multipart
const multer = require('multer');
app.set('upload', multer(uploadConfig))

require('./routes/route_loader').init(app);

https.createServer(serverConfig.httpsOpts, app).listen(serverConfig.port, () => {
    console.log(`app listening at https://localhost:${serverConfig.port}`);
});
