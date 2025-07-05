const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    // Bearer token
    // headers: { authorization: Bearer token}
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) return res.status(401).json({
                success: false,
                mes: 'Invalid access token'
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!!!'
        })
    }
})

const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req.user
    if (+role !== 1945)
        return res.status(401).json({
            success: false,
            mes: ' REQUIRE ADMIN ROLE'
        })
    next()
})

const isNotBlocked = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const user = await User.findById(_id)
    if (user && user.isBlocked) {
        return res.status(403).json({
            success: false,
            mes: 'Your account has been blocked. Please contact administrator.'
        })
    }
    next()
})

module.exports = {
    verifyAccessToken,
    isAdmin,
    isNotBlocked
}