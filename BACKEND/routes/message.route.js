import { deleteMessage, getAllMessage, sendMessage } from '../controllers/message.controller.js'
import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.route('/send').post(sendMessage)
router.route('/getAll').get(getAllMessage)
router.route('/delete/:id').delete(isAuthenticated, deleteMessage)

export default router