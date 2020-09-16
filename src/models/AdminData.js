const mongoose=require('../db/connect');
const Schema=mongoose.Schema;
const adminSchema=new Schema({
    uname:String,
    password:String
});

var admin=mongoose.model('admin-data',adminSchema);
module.exports=admin;