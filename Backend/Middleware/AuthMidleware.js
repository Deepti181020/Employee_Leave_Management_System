const jwt = require ('jsonwebtoken');
const UserModel = require( '../models/UserModel');
const verifyUser = async (req,res,next) => {

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(400).json({success: false, error: "Token Not Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY);
        if(!decoded){
            return res.status(400).json({success: false, error: "Token Not Valid"})

        }

        const user = await UserModel.findById(decoded._id).select("-password");

        if(!user){
            return res.status(400).json({success: false, error: "User not Found"})

        }
        req.user = user
        next();
    }catch(error){
        return res.status(500).json({success: false, error: "Serever error"})

    }
    
}
module.exports = verifyUser;