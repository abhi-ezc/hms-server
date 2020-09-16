const mongoose=require('../db/connect');
var Schema=mongoose.Schema;
var newRequestSchema=new Schema({
    fromId:String,
    fromName:String,
    toId:String,
    status:String
})
var RequestData=mongoose.model('request-data',newRequestSchema);
module.exports=RequestData;