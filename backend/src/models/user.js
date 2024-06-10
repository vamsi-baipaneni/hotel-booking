const mongoose = require('mongoose');
//deconstructing schema function from mongoose
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

//create user schema for mongodb
const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    countryCode: {type: String, required: true},
    phoneNumber: {type:String, required: true, unique: true},
    createdOn: {type: Date, default: Date.now}
});

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password =  await bcrypt.hash(this.password, 8)
    }
    next();
})

//create the user model, pass the mongodb document and userSchema created above as arguments
const User = mongoose.model('User', userSchema);
//export User model to use elsewhere.
module.exports = User;