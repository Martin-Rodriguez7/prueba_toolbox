const express = require('express')
const router = express.Router()
const FilesController = require('../controllers/filesController')

router.get('/data', FilesController.getFilesData)
router.get('/list', FilesController.getFilesList)

module.exports = router
