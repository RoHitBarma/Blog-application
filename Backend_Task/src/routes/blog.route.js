import { Router } from "express";
import { createPost, getAllPosts, getPostById, likePost, updatePost, deletePost } from "../controllers/blog.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const blogRouter = Router()

blogRouter.route("/").post(authMiddleware, createPost)

blogRouter.route("/").get(getAllPosts)

blogRouter.route("/:id").get(getPostById)

blogRouter.put("/like/:id",authMiddleware, likePost)

blogRouter.put("/update/:id", authMiddleware, updatePost)

blogRouter.delete("/delete/:id", authMiddleware, deletePost)

export default blogRouter