/* eslint-env mocha */
const request = require('supertest')
const app = require('../index')
const FilesService = require('../src/services/filesService')
const { expect } = require('chai')

describe('Rutas de la API', () => {
  before(() => {
    FilesService.getFileList = async () => ['test1.csv', 'test2.csv']
    FilesService.getFileContent = async (fileName) => {
      if (fileName === 'test1.csv') {
        return 'file,text,number,hex\ntest1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
      }
      if (fileName === 'test2.csv') {
        return 'file,text,number,hex\ntest2.csv,Czw,invalid_number,70ad29aacf0b690b0467'
      }
      return null
    }
  })

  describe('GET /files/data', () => {
    it('debe retornar un array de archivos formateados', (done) => {
      request(app)
        .get('/files/data')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.greaterThan(0)

          const file1 = res.body.find(f => f.file === 'test1.csv')
          expect(file1).to.not.equal(undefined)
          expect(file1.lines).to.have.lengthOf(1)
          expect(file1.lines[0]).to.deep.equal({
            text: 'RgTya',
            number: 64075909,
            hex: '70ad29aacf0b690b0467fe2b2767f765'
          })

          // test2 tiene data invalida asi que no deberia aparecer en la respuesta
          const file2 = res.body.find(f => f.file === 'test2.csv')
          expect(file2).to.equal(undefined)

          done()
        })
    })

    it('debe filtrar por nombre de archivo si se proporciona', (done) => {
      request(app)
        .get('/files/data?fileName=test1.csv')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0].file).to.equal('test1.csv')
          done()
        })
    })
  })

  describe('GET /files/list', () => {
    it('debe retornar una lista de archivos', (done) => {
      request(app)
        .get('/files/list')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).to.have.property('files')
          expect(res.body.files).to.deep.equal(['test1.csv', 'test2.csv'])
          done()
        })
    })
  })
})
