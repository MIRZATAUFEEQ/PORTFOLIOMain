import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: [true, "Sender name is required"],
        minLength: [2, 'Name must contain at least 2 character']
    },
    subject: {
        type: String,
        required: [true, "subject is required"],
        minLength: [2, 'subject must contain at least 2 character']
    },
    message: {
        type: String,
        required: [true, "message is required"],
        minLength: [5, 'message must contain at least 2 character']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true })

export const Message = mongoose.model('Message', messageSchema)