const User =  require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator= require("otp-generator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SchemaTypeOptions } = require("mongoose");

exports.sendOTP = async(req, res) => {

    try{
        const {email} = req.body;
    const checkUserPresent = await User.findOne({email});
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:'User already registered'
        })
    }
    var otp = otpGenerator.generate(6 , {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    console.log("OTP generated" ,otp);
    const result = await OTP.findOne({otp: otp});
    while(result){
        otp = otpGenerator(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        result = await OTP.findOne({otp: opt});
    }
    const otpPayload = {email , otp};
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    res.status(200).json({
        success:true,
        message:'OTP sent Successfully',
        otp,
    })

}
    catch(err){
        console.log("Error in generating OTP");
        console.log(err);
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
    
}

exports.signUp = async(req, res )=>{
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        if(!firstName || !lastName || !email || !password|| !confirmPassword || ! accountType || !contactNumber || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            });
        }
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message: "OTP found"
            })
        }
        else if(otp  !== recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
        })
        return res.status(200).json({
            success:true,
            message:"User is registered Successfully",
            user
        })
    }   

    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"User cannot be registered please try again"
        })
    }

}

exports.login = async(req, res )=> {
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not registered please signUp before login"
            })
        }
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                id: user._id,
                role:user.role
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h"
            }); 
            user.token = token;
            user.password = undefined;
            const options= {
                expires: new Date(Date.now() + 3* 24 * 60 * 60 * 1000),
                httpOnly: true,

            }
            res.cookie("token" , token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })
        }
        else{
            return res.status(201).json({
                success:false,
                message: "password do not match"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).res({
            success:false,
            message:"Login Failure try again",
        })
    }

}