/* eslint-env mocha */
const { expect } = require('chai')
const { parseAndValidateCsv } = require('../src/utils/csvHelper')

describe('csvHelper - parseAndValidateCsv', () => {
  it('debería retornar un array vacío si el input no es un string', () => {
    expect(parseAndValidateCsv(null)).to.have.lengthOf(0)
    expect(parseAndValidateCsv(undefined)).to.have.lengthOf(0)
    expect(parseAndValidateCsv(123)).to.have.lengthOf(0)
  })

  it('debería retornar un array vacío si el string está vacío o solo tiene espacios', () => {
    expect(parseAndValidateCsv('')).to.have.lengthOf(0)
    expect(parseAndValidateCsv('   ')).to.have.lengthOf(0)
  })

  it('debería procesar correctamente un CSV válido y formatear los números', () => {
    const csv = 'file,text,number,hex\ntest.csv,hola,123,70ad29aacf0b690b0467fe2b2767f765'
    const result = parseAndValidateCsv(csv)

    expect(result).to.have.lengthOf(1)
    expect(result[0]).to.deep.equal({
      text: 'hola',
      number: 123,
      hex: '70ad29aacf0b690b0467fe2b2767f765'
    })
    expect(result[0].number).to.be.a('number') // chequeamos que parseo bien a numero
  })

  it('debería descartar líneas que no cumplen con la validación (ej: hex corto)', () => {
    const csv = 'file,text,number,hex\n' +
      'valido.csv,si,1,70ad29aacf0b690b0467fe2b2767f765\n' +
      'invalido.csv,no,2,abc\n' + // hex muy corto
      'invalido.csv,no,letras,70ad29aacf0b690b0467fe2b2767f765' // number con letras

    const result = parseAndValidateCsv(csv)
    expect(result).to.have.lengthOf(1)
    expect(result[0].text).to.equal('si')
  })

  it('debería retornar un array vacío si el CSV está malformado (corrupto)', () => {
    const csv = 'file,text,number,hex\n"línea con comillas sin cerrar'
    const result = parseAndValidateCsv(csv)
    expect(result).to.have.lengthOf(0)
  })
})
