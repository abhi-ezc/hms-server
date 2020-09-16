const express = require('express');
const userdata = require('../models/UserData');
const UserRouter = express.Router();
const RequestData = require('../models/RequestData');
const mongoose = require('../db/connect');

UserRouter.get('/notification/:id', (req, res) => {
    const id = req.params.id;
    userdata.findOne({ _id: id }).then((data) => {
        //console.log(data.notification);

        res.send(JSON.parse(JSON.stringify(data.notification)));
    })

})

UserRouter.get('/requests/:id', (req, res) => {
    const id = req.params.id;
    userdata.findOne({ _id: id }).then((data) => {
        
        if (data.requests.length==0) {
           
            
            res.send({ "msg": "No Requests Pending" ,"requests":null});
        }
        else {
            let str = `${data.requests.length} is pending`;
            res.send({ "msg": str, "requests": data.requests });
        }
    })
})

UserRouter.get('/requestview/:id', (req, res) => {
    const id = req.params.id;

    userdata.findOne({ _id: id }, { name: 1, address: 1, age: 1, gender: 1 }).then((user) => {
        res.send({ user })
    })
})

UserRouter.post('/acceptrequest/:id', (req, res) => {
    const requested_user = req.params.id;
    const head_id = req.body.id;
    
    userdata.findOne({ $and: [{ _id: head_id }, { "requests.id": requested_user }] }).then((head) => {
        let family = head.family;
        let tempHead = new userdata(head);
        family.head = false;
        
        
        //delete all existing request of the user
        userdata.find({"requests.id":requested_user}).then((data)=>{
            
            data.forEach((element)=>{
                let index=-1;
                element.requests.forEach((item)=>{
                    if(item.id==requested_user)
                    {
                        index=element.requests.indexOf(item);
                        element.requests.splice(index,1);
                        console.log(element);
                        element.save();
                    }
                })
            })
        });

        userdata.updateOne({ _id: requested_user }, { $set: { family: family } }).then((user) => {     
        });

        return res.json({id:family.id})
    });
})

UserRouter.post('/rejectrequest/:id', (req, res) => {
    const requested_user = req.params.id;
    const head_id = req.body.id;
    // console.log(requested_user);
    
  userdata.findOne({ $and: [{ _id: head_id }, { "requests.id": requested_user }] }).then((head)=>{
     let index;
    head.requests.forEach((element)=>{
          if(element.id==requested_user)
          {
            index=head.requests.indexOf(element);
            console.log(index);
            
            head.requests.splice(index,1);
          }      
      })
      head.save();
      res.send({"msg":"Deleted"})
      
      
  })
        
})

UserRouter.route('/get/:id').get((req,res)=>{
    const id=req.params.id;
    userdata.findOne({_id:id},{name:1}).then((data)=>{
        res.send(data.name);
    })
})
module.exports = UserRouter;