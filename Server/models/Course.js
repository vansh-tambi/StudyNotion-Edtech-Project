const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    WhatYouWillLearn:{
        type:String,
    },
    CourseContent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Section"
    },
    ratingAndReview:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"RatingAndReview"  
    }],
    price:{
        type:Number
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:[String],
        required:true
    },
    studentsEnrolled:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    }]  ,
    status:{
        type:String,
        enum:["Draft" ,"Published"]
    }


})

module.exports = mongoose.model("Course" , courseSchema);