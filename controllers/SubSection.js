const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { findById, estimatedDocumentCount } = require("../models/Course");
require("dotenv").config();

exports.createSubsection = async (req, res) => {
    try{
        const {sectionId, title, timeDuration, description} = req.body;
        const video = req.files.videoFile;
        if(! sectionId || !title || ! timeDuration || !description || !video ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const uploadDetails = await  uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        })

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                            {
                                                                $push:{
                                                                    SubSection:SubSectionDetails._id,
                                                                }
                                                            },
                                                            {new:true}
        ).populate("SubSection");

        return res.status(200).json({
            success:true,
            message:"Sub section created Successfully",
            updatedSection
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

exports.updateSubSection = async (req,res) =>{

    try{
        const {sectionId, subSectionId, title, description} = req.body;
    if(!sectionId ||!subSectionId || !title || !description ){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }
    const subSection = await SubSection.findById(subSectionId);
    if(!SubSection){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }
    subSection.title = title;
    subSection.description = description;

    if(req.files && req.files.video !== undefined){
        const video = req.files.video;
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        subSection.videoUrl = uploadDetails.secure_url;
        subSection.timeDuration = `${uploadDetails.duration}`;
    }
    console.log('Updated subsection ', subSection);
    await subSection.save();
    const updatedSection = await Section.findById(sectionId).populate("subSection");
    return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      });
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
          })
    }   
}

exports.deleteSubSection = async (req, res) =>{
    try{
        const {subSectionId, sectionId} = req.body;
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    subSection:subSectionId,
                },
            }
        );

        const subSection = await SubSection.findByIdAndUpdate({id: subSectionId});
        if(!subSection){
            return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
        const updatedSection = await Section.findById(sectionId).populate("subSection");
        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
          })
    }
    catch(err){
        console.error(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection"
      })
}
}