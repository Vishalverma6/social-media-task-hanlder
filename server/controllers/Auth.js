const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// signUp
exports.signUp = async(req, res) => {
    try{
        // fetch the data from req body
        const{
            name,
            userName,
            password,
            confirmPassword,
        } = req.body;

        // validation  Check
        if(!name || !userName || !password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are Required",
            })
        }

        // check for password Match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmpassword  does not Match, Plese try again ",
            });
        }
        
        // check for alreday exist or not 

        const exixtingAdmin = await Admin.findOne({userName});

        if(exixtingAdmin){
            return res.status(400).json({
                success:false,
                message:"Admin is already registered",
            });
        }

        // hashing the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password",hashedPassword);

        // entry creation in db
        const admin = await Admin.create({
            name,
            userName,
            password:hashedPassword,
        });

        // return response 
        return res.status(200).json({
            success:true,
            message:"Signup Successful, Please Login",
            data:admin,
        });

    }
    catch(error){ 
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Admin cannot be registered,Please try again",
        });
    }
}

// login
exports.login = async(req, res) => {
    try{
        // fetch the data from req body
        const {userName, password} = req.body;

        // validation of login details 
        if(!userName || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required ,please try again",
            });
        }

        // check user exist or not 
        const admin = await Admin.findOne({userName});

        // validation
        if(!admin) {
            return res.status(401).json({
                success:false,
                message:"Admin is not registered ,Please signup first",
            });
        }

        // generate JWt after password matching 
        if(await bcrypt.compare(password, admin.password)){

            const payload ={
                userName:admin.userName,
                id:admin._id,
                
            }
            const  token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:'2h',
            });
            admin.token = token;
        admin.password= undefined;

        console.log("admin.token",admin.token);

        // create cookie and send response
        const options ={
            expiresIn :new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            admin,
            message:"Logged in successfully",
        })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            });
        }

        
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure ,Please try again",
        });
    }
}