const apiClient = require('../clients/apiClient')
const { parseAndValidateCsv } = require('../utils/csvHelper')

class FilesService {
  static async getFileList () {
    try {
      const response = await apiClient.get('/v1/secret/files')
      return response.data.files || []
    } catch (error) {
      // si falla la lista devolvemos vacio para que no rompa todo el flujo
      console.error('falla al traer la lista:', error.message)
      return []
    }
  }

  static async getFileContent (fileName) {
    try {
      const { data } = await apiClient.get(`/v1/secret/file/${fileName}`, {
        responseType: 'text'
      })
      return data
    } catch (error) {
      console.error(`error bajando ${fileName}:`, error.message)
      return null
    }
  }

  static async processFile (fileName) {
    const content = await this.getFileContent(fileName)
    if (!content) return null

    const lines = parseAndValidateCsv(content)
    if (lines.length === 0) return null

    return { file: fileName, lines }
  }

  static async getFormattedData (fileNameQuery) {
    // si viene un file por query procesamos solo ese, sino todos
    const files = fileNameQuery ? [fileNameQuery] : await this.getFileList()

    const promises = files.map(file => this.processFile(file))
    const results = await Promise.all(promises)

    // limpiamos los nulos de archivos fallidos o vacios
    return results.filter(file => file !== null)
  }
}

module.exports = FilesService
