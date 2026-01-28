import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publishDate: {
            type: Date,
            required: true
        },
        userReference: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        like: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {timestamps: true}
)

export const Blog = mongoose.model("Blog", blogSchema)
