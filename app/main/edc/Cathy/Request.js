const Cathy = require('./index')
const BaseEdc = require('../BaseEdc')

class CathyRequest extends Cathy {
  constructor() {
    super()
    this._dataBuffer.fill(BaseEdc.space)
  }

  set transType(transType) {
    this._dataBuffer.write(transType, Cathy.getDataFormatStart('transType'), Cathy.dataFormat.transType.length)
  }
  set storeId(storeId) {
    this._dataBuffer.write(storeId, Cathy.getDataFormatStart('storeId'), Cathy.dataFormat.storeId.length)
  }
  set transAmount(transAmount) {
    this._dataBuffer.write(transAmount, Cathy.getDataFormatStart('transAmount'), Cathy.dataFormat.transAmount.length)
  }
  set transDate(transDate) {
    this._dataBuffer.write(transDate, Cathy.getDataFormatStart('transDate'), Cathy.dataFormat.transDate.length)
  }
  set transTime(transTime) {
    this._dataBuffer.write(transTime, Cathy.getDataFormatStart('transTime'), Cathy.dataFormat.transTime.length)
  }
  generate() {
    return BaseEdc.generateMessageBuffer(this._dataBuffer.toString())
  }
}

module.exports = CathyRequest