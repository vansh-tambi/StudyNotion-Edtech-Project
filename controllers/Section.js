const Course = require("../models/Course");
const Section = require("../models/Section");

exports.create.Section = async (req, res)=>{
    try{
        const {sectionName, courseId} = req.body; 
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties'
            })
        }
        const newSection = await Section.create({sectionName});
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push:{
                CourseContent:newSection._id,
            }
        },
        {new:true}
    )

    return res.status(200).json({
        success:true,
        message:'Section created Successfully',
        updatedCourseDetails,
    })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to create section try again"
        })
    }
}

exports.updateSection = async (req, res) =>{
    try{
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(500).json({
                success:false,
                message:"Missing Properties"
            }) 
        }
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully'
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to create section try again"
        })
    }
}

exports.deleteSection = async (req, res) =>{
    try{
        const {sectionId} = req.body;
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"unable to Delete section try again"
        })
    }
}