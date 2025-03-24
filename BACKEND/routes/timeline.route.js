import { postTimeline, getAllTimeline, deleteTimeline } from '../controllers/timeline.controller.js'
import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.route('/add').post(isAuthenticated, postTimeline)
router.route('/getAll').get(getAllTimeline)
router.route('/delete/:id').delete(isAuthenticated, deleteTimeline)

export default router