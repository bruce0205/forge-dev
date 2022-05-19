const { SerialPort } = require('serialport')
const log = require('electron-log')
const dayjs = require('dayjs')
const utility = require('../utility')
const iconv = require('iconv-lite')
const Escpos = require('./Escpos')
const duration = 50

function genTextBuffer(content, encoding = 'cp950') {
  return iconv.encode(content, 'cp950')
}

class PrinterCommunication {
  constructor({ path = '/dev/tty.usbserial-1410', baudRate = 9600 }) {
    this._path = path
    this._baudRate = baudRate
    this._dataBits = 8
    this._stopBit = 1
    this._parity = 'none'
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
      log.info('[printer]: ' + err.message)
    })
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
    })
  }
  /**
   * @deprecated
   */
  sendMessage(requestBuffer) {
    const _this = this

    return new Promise(function (resolve) {
      _this._port.write(requestBuffer, function (err) {
        if (err) {
          reject('write failed')
        } else {
          resolve('write successfully')
        }
      })
      resolve('write successfully')
    })
  }

  sendReceipt({ headers, salesDetails, total }) {
    const _this = this
    const currentTime = dayjs().format('YYYY-MM-DD hh:MM:ss')
    const prefixCommand = '\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'

    return new Promise(async function (resolve) {
      // reset
      _this._port.write(Escpos.HW_INIT)

      // logo
      _this._port.write(Buffer.from('\x1D\x28\x4C\x06\x00\x30\x45\x20\x20\x01\x01'))

      if (headers.headTime) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.headTime}${currentTime}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.invoiceHead1) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.invoiceHead1}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.invoiceHead2) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.invoiceHead2}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.invoiceHead3) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.invoiceHead3}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.invoiceHead4) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.invoiceHead4}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.invoiceHead5) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.invoiceHead5}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.invoiceHead6) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.invoiceHead6}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }
      if (headers.salePointInvoiceName) {
        await utility.delay(duration)
        _this._port.write(Buffer.from(prefixCommand))
        _this._port.write(genTextBuffer(`${headers.salePointInvoiceName}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }

      for (let i = 0; i < salesDetails.length; i++) {
        const prefix = '     '
        const itemName = salesDetails[i].item.substring(0, 18)
        const qty = salesDetails[i].qty.toString().padStart(6)
        const salePrice = salesDetails[i].salePrice.toString().padStart(9)
        const subTotal = salesDetails[i].subTotal.toString().padStart(9)

        await utility.delay(duration)
        _this._port.write(Buffer.from('\x1d\x24\x19\x40\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
        _this._port.write(genTextBuffer(itemName))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

        await utility.delay(duration)
        _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
        _this._port.write(genTextBuffer(`${prefix}${qty}${salePrice}${subTotal}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }

      if (total) {
        await utility.delay(duration)
        _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
        _this._port.write(genTextBuffer(`-----------------------------------`))
        _this._port.write(Escpos.CTL_LF)

        await utility.delay(duration)
        _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
        _this._port.write(genTextBuffer(`                合計${total.toString().padStart(9)}`))
        _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      }

      // cut
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x56\x41\x00'))

      resolve('write successfully')
    })
  }

  // 收據
  sendReceiptTest() {
    const _this = this
    return new Promise(async function (resolve) {
      // reset
      _this._port.write(Escpos.HW_INIT)

      // logo
      _this._port.write(Buffer.from('\x1D\x28\x4C\x06\x00\x30\x45\x20\x20\x01\x01'))

      // 列印：202204-09 18:07:25
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('    列印：2022-04-09 18:07:25'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // Facebook：Hunter Taiwan
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('     Facebook : Hunter Taiwan '))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 台北市忠誠路二段78號
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('      台北市忠誠路二段78號'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 預約專線：02-886665682
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('     預約專線: 02-88665682'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 美容 10:00-12:30 14:00-19:30
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('     美容 10:00-12:30 14:00-19:30'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 門市 10:00-21:30    全年無休
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('     門市 10:00-21:30   全年無休'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // <商品售出恕不受理退換>
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('     <商品售出恕不受理退換>'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer(`-----------------------------------\n\n項目     數量   單價     小計\n\n-----------------------------------`))
      _this._port.write(Escpos.CTL_LF)


      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x40\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('口服藥7日份'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('          1      500      500'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))


      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('點滴 200ml以下(技術耗材)'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('          1      200      200'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('紅血球生成素 EPO (醫院)'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('          1      500      500'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer(`-----------------------------------`))
      _this._port.write(Escpos.CTL_LF)


      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('                合計     2710'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer(' \n\n'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // cut
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x56\x41\x00'))

      resolve('write successfully')
    })
  }

  // 發票明細
  sendInvoiceDetailTest() {
    const _this = this
    return new Promise(async function (resolve) {
      // reset
      _this._port.write(Escpos.HW_INIT)

      // 交易明細
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00\x20\x20\x20\x20\x20\x20\x09\x20\x20\x20\x20\x20\x20'))
      _this._port.write(genTextBuffer('交易明細'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 2022-03-31 11:07:05
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('2022-03-31 11:07:05'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // ------------
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x0a'))

      // 品名 單價*數量 金額
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('    品名     單價*數量    金額'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // Dogsofa Living 60x45 cm
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('Dogsofa Living 60x45 cm'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 5520*1 5520 TX
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('             5520*1     5520 TX'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // ------------
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x0a'))

      // 合計 1項
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('合計 1項'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 總計 $5,520
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('總計 $5,520'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // 備註
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x24\x19\x00\x1b\x24\x00\x00\x1d\x62\x00\x1d\x42\x00\x1d\x21\x00\x1b\x21\x00\x1c\x21\x00\x1b\x20\x00'))
      _this._port.write(genTextBuffer('備註'))
      _this._port.write(Buffer.concat([Escpos.CTL_LF, Escpos.CTL_LF]))

      // cut
      await utility.delay(duration)
      _this._port.write(Buffer.from('\x1d\x56\x41\x00'))

      resolve('write successfully')
    })
  }

  close() {
    if (this._port.isOpen) this._port.close()
  }
  get port() {
    return this._port
  }
}

module.exports = PrinterCommunication