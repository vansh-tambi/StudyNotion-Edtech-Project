const mongoose = require("mongoose");


const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60
    }
})

async function sendVerificationEmail(email , otp) {
    try{
        const mailResponse = await mailSend
    }
    catch(err){
        console.log("Error occured while sending mail", err);
        throw err;
    }
}

module.exports = mongoose.model("Profile" , OTPSchema);