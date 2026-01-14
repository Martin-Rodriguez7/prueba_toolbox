const FilesService = require('../services/filesService')

class FilesController {
  static async getFilesData (req, res) {
    try {
      const fileName = req.query.fileName
      const data = await FilesService.getFormattedData(fileName)
      res.status(200).json(data)
    } catch (error) {
      console.error('Controller Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async getFilesList (req, res) {
    try {
      const list = await FilesService.getFileList()
      res.status(200).json({ files: list })
    } catch (error) {
      console.error('Controller Error:', error)
      res.status(500).json({ error: 'Failed to retrieve file list' })
    }
  }
}

module.exports = FilesController
