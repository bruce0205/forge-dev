const { SerialPort } = require('serialport')
const log = require('electron-log')
const { ByteLengthParser } = require('@serialport/parser-byte-length')
const ackBuffer = Buffer.from([0x06, 0x06])
const CathyResponse = require('./Response')

class CathyCommunication {
  constructor({ path = '/dev/tty.usbserial-1410', baudRate = 9600 }) {
    this._path = path
    this._baudRate = baudRate
    this._dataBits = 7
    this._stopBit = 1
    this._parity = 'even'
    this._autoOpen = false

    this._port = new SerialPort({
      path: this._path,
      baudRate: this._baudRate,
      dataBits: this._dataBits,
      stopBit: this._stopBit,
      parity: this._parity,
      autoOpen: this._autoOpen
    })
    this._port.on('error', function (err) {
      console.log('Error: ', err.message)
      log.info('[edc:cathy:communication]: ' + err.message)
    })
    this._byteParser = this._port.pipe(new ByteLengthParser({ length: 605 }))
  }
  connection() {
    const _this = this
    return new Promise(function (resolve, reject) {
      _this._port.open((err) => {
        if (err) {
          reject('connect failed')
        } else {
          resolve('connect successfully')
        }
      })
      // setTimeout(function () { reject('edc connection is failed') }, 3000)
      // setTimeout(resolve, 2000)
    })
  }

  sendMessage(request) {
    const _this = this

    return new Promise(function (resolve, reject) {
      _this._port.write(request.generate(), function (err) {
        if (err) {
          // reject('write failed')
        } else {
          // resolve('write successfully')
        }
      })

      _this._byteParser.on('data', (buf) => {
        _this._port.write(ackBuffer)
        const response = new CathyResponse()
        log.info('[edc:response] ' + buf.toString('hex'))
        response.message = buf.toString('hex')
        resolve(response)
      })

      // setTimeout(() => {
      //   const message = '060602303130333030303030363531353732313730302a2a2a31343036202020303030303030303030303131313130303232303330323034353432323737373737372020202020202020202020202020203030303039393939383031333132333435363738393031323030303030322020202020204141414141414242424242424343434343432020202020202020202020203031202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202035313537323143754b673154635046444335374671486833314252673050396c5638747965743271436a305354786937553d202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020203230323230333032303435343232424345363732393637314434343233363342413431413433343231383838434142313944423344383030303030313938303830303238342020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202035313537323143754b673154635046444335374671486833314252673050396c5638747965743271436a305354786937553d20202020202020202020202020202020202020202020202020202020202020200373'
      //   const response = new CathyResponse()
      //   response.message = message
      //   resolve(response)
      // }, 4000)
    })
  }

  close() {
    if (this._port.isOpen) this._port.close()
  }
  get port() {
    return this._port
  }
}

module.exports = CathyCommunication
// TODO: 1) open connection
// TODO: 2) write request
// TODO: 2-1) log
// TODO: 3) handle response
// TODO: 3-1) log
// TODO: 4) close connection