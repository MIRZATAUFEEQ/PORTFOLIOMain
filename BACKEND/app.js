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
import path from 'path';
import { fileURLToPath } from 'url'
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))


// React ke saare routes ko handle karein

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

const adminFolder = "ADMIN_DASHBOARD"; 
const portfolioFolder = "PORTFOLIO";
const adminPath = path.join(__dirname, adminFolder, "dist");
const portfolioPath = path.join(__dirname, portfolioFolder, "dist");
// Admin Panel Serve
app.use("/admin", express.static(adminPath));
// Portfolio Serve
app.use("/", express.static(portfolioPath));

// Admin Panel Routes
app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(adminPath, "index.html"), (err) => {
        if (err) {
            console.error("Error serving admin panel index.html:", err);
            res.status(500).send("Internal Server Error");
        }
    });
});

// Portfolio Routes
app.get("*", (req, res) => {
    res.sendFile(path.join(portfolioPath, "index.html"), (err) => {
        if (err) {
            console.error("Error serving portfolio index.html:", err);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.use(errorMiddleware)
export { app }