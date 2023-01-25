const asyncHandler = require('express-async-handler')

const Member = require('./member.model')

// @description     GET All Member Data
// @routes          GET /api/member/
// @access          Private
const getMember = asyncHandler(async (req, res) => {
    const members = await Member.find()

    res.status(200).json({
        success: 1,
        message: 'Member found',
        data: members
    })
})

// @description     GET Member Data By Id
// @routes          GET /api/member/:id
// @access          Private
const getMemberById = asyncHandler(async (req, res) => {
    const memberById = await Member.findById(req.params.id)

    if (!memberById) {
        return res.status(404).json({
            success: 0,
            message: 'Member not found'
        })
    }

    res.status(200).json({
        success: 1,
        message: 'Member found',
        data: memberById
    })
})

// @description     POST Member Data
// @routes          GET /api/member/
// @access          Private
const postMember = asyncHandler(async (req, res) => {
    data_member = {
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        phone: req.body.phone
    }

    if (!req.body.name || !req.body.address || !req.body.gender || !req.body.phone) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    }

    const memberExist = await Member.findOne({ phone: data_member.phone })
    if (memberExist) {
        return res.status(400).json({
            success: 0,
            message: 'Member already exist'
        })
    }

    const member = await Member.create(data_member)

    res.status(201).json({
        success: 1,
        message: 'Member created successfully',
        data: member
    })
})

// @description     PUT Member Data
// @routes          PUT /api/admin/:id
// @access          Private
const putMember = asyncHandler(async (req, res) => {
    data_member = {
        address: req.body.address,
        phone: req.body.phone
    }

    const checkIfMemberExist = await Member.findById(req.params.id)

    if (!req.body.address || !req.body.phone) {
        return res.status(400).json({
            success: 0,
            message: 'Please provide all required fields'
        })
    } else if (!checkIfMemberExist) {
        return res.status(404).json({
            success: 0,
            message: 'Member not found'
        })
    }

    const member = await Member.findByIdAndUpdate(req.params.id, data_member, { new: true, runValidators: true })

    res.status(200).json({
        success: 1,
        message: 'Member updated successfully',
        data: member
    })
})

// @description     DELETE Member Data
// @routes          DELETE /api/member/
// @access          Private
const deleteMember = asyncHandler(async (req, res) => {
    const delMember = await Member.findById(req.params.id)

    if (!delMember) {
        return res.status(404).json({
            success: 0,
            message: 'Member not found'
        })
    }

    await delMember.remove()

    res.status(200).json({
        success: 1,
        _id: req.params.id,
        message: 'Member deleted successfully'
    })
})

module.exports = {
    getMember,
    getMemberById,
    postMember,
    putMember,
    deleteMember
}