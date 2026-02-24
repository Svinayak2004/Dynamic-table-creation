import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import User from "../models/User.js";
import asyncHandler from '../middleware/asyncHandler.js';


export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("all fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("user alredy exist");
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashPassword
    });

    res.status(201).json({
        success: true,
        message: "User register successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
});

export const login = asyncHandler( async(req, res) => {

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("all fields requird");
    }
    

    const user = await User.findOne({ email });

    if(!user){
        res.status(404);
        throw new Error("user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if(!isMatch){
        res.status(400);
        throw new Error("invalid credentials");
    }

    const token = jwt.sign({id:user.id , role :user.role},
        process.env.JWT_SECRET,
        {expiresIn :'1d'}
    );

    res.cookie("token", token ,{
        httpOnly : false,// false we can access wia using document.cookie
        secure : false,
        sameSite : "strict",
        maxAge : 24 * 60 * 60 * 1000
    })
    
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message : "user logout"})
    console.log('user logout')
}