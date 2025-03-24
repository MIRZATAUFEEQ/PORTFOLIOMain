import dotenv from 'dotenv'
dotenv.config({
    path: './config/.env'
})
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { errorMiddleware } from './middlewares/errorHandler.middleware.js'
import messageRoute from './routes/message.route.js'
import userRoute from './routes/user.route.js'
import timelineRoute from './routes/timeline.route.js'
import skillRoute from './routes/skill.route.js'
import projectRoute from './routes/project.route.js'
const app = express()
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/'
}))

app.use('/api/v1/message', messageRoute)
app.use('/api/v1/auth', userRoute)
app.use('/api/v1/timeline', timelineRoute)
app.use('/api/v1/skill', skillRoute)
app.use('/api/v1/project', projectRoute)

app.use(errorMiddleware)
export { app }