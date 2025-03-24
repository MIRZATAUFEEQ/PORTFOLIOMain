import { addProject, updateProject, deleteProject, getAllProject, getSingleProject } from '../controllers/project.controller.js'
import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.route('/add').post(isAuthenticated, addProject)
router.route('/getAll').get(getAllProject)
router.route('/delete/:id').delete(isAuthenticated, deleteProject)
router.route('/update/:id').put(isAuthenticated, updateProject)
router.route('/getsingle/:id').get(getSingleProject)

export default router