const express = require('express');
const BodyParser = require('body-parser');
const chalk = require('chalk');
const app = express();
const cors = require('cors');

const userdata = require('./src/models/UserData');
const session = require('express-session');
const mongoose = require('mongoose');

const requestData = require('./src/models/RequestData');
const FamilyRouter=require('./src/routes/FamilyRouter');
const AdminRouter=require('./src/routes/AdminRouter');
const UserRouter=require('./src/routes/UserRouter');
const SignRouter=require('./src/routes/SignRouter');
const TaskRouter=require('./src/routes/TaskRouter');

app.use(cors());
app.use(function(req, res, next) {
    //set headers to allow cross origin request.
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

app.use(session({
    secret: "a hidden style jutsu",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use('/sign',SignRouter);
app.use('/family',FamilyRouter);
app.use('/user',UserRouter);
app.use('/admin',AdminRouter);
app.use('/task',TaskRouter);

app.listen(3000, () => {
    console.log('server started at port ' + chalk.green('3000'));

})