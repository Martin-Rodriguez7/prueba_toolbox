const parse = require('csv-parse/lib/sync')
const { CsvLineValidator, FileLineValidationStrategy } = require('../strategies/validationStrategy')

const validator = new CsvLineValidator(new FileLineValidationStrategy())

const parseAndValidateCsv = (rawCsv) => {
  if (!rawCsv || typeof rawCsv !== 'string' || rawCsv.trim().length === 0) {
    return []
  }

  try {
    const records = parse(rawCsv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true
    })

    // filtramos solo lo que sirve y mapeamos al formato final
    return records
      .filter(record => validator.isValid(record))
      .map(record => ({
        text: record.text,
        number: Number(record.number),
        hex: record.hex
      }))
  } catch (error) {
    // si el csv esta roto directamente devolvemos vacio
    return []
  }
}

module.exports = {
  parseAndValidateCsv
}
