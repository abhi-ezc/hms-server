const express=require('express');
const userdata = require('../models/UserData');
const SignRouter=express.Router();
const bcrypt = require('bcrypt');
const mongoose=require('../db/connect');
SignRouter.post('/adduser', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

    newUser = {
        name: req.body.user.name,
        age: req.body.user.age,
        address: req.body.user.address,
        gender: req.body.user.gender,
        email: req.body.user.email,
        mobile: req.body.user.mobile,
        password: bcrypt.hashSync(req.body.user.password, 10, (data) => {
            //console.log(data);

        })
    }

    userdata.find({ $or: [{ mobile: newUser.mobile }, { email: newUser.email }] }).count().then((documents) => {
        console.log(documents);
        if (documents > 0) {
            res.send({ msg: "User already Registered" });
        }
        else {
            newUser = new userdata(newUser);
            newUser.save();
            res.send({ msg: "Success" });
        }

    });


});


SignRouter.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    const login = JSON.parse(JSON.stringify(req.body.login));
    userdata.findOne({ email: login.email }).then((data) => {
        if (data == null || !bcrypt.compareSync(login.password, data.password)) {
            res.send(null);
        }
        else {
            req.session.loggedin = true;
            req.session.userId = data._id;
            res.send(data);
        }
    });

})




module.exports=SignRouter;