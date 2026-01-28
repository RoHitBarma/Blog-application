import { v2 as cloudinary } from 'cloudinary'
import {apiError} from "../utils/apiError.js"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: "rohitcode",
    api_key: "597779717835344",
    api_secret: "y4P-qwvua-Ap-Q0hxaRV3g5kSfI"
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("🔵 Cloudinary upload starting...");

        if(!localFilePath){
            console.log("Locan path is missing.");
            return null;
        }
    
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log("File uploaded successfully on cloudinary.", response.url);
        fs.unlinkSync(localFilePath)
        console.log("local file deleted successfully.")
        console.log("Response: ", response);
        return response;
    } catch (error) {
        console.log("🔴 CLOUDINARY ERROR DETAILS:");
        console.log("Error:", error);
        console.log("Error Message:", error.message);
        console.log("HTTP Code:", error.http_code);
        // fs.unlink(localFilePath)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
            console.log("Local file deleted after error");
        }
        return null;
    }
}

const deleteFromCloudinary = async (publicFile) => {
    try {
        if(!publicFile){
            console.log("Locan path is missing.");
        }
    
        const response = await cloudinary.uploader.destroy(publicFile, {
            resource_type: "auto"
        })
    
        console.log("File deleted successfully from cloudinary.", response.url)
        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw new apiError(500, "Failed to delete file from Cloudinary");
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}

