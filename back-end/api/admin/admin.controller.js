const asyncHandler = require('express-async-handler')
const { genSalt, hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('./admin.model')

// @description     GET All Admin Data
// @routes          GET /api/admin/
// @access          Public
const getAdmin = asyncHandler(async (req, res) => {
    const admins = await Admin.find()

    res.status(200).json({
        success: 1,
        message: 'Member found',
        data: admins
    })
})

// @description     GET Admin Data By Id
// @routes          GET /api/admin/:id
// @access          Public
const getAdminById = asyncHandler(async (req, res) => {
    const adminById = await Admin.findById(req.params.id)

    if (!adminById) {
        return res.status(404).json({
            success: 0,
            message: 'Admin not found'
        })
    }

    res.status(200).json({
        success: 1,
        message: 'Member found',
        data: adminById
    })
})

// @description     POST Admin Data
// @routes          POST /api/admin/
// @access          Public
const postAdmin = asyncHandler(async (req, res) => {
    data_admin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !data_admin) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    }

    const adminExist = await Admin.findOne({ email: data_admin.email })
    if (adminExist) {
        return res.status(400).json({
            success: 0,
            message: 'Admin already exist'
        })
    }

    const salt = await genSalt(10)
    data_admin.password = hashSync(data_admin.password, salt)

    const admin = await Admin.create(data_admin)

    res.status(201).json({
        success: 1,
        message: 'Admin created successfully',
        data: admin
    })
})

// @description     PUT Admin Data
// @routes          PUT /api/admin/:id
// @access          Public
const updateAdmin = asyncHandler(async (req, res) => {
    data_admin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    const checkAdminIfExist = await Admin.findById(req.params.id)

    if (!req.body.name || !req.body.email || !req.body.role) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    } else if (!checkAdminIfExist) {
        return res.status(404).json({
            success: 0,
            message: 'Admin not found'
        })
    }

    const salt = await genSalt(10)
    data_admin.password = hashSync(data_admin.password, salt)

    const admin = await Admin.findByIdAndUpdate(req.params.id, data_admin, { new: true, runValidators: true })

    res.status(200).json({
        success: 1,
        message: 'Admin updated successfully',
        data: admin
    })
})

// @description     DELETE Admin Data
// @routes          DELETE /api/admin/:id
// @access          Public
const deleteAdmin = asyncHandler(async (req, res) => {
    const delAdmin = await Admin.findById(req.params.id)

    if (!delAdmin) {
        return res.status(404).json({
            success: 0,
            message: 'Admin not found'
        })
    }

    await delAdmin.remove()

    res.status(200).json({
        success: 1,
        _id: req.params.id,
        message: "Admin has been deleted"
    })
})

// @description     Authenticate Admin
// @routes          DELETE /api/admin/login
// @access          Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (admin && (await compareSync(password, admin.password))) {
        res.json({
            _id: admin._id,
            message: 'Login Successful',
            user: admin,
            token: generateToken(admin)
        })
    } else {
        res.status(400).json({
            success: 0,
            message: 'Invalid credentials'
        })
        throw new Error('Invalid credentials')
    }
})

const generateToken = (admin) => {
    return jwt.sign({ admin }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    getAdmin,
    getAdminById,
    postAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin
}