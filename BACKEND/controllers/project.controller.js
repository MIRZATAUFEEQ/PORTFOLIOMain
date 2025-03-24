import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose'

export const addProject = asyncHandler(async (req, res) => {
    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body;
    if (!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed) {
        throw new ApiError(400, 'All fields are required')
    }
    let projectBannerLocalpath, projectBannerOriginalname;
    if (req.files && req.files?.projectBanner) {
        projectBannerLocalpath = req.files.projectBanner.tempFilePath
        projectBannerOriginalname = req.files.projectBanner.name
    }
    if (!projectBannerLocalpath) {
        throw new ApiError(400, 'project Banner is required')
    }
    const projectBanner = await uploadOnCloudinary(projectBannerLocalpath, projectBannerOriginalname)
    if (!projectBanner) {
        throw new ApiError(400, 'project Banner not found')
    }
    const addproject = await Project.create({
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: projectBanner.public_id,
            url: projectBanner.secure_url
        }
    })
    res.status(200)
        .json({
            success: true,
            message: 'project added',
            addproject
        })

})
export const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid project ID");
    }
    let project = await Project.findById(id)
    if (!project) {
        throw new ApiError(400, 'project not found')
    }
    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body
    project = await Project.findByIdAndUpdate(id, {
        title, description,
        gitRepoLink, projectLink,
        technologies, stack,
        deployed
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200)
        .json({
            success: true,
            message: 'project successfully updated',
            project
        })
})
export const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid project ID");
    }
    const project = await Project.findById(id)
    if (!project) {
        throw new ApiError(400, 'project not found')
    }
    await cloudinary.uploader.destroy(project.projectBanner.public_id)
    await project.deleteOne()
    res.status(200)
        .json({
            success: true,
            message: 'project deleted'
        })
})
export const getAllProject = asyncHandler(async (req, res) => {
    const project = await Project.find()
    if (!project) {
        throw new ApiError(400, 'skills not found')
    }
    res.status(200)
        .json({
            success: true,
            message: 'fetched all skills',
            project
        })
})

export const getSingleProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid project ID");
    }
    const project = await Project.findById(id)
    if (!project) {
        throw new ApiError(404, 'project not found')
    }
    res.status(200)
        .json({
            success: true,
            message: 'fetched project',
            project
        })
})