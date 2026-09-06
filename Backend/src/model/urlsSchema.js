const mongoose= require("mongoose");
const urlSchema= new mongoose.Schema({
    originalURL:{type:String, required:true},
    shortCode:{type:String, required:true},
    userId:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
});
const URL= mongoose.model("URL", urlSchema);
module.exports=URL;