import { Timeline } from "../models/timeline.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postTimeline = asyncHandler(async (req, res) => {
    const { title, description, from, to } = req.body
    const addTimeline = await Timeline.create({
        title, description, timeline: { from, to }
    })
    if (!addTimeline) {
        throw new ApiError(400, 'time line are required')
    }
    res.status(200)
        .json({
            success: true,
            message: 'timeline created successfully',
            addTimeline
        })
})

export const getAllTimeline = asyncHandler(async (req, res) => {
    const allTimeline = await Timeline.find()
    res.status(200)
        .json({
            success: true,
            message: 'all timeline fetched successfully',
            allTimeline
        })
})

export const deleteTimeline = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteTimeline = await Timeline.findById(id)
    if (!deleteTimeline) {
        throw new ApiError(400, "timeline not found")
    }
    await deleteTimeline.deleteOne()
    res.status(200)
        .json({
            success: true,
            message: 'timeline deleted successfully'
        })
})