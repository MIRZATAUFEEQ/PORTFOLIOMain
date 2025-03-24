import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadOnCloudinary = async (localFilePath, originalName = '') => {
    try {
        if (!localFilePath) {
            return null
        }
        const ext = path.extname(originalName  || localFilePath).toLowerCase();

        // ✅ Debug: Check the extracted extension

        // ✅ Determine folder based on file extension
        let folder = "misc"; // Default folder

        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            folder = 'avatar';
        } else if (['.pdf', '.docx'].includes(ext)) {
            folder = 'resume';
        }

        // ✅ Debug: Check the selected folder

        const response = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: 'auto'
        })
        return response

    } catch (error) {
        console.error(error)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }//remove the locally save temparory file as the upload operation got failed 
        return null
    }
}

