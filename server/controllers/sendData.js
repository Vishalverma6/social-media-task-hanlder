const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.submitData = async(req, res) => {

    try{
        // fetch the data from req body
        const {name, socialMediaHandle} = req.body;
        console.log("name,social",name,socialMediaHandle)

        // Validation
        if(!name || !socialMediaHandle){
        return res.status(401).json({
            success:false,
            message:"All fields are required",
        });
        }

        
        // get the images 
        const userImages = req?.files?.images;
        if(!userImages ||!req.files.images ===0){
            return res.status(400).json({
                success: false,
                message: "No images uploaded",
            });
        }
        
        // This is for handling single images 
        const arrayImages = Array.isArray(userImages) ? userImages : [userImages];

        // now uplaod each image on cloudinary
        const imageUrls =[];
        for(let image of arrayImages){
            const userImage = await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
            imageUrls.push(userImage.secure_url);
        }
        

        
        // console.log("userImage222s",userImage);

        // create an entry for new user images and social media handle 
        const newUser = await User.create({
            name,
            socialMediaHandle,
            images:imageUrls,
        });

        const moment = require('moment');

// Assuming you have a UTC date like below:
const yourUTCDate = new Date('2025-01-15T21:37:34.104Z'); // Example UTC date
const localTime = moment.utc(newUser.createdAt).local().format(); // Converts UTC to local time

console.log(localTime); // Outputs the local time


        // return response 
        return res.status(200).json({
            success:true,
            message:"All the data submitted successfully ",
            data:newUser,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Uplaoding the data get Failed, try again",
        });
    }


}

// fetching the All the data
exports.getAllUserData =async(req, res) => {
    try{

        // fetch the all user data
        const userData = await User.find({});
        console.log("userData",userData);

        // return response
        return res.status(200).json({
            success:true,
            message:"Fetched all User Data Successfully",
            data:userData,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch the data of all user, please try again",
        });
    }
}

// delete the single user Data
exports.deleteUserData = async(req, res) => {
    try{

        // fetch the Id of user ID from req body
        const {dataId} = req.body;
        console.log("dataId",dataId)

        // validation
        if(!dataId){
            return res.status(403).json({
                success:false,
                message:"Data Id is required",
            });
        }

        const user = await User.findById(dataId);
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User Not Found "
            })
        }
        
        await User.findByIdAndDelete(dataId);

        // return res
        return res.status(200).json({
            success:true,
            message:"User Data Deleted Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Delete user Data, Please Try Again Later",
        });
    }
}