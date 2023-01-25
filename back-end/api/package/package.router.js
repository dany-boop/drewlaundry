const { checkToken } = require('../../auth/tokenValidation')
const { getPackage, getPackageById, postPackage, putPackage, deletePackage } = require('./package.controller')

const router = require('express').Router()

router.get('/', checkToken, getPackage)
router.post('/', checkToken, postPackage)
router.get('/:id', checkToken, getPackageById)
router.put('/:id', checkToken, putPackage)
router.delete('/:id', checkToken, deletePackage)

module.exports = router