const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createCourse = async(req, res)=>{
    try{
        const {courseName, courseDescription, whatWillYouLearn, price, tag} = req.body;
        const thumbnail = req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are necessary"
            })
        }
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details not found"
            })
        }


        //upload to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatWillYouLearn:whatWillYouLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,

        })

        //add the new course to user schema
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );


        return res.status(200).json({
            success:true,
            message:"Course created Successfully",
            data:newCourse
            
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Failed to create course"
        })
    }
}

exports.showAllCourses = async (req, res) =>{
    try{
        const allCourses = await Course.find({}, {
            courseName: true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReview:true,
            studentsEnrolled:true,
        })
        .populate("instructor")
        .exec();
        return res.status(200).json({
            success:true,
            message:'Data for all courses',
            data:allCourses
        })
    }
    catch(err){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
    }
}