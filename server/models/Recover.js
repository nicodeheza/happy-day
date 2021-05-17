const mongoose= require('mongoose');

const recoverSchema= new mongoose.Schema({
    email:{ type: String, required:true},
    expire:{ type: Date, default:new Date(Date.now() + (1000*60*60*24))}
});

module.exports= mongoose.model('Recover', recoverSchema);