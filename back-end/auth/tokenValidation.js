const { verify } = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const Admin = require('../api/admin/admin.model')

const checkToken = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = verify(token, process.env.JWT_SECRET)

            req.admin = await Admin.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized & No Token')
    }

    // const token = req.get('authorization')

    // if (!token) {
    //     return res.status(401).json({
    //         success: 0,
    //         message: 'Access denied, no token provided'
    //     })
    // } else {
    //     let decoded = token.slice(7)
    //     verify(decoded, process.env.JWT_SECRET, (err, decoded) => {
    //         if (err) {
    //             return res.status(401).json({
    //                 success: 0,
    //                 message: 'Invalid token'
    //             })
    //         } else {
    //             let user = await decoded.result
    //             next()
    //         }
    //     })
    // }
})

module.exports = { checkToken }