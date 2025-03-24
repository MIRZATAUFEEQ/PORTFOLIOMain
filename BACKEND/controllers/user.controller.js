import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { generateToken } from '../utils/generateToken.js'
import { v2 as cloudinary } from 'cloudinary'
import { sendEmail } from '../utils/sendEmail.js'
import crypto from 'crypto'

export const register = asyncHandler(async (req, res) => {
    const { fullName, email, phone, aboutMe, password, githubUrl, instagramUrl, linkdinUrl } = req.body
    if (!fullName || !email || !phone || !aboutMe || !password) {
        throw new ApiError(400, 'fields are required')
    }
    const exitedUser = await User.findOne({ email })
    if (exitedUser) {
        throw new ApiError(409, 'email is already exist')
    }

    let avatarLocalPath, avatarOriginalname, resumeLocalPath, resumeOriginalname;
    if (req.files?.avatar) {
        avatarLocalPath = req.files.avatar.tempFilePath;
        avatarOriginalname = req.files.avatar.name
    }
    if (req.files?.resume) {
        resumeLocalPath = req.files.resume.tempFilePath;
        resumeOriginalname = req.files.resume.name
    }

    if (!avatarLocalPath || !resumeLocalPath) {
        throw new ApiError(400, 'Avatar and resume files are required');
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath, avatarOriginalname)
    const resume = await uploadOnCloudinary(resumeLocalPath, resumeOriginalname)
    if (!avatar?.secure_url || !resume?.secure_url) {
        throw new ApiError(400, 'failed to upload avatar and resume')
    }

    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        aboutMe,
        githubUrl,
        instagramUrl,
        linkdinUrl,
        avatar: {
            public_id: avatar?.public_id,
            url: avatar?.secure_url
        },
        resume: {
            public_id: resume?.public_id,
            url: resume?.secure_url
        }
    })

    const createdUser = await User.findById(user._id).select("-password")
    if (!createdUser) {
        throw new ApiError(500, 'something went wrong while registering the user')
    }
    generateToken(createdUser, 'user created', 200, res)
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, 'all field required')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new ApiError(404, 'user does not exist')
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid user credintial')
    }
    generateToken(user, 'Logged in successfully', 200, res)
})

export const logout = asyncHandler(async (req, res) => {
    res.status(200)
        .cookie('token', '', {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .json({
            success: true,
            message: 'Loged Out successfully'
        })
})

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200)
        .json({
            success: true,
            message: "user profile",
            user
        })
})

export const updateProfile = asyncHandler(async (req, res) => {
    const newData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        githubUrl: req.body.githubUrl,
        instagramUrl: req.body.instagramUrl,
        linkdinUrl: req.body.linkdinUrl,
    }

    let avatarLocalPath, avatarOriginalname, resumeLocalPath, resumeOriginalname;
    const user = await User.findById(req.user.id)
    if (req.files && req.files?.avatar) {
        avatarLocalPath = req.files.avatar.tempFilePath;
        avatarOriginalname = req.files.avatar.name
        if (user.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id)
        }
        const newAvatar = await uploadOnCloudinary(avatarLocalPath, avatarOriginalname)
        if (!newAvatar?.secure_url) {
            throw new ApiError(400, "new Avatar not found")
        }
        newData.avatar = {
            public_id: newAvatar.public_id,
            url: newAvatar.secure_url
        }
    }
    if (req.files && req.files?.resmue) {
        resumeLocalPath = req.files.resume.tempFilePath;
        resumeOriginalname = req.files.resume.name
        if (user.resume?.public_id) {
            await cloudinary.uploader.destroy(user.resume.public_id)
        }
        const newResume = await uploadOnCloudinary(resumeLocalPath, resumeOriginalname)
        if (!newResume?.secure_url) {
            throw new ApiError(400, 'new resume not found')
        }
        newData.resume = {
            public_id: newResume.public_id,
            url: newResume.secure_url
        }
    }
    const updateUser = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200)
        .json({
            success: true,
            message: 'profile successfully updated',
            updateUser
        })
})

export const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new ApiError(400, 'password not found')
    }
    const user = await User.findById(req.user.id).select("+password")
    if (!user) {
        throw new ApiError(400, 'user not found')
    }
    const isPasswordMatch = await user.isPasswordCorrect(currentPassword)
    if (!isPasswordMatch) {
        throw new ApiError(404, 'current password not matched')
    }
    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, 'new password and confirm new password should be same')
    }
    user.password = newPassword
    await user.save()
    res.status(200)
        .json({
            success: true,
            message: 'password successfully updated'
        })
})

export const getuserForPortfolio = asyncHandler(async (req, res) => {
    const id = "67dfe437ba402fe0f071abb4"
    const user = await User.findById(id)
    res.status(200)
        .json({
            success: true,
            message: 'profile successfully get for portfolio',
            user
        })
})

export const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        throw new ApiError(400, 'user not found!')
    }
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`
    const message = `your reset password token is:- \n\n ${resetPasswordUrl} \n\n if you've not request for this please ignore it`
    try {
        await sendEmail({
            email: user.email,
            subject: 'portfolio dashboard password recovery',
            message
        })
        res.status(200)
            .json({
                success: true,
                message: `Email sent to ${user.email} successfully`
            })
    } catch (error) {
        user.resetPasswordTokenExpire = undefined,
            user.resetPasswordToken = undefined,
            await user.save()
        throw new ApiError(500, error.message)
    }
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params
    const resetPasswordToken = crypto.createHash('sha256')
        .update(token)
        .digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    })
    if (!user) {
        throw new ApiError(400, "reset password token is invalid or has been expired")
    }
    if (req.body.password !== req.body.confirmPassword) {
        throw new ApiError(400, 'password and confirm password do not match')
    }
    user.password = req.body.password,
        user.resetPasswordToken = undefined,
        user.resetPasswordTokenExpire = undefined
    await user.save()
    generateToken(user, 'password reset successfully', 200, res)
})