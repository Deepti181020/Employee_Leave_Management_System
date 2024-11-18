const UserModel = require("../models/UserModel");
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const UserLogin =async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user){
            res.status(404).json({success:false,error:"User not Found"})
        }

        const isMatch = await bcrypt .compare(password,user.password)
        if(!isMatch){
            res.status(404).json({success:false,error:"Wrong Password"})
        }
        const token =jwt.sign({_id:user.id, role: user.role},process.env.JWT_KEY,
            {expiresIn:"10d"}
        )

        res.status(200).json({success:true,
            message: "Login successful",
            token,
            user:{_id:user._id, name: user.name,role: user.role},
        });
        
    } catch (error) {
        res.status(500).json({success:false , error:error.message})
        
        
    }
    
}
const verify = (req,res)=>{
    return res.status(200).json({success:true , user: req.user})

}


module.exports = {UserLogin ,verify};