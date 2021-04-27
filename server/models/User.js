const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    email:{ type: String , required: true},
    name:{ type: String, require: true },
    birthday:{type: Date, require: true},
    password:{type:String, require: true},
    events:{ type: mongoose.Schema.Types.ObjectId, ref:'Event'},
    mailNotification:{ type: Boolean, default: true},
    browserNotification:{ type:Boolean, default: false}
});

module.exports= mongoose.model('User', userSchema);