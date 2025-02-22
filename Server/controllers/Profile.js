const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) =>{
    try{
        const {dateOfBirth ="", about ="", contactNumber, gender} = req.body;
        const id = req.user.id;
        if(!contactNumber || ! gender){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        return res.status(200).json({
            success:true,
            message:"Profile details updated",
            profileDetails
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

exports.deleteAccount = async (req, res) =>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        //i want to delete the user from the studentsEnrolled also

        await Course.updateMany(
            {studentsEnrolled: id},
            {$pull :{studentsEnrolled:id}}

        );

        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        await User.findByIdAndDelete({_id: id});
    }
    catch(err){
        console.log(error);
		res.status(500).json({ 
			success: false,
			message: "User Cannot be deleted" 
		});
    }
}

exports.getAllUserDetails = async (req,res)=>{
    try{    
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully"
        })
    }   
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        });
    }
} 