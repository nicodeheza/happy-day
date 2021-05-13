const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    email:{ type: String , required: true},
    name:{ type: String, required: true },
    birthday:{type: Date, required: true},
    password:{type:String, required: true},
    mailNotification:{ type: Boolean, default: true},
    browserNotification: mongoose.Schema.Types.Mixed
});

module.exports= mongoose.model('User', userSchema);