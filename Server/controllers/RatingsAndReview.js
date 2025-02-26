const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const {default: mongoose } = require("mongoose");

exports.createRating = async(req, res) =>{
    try{
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}}}
        );

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the Course'
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'user has already reviewed the course'
            })
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId
        });

        const updatedCourseReview = await Course.findByIdAndUpdate(courseId,
            {$push:{
                ratingAndReview: ratingReview._id,
            }},
            {new:true},
        );

        console.log(updatedCourseReview)

        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            updatedCourseReview
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"err.message",
        })
    }
}

exports.getAverageRating = async(req, res) =>{
    try{
        const courseId = req.body.courseId;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"},
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating is 0 no rating is given till now",
            averageRating:0
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getAllRating = async(req, res) =>{
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName, lastName, email, image"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews and ratings fetched Successfully",
            data:allReviews
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}