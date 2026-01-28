import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from 'jsonwebtoken'

const registerUser = asyncHandler( async (req, res) => {
    // regester user process
    // check all validation is filled or not
    // check is user already exists or not
    // create the user

    // validation of all fields
    const {email, password, username, profilePic} = req.body

    // console.log("email: ", email)

    if(
        [email, password, username].some((field) => field?.trim() === "")
    ){
        throw new apiError(405, "All fields are requird.")
    }

    // check is user exists or not
    const existingUser = await User.findOne({
        $or: [{ email: email }, { username: username }]
    })
    if(existingUser){
        if(existingUser.email){
            throw new apiError(410, "Email already exists")
        }
        if(existingUser.username){
            throw new apiError(410, "username already exists")
        }
    }


    const profilePicLocalPath = req.files?.profilePic[0]?.path  // path of our file
    console.log("🔵 4. File path:", profilePicLocalPath);
    console.log("🔵 4a. req.files:", req.files);

    if(!profilePicLocalPath){
        throw new apiError(409, "Profile pic path is required.")
    }
    
    const profilePicture = await uploadOnCloudinary(profilePicLocalPath)
    console.log("🔵 5. Cloudinary response:", profilePicture);
    if(!profilePicture){
        console.log("🔴 ERROR: Cloudinary returned null!");
        throw new apiError(409, "Profile picture is required.")
    }

    const user = await User.create({
        username,
        profilePic: profilePicture.url,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new apiError(500, "Something went wrong when registering the user.")
    }

    return res.status(201).json(
        new apiResponse(201, createdUser, "User registered successfully.")
    )

})

// Login user
const loginUser = asyncHandler( async(req, res) => {
    // fields validate : all require fields are fill
    // check email must be available in database
    // check password is correct or not
    // login into website

    const {email, password} = req.body

    // if(email === ""){
    //     throw new apiError(409, "Email is required")
    // }else if(password === ""){
    //     throw new apiError(409, "password is required")
    // }
    if([email, password].some((field) => field?.trim() === "")){
        throw new apiError(400, "All fields are requird.")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new apiError(404, "User not recognised, Please try other email.")
    }

    const passwordCheck = await user.isPasswordCorrect(password)
    if(!passwordCheck){
        throw new apiError(404, "Invalid password, Try again.")
    }

    // req.session.userId = user._id
    // console.log("✅ Session set for user:", user._id);
    
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const loggedInUser = await User.findById(user._id).select("-password")

    return res.status(200).json({
        success: true,
        user: loggedInUser,
        token,
        message: "User login successful",
    });
})

const logoutUser = asyncHandler( async(req, res) => {
    return res.status(200).json(
        new apiResponse(200, {}, "Loggout successfull.")
    )
})
export {registerUser, loginUser, logoutUser}