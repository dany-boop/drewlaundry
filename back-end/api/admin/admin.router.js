const { checkToken } = require('../../auth/tokenValidation')
const { getAdmin, getAdminById, postAdmin, updateAdmin, deleteAdmin, loginAdmin } = require('./admin.controller')

const router = require('express').Router()

router.get('/', checkToken, getAdmin)
router.post('/', postAdmin)
router.post('/login', loginAdmin)
router.get('/:id', checkToken, getAdminById)
router.put('/:id', checkToken, updateAdmin)
router.delete('/:id', checkToken, deleteAdmin)

module.exports = router