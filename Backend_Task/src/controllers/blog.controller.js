import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";


const createPost = asyncHandler( async(req, res) => {
    // take data from user - title, description (validate)
    // who create blog is my same user did this
    // create blog
    // send response to the user

    const {title, description} = req.body
    console.log("title: ", title)

    if (!title || !description) {
        throw new apiError(400, "Title and description are required");
    }

    const userId = req.user.id;

    const blog = await Blog.create({
        title,
        description,
        userReference: userId,
        publishDate: new Date(),
    })

    return res.status(200).json(
        new apiResponse(200, blog, "Blog created successfully.")
    )
})

const getAllPosts = asyncHandler(async (req, res) => {
    // get Blog db access
    // return response to the user

    const blogs = await Blog.find()
        .populate("userReference", "username profilePic")
        .sort({createdAt: -1})

    return res.status(201).json(
        new apiResponse(201, blogs, "All blogs fetched successfully.")
    )
})

const getPostById = asyncHandler(async(req, res) => {
    // blog id url se lena hai
    // database se specific blog find krna hai
    // check karna blog exist krta hai ya nahi
    // another detail populate karna
    // user ko response send krna
    console.log("GET POST ID:", req.params.id);

    const blogId = req.params.id
    console.log("Blog Id: ", blogId)

    const blog = await Blog.findById(blogId)
        .populate('userReference', 'username email profilePic')
    if(!blog){
        console.log("❌ Blog not found with ID:", blogId);
        throw new apiError(404, "somthing went wrong, Blog not found")
    }
    console.log("✅ Blog found ", blog.title)

    return res.status(200).json(
        new apiResponse(200, blog, "Blog found successfully.")
    )
})

const likePost = asyncHandler(async(req, res) => {
    // get blog by id
    // kon sa user like kar raha hai uska bhi id lena hoga
    // user kon hai session expire to nahi na ho chuka hai
    // check krna hoga user ne already like kiya hai ya nahi
    // like remove krna
    // response send krna

    const blogId = req.params.id
    if(!blogId){
        console.log("blogId not found")
    }
    console.log("blogid for like: ", blogId)

    const userId = req.user.id
    if(!userId){
        console.log("User is expired please login again")
        throw new apiError(404, "User session is expired.")
    }

    // find blog by id
    const blog = await Blog.findById(blogId)
    if (!blog) {
        throw new apiError(404, "Blog not found");
    }

    const isBlogLiked = blog.like.includes(userId)
    console.log("Blog liked ", isBlogLiked)

    // like toggle function
    if(isBlogLiked){
        await Blog.findByIdAndUpdate(blogId, {
            $pull: {like: userId}
        })
    }else{
        await Blog.findByIdAndUpdate(blogId, {
            $push: {like: userId}
        })
    }

    const updatedBlog = await Blog.findById(blogId).populate("userReference", "username profilePic")

    return res.status(200).json(
        new apiResponse(200, updatedBlog, isBlogLiked ? "Blog unliked" : "Blog liked")
    )
})

const updatePost = asyncHandler(async (req, res) => {
    // need blogid and find the blog
    // require title and description for update
    // validate required values
    // only blog owner chan change the blog
    // return response
    const blogId = req.params.id

    // take updated data
    const {title, description} = req.body
    console.log("Updated data: ", {title, description} )
    if(!title && !description){
        throw new apiError(409, "At least one field (title or description) is required to update")
    }

    const userId = req.user.id
    if(!userId){
        throw new apiError(401, "Please Login first")
    }

    // find blog
    const blog = await Blog.findById(blogId)
    if(!blog){
        throw new apiError(401, "Blog not found.")
    }

    // authentication check: only owner can update their own blog
    if(blog.userReference.toString() !== userId.toString()){
        throw new apiError(403, "You can only update your own blogs")
    }

    const updateFields = {}
    if(title) updateFields.title = title
    if(description) updateFields.description = description

    // update blog find by id
    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId, 
        {$set: updateFields},
        {new: true}
    ).populate("userReference", "username profilePic")

    // return response
    return res.status(201).json(
        new apiResponse(200, updatedBlog, "Blog updated successfully.")
    )
    
})

const deletePost = asyncHandler(async (req, res) => {
    // take blog id or find blog id
    // only blog owner can delete the blog
    // find by id and delete the blog
    // return response
    const blogId = req.params.id
    const userId = req.user.id

    const blog = await Blog.findById(blogId)
    if(!blog){
        throw new apiError(404, "Blog not found.")
    }

    if(blog.userReference.toString() !== userId.toString()){
        throw new apiError(404, "Only owner can delete the blog.")
    }
    
    // delete the blog
    await Blog.findByIdAndDelete(blogId)

    return res.status(200).json(
        new apiResponse(200, {}, "Blog was deleted successfully.")
    )

})

export {createPost, getAllPosts, getPostById, likePost, updatePost, deletePost}