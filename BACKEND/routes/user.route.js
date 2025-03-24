import {
    forgotPassword, getUser,
    getuserForPortfolio, login, logout,
    register, resetPassword, updatePassword, updateProfile
} from '../controllers/user.controller.js'
import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(isAuthenticated, logout)
router.route('/profile').get(isAuthenticated, getUser)
router.route('/update/profile').put(isAuthenticated, updateProfile)
router.route('/update/password').put(isAuthenticated, updatePassword)
router.route('/portfolioProfile').get(getuserForPortfolio)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

export default router