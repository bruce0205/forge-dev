const { ipcMain } = require('electron')
const log = require('electron-log')
const config = require('./config')
const { PrinterCommunication, T82iiiPrinter } = require('../printer')

const printer = {
  test() { console.log('hello printer service') }
}

ipcMain.on('printer:receipt', async (event, payload) => {
  log.info('[printer:receipt]: ' + JSON.stringify(payload))

  let communication
  try {
    const printerConfig = config.getConfig()['printer']
    if (!!!printerConfig) {
      throw 'printer config is mandatory'
    }

    communication = new PrinterCommunication({
      path: printerConfig.path,
      baudRate: printerConfig.baudRate
    })
    await communication.connection()

    const response = await communication.sendReceipt(payload)
    event.returnValue = { success: true, response }
  } catch (err) {
    event.returnValue = { success: false, err: err }
  } finally {
    communication.close()
  }
})

ipcMain.on('test:printer:receipt', async (event, payload) => {
  log.info('[test:printer:receipt]: ' + JSON.stringify(payload))

  let communication
  try {
    const printerConfig = config.getConfig()['printer']
    if (!!!printerConfig) {
      throw 'printer config is mandatory'
    }

    communication = new PrinterCommunication({
      path: printerConfig.path,
      baudRate: printerConfig.baudRate
    })
    await communication.connection()

    // const tm82iii = new T82iiiPrinter()
    // const response = await communication.sendMessage(tm82iii.genReceipt())
    const response = await communication.sendReceiptTest()
    event.returnValue = { success: true, response }
  } catch (err) {
    event.returnValue = { success: false, err: err }
  } finally {
    communication.close()
  }
})

ipcMain.on('test:printer:invoice:detail', async (event, payload) => {
  log.info('[test:printer:invoice:detail]: ' + JSON.stringify(payload))

  let communication
  try {
    const printerConfig = config.getConfig()['printer']
    if (!!!printerConfig) {
      throw 'printer config is mandatory'
    }

    communication = new PrinterCommunication({
      path: printerConfig.path,
      baudRate: printerConfig.baudRate
    })
    await communication.connection()

    const response = await communication.sendInvoiceDetailTest()
    event.returnValue = { success: true, response }
  } catch (err) {
    event.returnValue = { success: false, err: err }
  } finally {
    communication.close()
  }
})

ipcMain.on('printer:openCashRegister', async (event, payload) => {
  log.info('[printer:openCashRegister]: ' + JSON.stringify(payload))

  let communication
  try {
    const printerConfig = config.getConfig()['printer']
    if (!!!printerConfig) {
      throw 'printer config is mandatory'
    }

    communication = new PrinterCommunication({
      path: printerConfig.path,
      baudRate: printerConfig.baudRate
    })
    await communication.connection()

    const tm82iii = new T82iiiPrinter()
    const response = await communication.sendMessage(tm82iii.genOpenCashRegister())
    event.returnValue = { success: true, response }
  } catch (err) {
    event.returnValue = { success: false, err: err }
  } finally {
    communication.close()
  }
})

module.exports = printer