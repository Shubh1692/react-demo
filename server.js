// get all the tools we need
const express = require('express'),
    Config = require('./app.config'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    path = require('path');
// connect app to database
mongoose.connect(Config.MONGOURL, {}).then((success) => {
    console.info('success connect mongo db')
}, (error) => {
    console.error('error connect mongo db', error)
});


app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', Config.REQUEST_HEADER['Access-Control-Allow-Origin']);
    res.setHeader('Access-Control-Allow-Methods', Config.REQUEST_HEADER['Access-Control-Allow-Methods']);
    res.setHeader('Access-Control-Allow-Headers', Config.REQUEST_HEADER['Access-Control-Allow-Headers']);
    next();
});

app.use(bodyParser.json({
    extended: true
 })); // get information from html forms
 app.use(bodyParser.urlencoded({
    limit: '10mb', extended: true
 }));

app.use('/images', express.static('uploads'));
require('./server/route')(app);

app.set('port', (process.env.PORT || Config.NODE_SERVER_PORT));
app.use('/', express.static('build'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});
const appHttpServer = http.Server(app).listen(app.get('port'), () => {
    console.log(`server running at ${app.get('port')}`);
});
