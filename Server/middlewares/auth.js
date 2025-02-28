const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async(req, res , next)=>{
    try{
        const token = req.cookie.token ||   req.body.token || req.header("Authorization").replace("Bearer", "");
        if(!token){
            res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:'token is Invalid'
            });
        }
        next();
    }
    catch(err){
        res.status(401).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.isStudent = async (req, res, next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students only"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role cannot verified, please try again'
        })

    }
}

exports.isInstructor = async (req, res, next) =>{
    try{
        if(req.user.accountType !== "isInstructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role cannot verified, please try again'
        })

    }
}

exports.isAdmin = async (req, res, next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role cannot verified, please try again'
        })

    }
}