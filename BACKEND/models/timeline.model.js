import mongoose from 'mongoose'

const timelineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    timeline: {
        from: {
            type: String,
            required: [true, 'starting date are required']
        },
        to: String
    },
}, { timestamps: true })

export const Timeline = mongoose.model('Timeline', timelineSchema)