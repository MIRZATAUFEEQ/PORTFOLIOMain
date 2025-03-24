import { addSkill, deleteSkill, updateSkill, getAllSkill } from '../controllers/skill.controller.js'
import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.route('/add').post(isAuthenticated, addSkill)
router.route('/getAll').get(getAllSkill)
router.route('/delete/:id').delete(isAuthenticated, deleteSkill)
router.route('/update/:id').put(isAuthenticated, updateSkill)

export default router