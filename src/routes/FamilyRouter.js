const express = require('express');
const userdata = require('../models/UserData');
const FamilyRouter = express.Router();
const requestData = require('../models/RequestData');
const mongoose = require('../db/connect');

FamilyRouter.get('/createFamily/:id', (req, res) => {
    const id = req.params.id;
    const genId = mongoose.Types.ObjectId();
    userdata.update({ _id: id }, { $set: { "family.id": genId, "family.head": true } }).then((data) => {
        res.send({ "id": genId });
    })

});

FamilyRouter.post('/joinFamily/:id', (req, res) => {
    const family_id = req.params.id;
    const requested_user_id = req.body.from;
    var request = {
        id: requested_user_id,
        name: "",
        status: "pending"
    };
    userdata.findOne({ $and: [{ "family.head": true }, { "family.id": family_id }] }).then((data) => {
        if (data == null) {
            return res.json({ "msg": "No Family Found" });
            
        }
        else {
            let flag=false;
            data.requests.forEach((element) => {
                if (element.id == requested_user_id) {
                    flag=true;
                    return;
                }
            });
            
            if(flag==false)
            {
                userdata.findOne({ _id: requested_user_id }).then((user) => {
                    request.name=user.name;
                    
                    //userdata.update({_id:data._id},{$push : {requests:request}});
                    var updateUser=new userdata(data);
                    updateUser.requests.push(request);
                    console.log(updateUser);
                    updateUser.save();
                   return res.json({'msg':'request has been sent to the family head'})
                    
                })
                
            }
            else
            {
                return res.json({ "msg": "Request already Pending" });
            }

        }

    })


});


FamilyRouter.get('/members/:id', (req, res) => {
    const id = req.params.id;
    userdata.find({ "family.id": id }).then((data) => {
        members = new Array(data.length);
        let i = 0;
        data.forEach((element) => {
            members[i] = {
                "name": element.name,
                "id": element._id
            }
            i++;
        })
        //console.log(members);
        res.send({ "members": members });


    })
})


module.exports = FamilyRouter;