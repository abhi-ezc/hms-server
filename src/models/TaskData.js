const mongoose=require('../db/connect');
var Schema=mongoose.Schema;
var newTaskSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    primary_person:{
        person_name:String,
        person_id:String
    },
    secondary_person:{
        person_name:String,
        person_id:String
    },
    priority:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        
        required:true
    },
    who:{
        type:String,
        required:false
    },
    status:{
        type:String
    }
})

var newTask=mongoose.model('task-data',newTaskSchema);
module.exports=newTask;
