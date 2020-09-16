const express = require("express");
const userdata = require("../models/UserData");
const AdminRouter = express.Router();
const mongoose = require("../db/connect");
const bcrypt = require("bcrypt");
const AdminData = require("../models/AdminData");
const taskdata = require("../models/TaskData");

AdminRouter.route("/login/:login").get((req, res) => {
  var login = JSON.parse(JSON.stringify(req.params.login));

  login = JSON.parse(login);
  AdminData.findOne({ uname: login.uname }).then((data) => {
    if (!data) {
      return res.json({ msg: "Not Found" });
    } else {
      if (bcrypt.compareSync(login.password, data.password)) {
        return res.json({
          msg: true,
          userId: data._id,
        });
      } else {
        return res.json({
          msg: false,
        });
      }
    }
  });
});

AdminRouter.route("/family").get((req, res) => {
  userdata.find({ "family.head": true }).then((data) => {
    console.log(data);
    res.send(data);
  });
});

AdminRouter.route("/getuser/:id").get((req, res) => {
  const id = req.params.id;

  userdata.findOne({ _id: id }).then((data) => {
    res.send(data);
  });
});

AdminRouter.route("/updateuser/:id").post((req, res) => {
  const id = req.params.id;
  var user = {
    name: req.body.data.name,
    age: req.body.data.age,
    address: req.body.data.address,
    gender: req.body.data.gender,
    email: req.body.data.email,
    mobile: req.body.data.mobile,
  };
  userdata.update({ _id: id }, { $set: user }).then((data) => {
    return res.send({ msg: "updated" });
  });
});

AdminRouter.route("/deleteuser/:id").get((req, res) => {
  const id = req.params.id;
  console.log(id);

  userdata.remove({ _id: id }).then((data) => {
    res.send({ msg: "deleted" });
  });
});

AdminRouter.route("/getusers").get((req, res) => {
  userdata.find({}, { name: 1 }).then((data) => {
    res.send(data);
  });
});

AdminRouter.route("/gettasks").get((req, res) => {
  taskdata.find({}).then((data) => {
    res.send(data);
  });
});

module.exports = AdminRouter;
