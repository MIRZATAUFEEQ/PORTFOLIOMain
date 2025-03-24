import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Skill } from '../models/skill.model.js'
import { v2 as cloudinary } from 'cloudinary'
import {mongoose} from 'mongoose'

export const addSkill = asyncHandler(async (req, res) => {
    const { title, proficiency } = req.body;
    if (!title || !proficiency) {
        throw new ApiError(400, 'title and proficiency is required')
    }
    let svgLocalPath, svgOriginalName;
    if (req.files && req.files?.svg) {
        svgLocalPath = req.files.svg.tempFilePath;
        svgOriginalName = req.files.svg.name;
    }
    if (!svgLocalPath) {
        throw new ApiError(400, 'svg not found')
    }
    const svg = await uploadOnCloudinary(svgLocalPath, svgOriginalName)
    if (!svg) {
        throw new ApiError(400, 'svg not found')
    }
    const addSkill = await Skill.create({
        title,
        proficiency,
        svg: {
            public_id: svg?.public_id,
            url: svg?.secure_url
        },
    })
    res.status(200)
        .json({
            success: true,
            message: 'skill added successfully',
            addSkill
        })

})

export const deleteSkill = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid skill ID");
    }
    const skill = await Skill.findById(id)
    if (!skill) {
        throw new ApiError(400, 'skill not found')
    }
    await cloudinary.uploader.destroy(skill.svg.public_id)
    await skill.deleteOne()
    res.status(200)
        .json({
            success: true,
            message: 'skill deleted'
        })

})
export const updateSkill = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid skill ID");
    }
    let updateskilldata = await Skill.findById(id)
    if (!updateskilldata) {
        throw new ApiError(400, 'skill not found')
    }
    const { proficiency } = req.body
    updateskilldata = await Skill.findByIdAndUpdate(id, { proficiency }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200)
        .json({
            success: true,
            message: 'skill successfully updated',
            updateskilldata
        })
})
export const getAllSkill = asyncHandler(async (req, res) => {
    const getAll = await Skill.find()
    if (!getAll) {
        throw new ApiError(400, 'skills not found')
    }
    res.status(200)
        .json({
            success: true,
            message: 'fetched all skills',
            getAll
        })

})