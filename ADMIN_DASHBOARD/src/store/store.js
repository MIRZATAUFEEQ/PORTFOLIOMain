import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import forgotrestpassReducer from './slices/forgotresetPasswordSlice.js'
import messageReducer from './slices/messageSlice.js'
import timelineReducer from './slices/timelineSlice.js'
import projectReducer from './slices/projectSlice.js'
import skillReducer from './slices/skillSlice.js'
export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotpassword: forgotrestpassReducer,
        messages: messageReducer,
        timeline: timelineReducer,
        project: projectReducer,
        skill: skillReducer
    }
})