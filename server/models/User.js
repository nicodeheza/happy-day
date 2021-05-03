const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    email:{ type: String , required: true},
    name:{ type: String, required: true },
    birthday:{type: Date, required: true},
    password:{type:String, required: true},
    events:{ type: mongoose.Schema.Types.ObjectId, ref:'Event'},
    mailNotification:{ type: Boolean, default: true},
    browserNotification:{ type:Boolean, default: false}
});

module.exports= mongoose.model('User', userSchema);