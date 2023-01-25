const { checkToken } = require('../../auth/tokenValidation')
const { getMember, getMemberById, postMember, putMember, deleteMember } = require('./member.controller')

const router = require('express').Router()

router.get('/', checkToken, getMember)
router.post('/', checkToken, postMember)
router.get('/:id', checkToken, getMemberById)
router.put('/:id', checkToken, putMember)
router.delete('/:id', checkToken, deleteMember)

module.exports = router