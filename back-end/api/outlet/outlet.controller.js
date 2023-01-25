const asyncHandler = require('express-async-handler')

const Outlet = require('./outlet.model')

// @description     GET All Outlet Data
// @routes          GET /api/outlet/
// @access          Private
const getOutlet = asyncHandler(async (req, res) => {
    const outlets = await Outlet.find()

    res.status(200).json({
        success: 1,
        message: 'Outlet found',
        data: outlets
    })
})

// @description     GET Outlet Data By Id
// @routes          GET /api/outlet/:id
// @access          Private
const getOutletById = asyncHandler(async (req, res) => {
    const outletById = await Outlet.findById(req.params.id)

    if (!outletById) {
        return res.status(404).json({
            success: 0,
            message: 'Outlet not found'
        })
    }

    res.status(200).json({
        success: 1,
        message: 'Outlet found',
        data: outletById
    })
})

// @description     POST Outlet Data
// @routes          POST /api/outlet/
// @access          Private
const postOutlet = asyncHandler(async (req, res) => {
    data_outlet = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    }

    if (!req.body.name || !req.body.address || !req.body.phone) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    }

    const outletExist = await Outlet.findOne({ phone: data_outlet.phone })
    if (outletExist) {
        return res.status(400).json({
            success: 0,
            message: 'Outlet already exist'
        })
    }

    const outlet = await Outlet.create(data_outlet)

    res.status(201).json({
        success: 1,
        message: 'Outlet created successfully',
        data: outlet
    })
})

// @description     PUT Outlet Data
// @routes          PUT /api/outlet/:id
// @access          Private
const putOutlet = asyncHandler(async (req, res) => {
    data_outlet = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    }

    const checkIfOutletExist = await Outlet.findById(req.params.id)

    if (!req.body.name || !req.body.address || !req.body.phone) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    } else if (!checkIfOutletExist) {
        return res.status(404).json({
            success: 0,
            message: 'Outlet not found'
        })
    }

    const outlet = await Outlet.findByIdAndUpdate(req.params.id, data_outlet, { new: true, runValidators: true })

    res.status(200).json({
        success: 1,
        message: 'Outlet updated successfully',
        data: outlet
    })
})

// @description     DELETE Outlet Data
// @routes          GET /api/outlet/
// @access          Private
const deleteOutlet = asyncHandler(async (req, res) => {
    const delOutlet = await Outlet.findById(req.params.id)

    if (!delOutlet) {
        return res.status(404).json({
            success: 0,
            message: 'Outlet not found'
        })
    }

    await delOutlet.remove()

    res.status(200).json({
        success: 1,
        _id: req.params.id,
        message: 'Outlet deleted successfully',
    })
})

module.exports = {
    getOutlet,
    getOutletById,
    postOutlet,
    putOutlet,
    deleteOutlet
}