const asyncHandler = require('express-async-handler')

const Package = require('./package.model')

// @description     GET All Package Data
// @routes          GET /api/package/
// @access          Private
const getPackage = asyncHandler(async (req, res) => {
    const packages = await Package.find()

    res.status(200).json({
        success: 1,
        message: 'Package found',
        data: packages
    })
})

// @description     GET Package Data By Id
// @routes          GET /api/package/:id
// @access          Private
const getPackageById = asyncHandler(async (req, res) => {
    const packageById = await Package.findById(req.params.id)

    if (!packageById) {
        return res.status(404).json({
            success: 0,
            message: 'Package not found'
        })
    }

    res.status(200).json({
        success: 1,
        message: 'Package found',
        data: packageById
    })
})

// @description     POST Package Data
// @routes          POST /api/package/
// @access          Private
const postPackage = asyncHandler(async (req, res) => {
    data_package = {
        name: req.body.name,
        price: req.body.price
    }

    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    }

    const packageExist = await Package.findOne({ name: data_package.name })
    if (packageExist) {
        return res.status(400).json({
            success: 0,
            message: 'Package already exist'
        })
    }

    const package = await Package.create(data_package)

    res.status(201).json({
        success: 1,
        message: 'Package created successfully',
        data: package
    })
})

// @description     PUT Package Data
// @routes          PUT /api/package/:id
// @access          Private
const putPackage = asyncHandler(async (req, res) => {
    data_package = {
        name: req.body.name,
        price: req.body.price
    }

    const checkIfPackageExist = await Package.findById(req.params.id)

    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    } else if (!checkIfPackageExist) {
        return res.status(404).json({
            success: 0,
            message: 'Package not found'
        })
    }

    const package = await Package.findByIdAndUpdate(req.params.id, data_package, { new: true, runValidators: true })

    res.status(200).json({
        success: 1,
        message: 'Package updated successfully',
        data: package
    })
})

// @description     DELETE Package Data
// @routes          DELETE /api/package/:id
// @access          Private
const deletePackage = asyncHandler(async (req, res) => {
    const delPackage = await Package.findById(req.params.id)

    if (!delPackage) {
        return res.status(404).json({
            success: 0,
            message: 'Package not found'
        })
    }

    await delPackage.remove()

    res.status(200).json({
        success: 1,
        _id: req.params.id,
        message: 'Package deleted successfully'
    })
})

module.exports = {
    getPackage,
    getPackageById,
    postPackage,
    putPackage,
    deletePackage
}