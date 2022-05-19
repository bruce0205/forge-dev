const { ipcMain } = require('electron')
const { CathyCommunication, CathyRequest } = require('../edc')
const log = require('electron-log')
const config = require('./config')


function formatAmount(amount) {
  // check integer
  if (!Number.isInteger(amount)) {
    throw 'illegal amount'
  }
  return String(amount).padStart(10, '0') + '00'
}

const edc = {
  test() { console.log('hello edc service') }
}

ipcMain.on('edc:send', async (event, payload) => {
  log.info('[edc:send]: ' + JSON.stringify(payload))

  let communication
  try {
    const edcConfig = config.getConfig()['edc']
    if (!!!edcConfig) {
      throw 'edc config is mandatory'
    }
    communication = new CathyCommunication({
      path: edcConfig.path,
      baudRate: edcConfig.baudRate
    })
    await communication.connection()

    const request = new CathyRequest()
    request.transType = CathyRequest.transType.sales
    request.storeId = 'AAAAAABBBBBBCCCCCC'
    request.storeId = '                  '
    request.transAmount = formatAmount(payload.amount)
    request.transDate = '220301'
    request.transTime = '123043'

    const response = await communication.sendMessage(request)
    event.returnValue = { success: response.isSuccess(), response: response.toJSON() }
  } catch (err) {
    event.returnValue = { success: false, err: err }
  } finally {
    communication.close()
  }
})

module.exports = edc