import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { Message } from '../models/message.model.js'

export const sendMessage = asyncHandler(async (req, res) => {
    const { senderName, subject, message } = req.body
    if (!senderName || !subject || !message) {
        throw new ApiError(400, 'All fields are required');
    }
    const data = await Message.create({ senderName, subject, message })

    res.status(200)
        .json({
            success: true,
            message: 'successfully created',
            data
        })
})

export const getAllMessage = asyncHandler(async (req, res) => {
    const allMessages = await Message.find()
    res.status(200)
        .json({
            success: true,
            message: 'get all message successfully',
            allMessages
        })
})

export const deleteMessage=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const message=await Message.findById(id)
    if (!message) {
        throw new ApiError(400,'message not found')
    }
    await message.deleteOne()
    res.status(200)
    .json({
        success:true,
        message:'message successfully deleted'
    })
})