const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {

    try{
    const {name, email, mobilenumber, password} = req.body;

        const existingUser = await User.findOne({email})

    if(existingUser) {
        return  res.status(409).json({
            success:false,
            massage: "email is already registerd"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobilenumber
        });
    
        res.status(201).json({
        success:true,
        massage: "registration sussecfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            mobilenumber:user.mobilenumber
        }
    });
} catch(error) {

    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}


const loginUser = async (req, res) => {

    try{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email})

    if(!existingUser) {
        return res.status(401).json({
            success:false,
            massage:"invalid email or password"
        })
    }

    const isPasswordMatched= await bcrypt.compare(password,existingUser.password)

    if(!isPasswordMatched) {
        return res.status(400).json({
            success:false,
            massage:"invalid email or password"
        })
    }

    const token = jwt.sign(
    { id: existingUser._id },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);



    return res.status(200).json({
        success:true,
        massage:"login successfully",
        token,
        user:{
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
        }
    })    
}catch(error) {
    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}

const getProfile = async (req, res) => {
    const user = req.user.id

    const finduser = await  User.findById(user)

    if(finduser) {
        return res.status(200).json({
            success:true,
            massage:"your profile",
            user:{
                id:finduser._id,
                name:finduser.name,
                email:finduser.email,
                mobilenumber:finduser.mobilenumber
            }
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}