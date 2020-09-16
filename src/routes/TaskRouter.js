const mongoose = require('../db/connect');
const express = require('express');
const cron = require('node-cron');
const scheduler = require('node-schedule');
const userdata = require('../models/UserData');
const taskdata = require('../models/TaskData');

const taskRouter = express.Router();
const eventEmitter=require('../emitters/task-assign');
let count = 0;

taskRouter.route('/assign').post((req, res) => {
    var newTask = new taskdata(req.body);
    newTask.status = "pending";
    newTask.who=newTask.primary_person.person_id;
    let id=newTask._id;
    newTask.save().then(()=>
    {
        eventEmitter.emit('newtask',id);
    });
    return res.json({'msg':'alerted'});
})

taskRouter.route('/getyourtasks/:id').get((req,res)=>{
    const id=req.params.id;
    taskdata.find({userId:id}).then((data)=>{
        return res.send(data);
    })
})

taskRouter.route('/getassignedtasks/:id').get((req,res)=>{
    const id=req.params.id;
    taskdata.find({who:id}).then((data)=>{
        return res.send(data);
    })
})

taskRouter.route('/delete').post((req,res)=>{
    const id=req.body.id;
    
    taskdata.remove({_id:id}).then((data)=>{
        
        return res.send({'msg':'deleted'});
    })
})

taskRouter.route('/get/:id').get((req,res)=>{
    const id=req.params.id;
    taskdata.findOne({_id:id}).then((data)=>{
        return res.send({data});
    })
})

taskRouter.route('/assigned/:id').get((req,res)=>{
    const id=req.params.id;
    taskdata.find({who:id}).then((data)=>{
        return res.send(data);
    })
})

taskRouter.route('/complete').post((req,res)=>{
    const id=req.body.id;
    console.log(id);
    taskdata.updateOne({_id:id},{$set:{status:"completed"}}).then((data)=>{
        console.log(data);
        return res.send({'msg':'Congrats'});
    })
    
})

module.exports = taskRouter;