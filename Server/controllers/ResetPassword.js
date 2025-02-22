const { addAbortSignal } = require("nodemailer/lib/xoauth2");
const User = require("../models/User");
const mailSender = require("../utils/mailSender"); 
const bcrypt = require("bcrypt")  ;

exports.resetPassworToken = async(req, res )=>{

    try{
        const email = req.body.email;
    const user = await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message:"Your email is not registered"
        })
    }

    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate({email:email},   {
        token:token,
        resetPassworExpires : Date.now() + 5*60*1000
    }, {new:true});


    const url = `http://localhost:3000/update-password/${token}`

    await mailSender(email,
        "Password reset link",
        `Password reset link: ${url}`
    );

    return res.json({
        success:true,
        message:"Email sent Successfully"
    })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong  whilre reset password"
        })
    }
}

exports.resetPassword = async (req, res) =>{
    try{
        const {password, confirmPassword, token} = req.body;
    if(password !== confirmPassword){
        return res.json({
            success:false,
            message:"password do not match "
        });
    }
    const userDetails = await User.findOne({token:token}); 
    if(!userDetails){
        return res.json({
            success:false,
            message:"token is Invalid"
        })
    }

    if(userDetails.resetPassworExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token is expired"
        })
    }
    const hashedPassword =await bcrypt.hash(password,10);
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
    )
    return res.status(200).json({
        success:true,
        message:'password reset Successfully'
    })
    }
    catch(err){
        return res.json({
            success:false,
            message:'Something went wrong'
        })
    }

}