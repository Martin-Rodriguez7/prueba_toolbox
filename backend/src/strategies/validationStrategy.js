class FileLineValidationStrategy {
  validate (data) {
    if (!data || typeof data !== 'object') return false

    const { file, text, number, hex } = data

    if (!file || !text || !number || !hex) return false

    if (isNaN(Number(number))) return false

    const hexRegex = /^[a-fA-F0-9]{32}$/
    if (!hexRegex.test(hex)) return false

    return true
  }
}

class CsvLineValidator {
  constructor (strategy) {
    this.strategy = strategy
  }

  isValid (line) {
    return this.strategy.validate(line)
  }
}

module.exports = {
  FileLineValidationStrategy,
  CsvLineValidator
}
