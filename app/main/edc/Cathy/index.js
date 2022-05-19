const TRANSACTION_TIME_OUT = 65 // seconds
const BaseEdc = require('../BaseEdc')
const Enumerator = require('../../utility/Enumerator')

const transType = {
  sales: '01', // 一般交易
  refund: '02', // 退貨交易
  void: '30', //  取消交易
  settle: '31' // 結帳交易
}
const respCode = {
  approved: '0000', // 授權
  error: '0001', // 拒絕
  referral: '0002', // 請查詢銀行
  timeOut: '0003' // 連線逾時
}

const dataFormat = {
  transType: { length: 2, position: 1 }, // 交易類別
  hostId: { length: 2, position: 3 }, // 授權銀行編號
  receiptNo: { length: 6, position: 5 }, // 端末機簽單序號(調閱編號)
  cardNo: { length: 19, position: 11 }, // 信用卡卡號
  cupFlag: { length: 2, position: 32 }, // 銀聯交易
  transAmount: { length: 12, position: 34 }, // 銀聯交易, 00 為一般交易, 01 為銀聯交易
  transDate: { length: 6, position: 46 }, // 交易日期(YYMMDD)
  transTime: { length: 6, position: 52 }, // 交易時間(HHMMSS)
  approvalNo: { length: 9, position: 58 }, // 授權碼
  respCode: { length: 4, position: 79 }, // 通訊回應碼, 由端末機(ecr)回傳
  terminalId: { length: 8, position: 83 }, // 端末機代號
  referenceNo: { length: 12, position: 91 }, // 銀行交易序號
  storeId: { length: 18, position: 115 }, // 櫃號、機號
  reserve: { length: 10, position: 135 }, // 保留(信用卡批次號碼 6 碼+6 碼空白) 
  cardType: { length: 2, position: 145 }, // 卡片代碼
  respTime: { length: 14, position: 389 }, // EDC 系統時間
  merchantId: { length: 15, position: 443 }, // 商店代號
  encryptedCardNo: { length: 50, position: 519 } // 電子發票加密卡號(新)
}

function getDataFormatStart(field) {
  return dataFormat[field].position - 1
}
function getDataFormatEnd(field) {
  return dataFormat[field].position - 1 + dataFormat[field].length
}

class Cathy extends BaseEdc {
  constructor() {
    super()
    this._encoding = 'hex'

    this._messageLength = 605
    this._dataLength = 600
    this._messageBuffer = Buffer.alloc(this._messageLength)
    this._dataBuffer = Buffer.alloc(this._dataLength)
  }

  get message() { return this._message }
  set message(message) {
    // message = <STX>[DATA]<ETX><LRC>
    this._message = message
    this._messageBuffer = Buffer.from(message, this._encoding)
    if (this._messageBuffer.length != this._messageLength) throw new Error('message buffer length must be ' + this._messageLength + '(' + this._messageBuffer.length + ')')

    this._dataBuffer = this._messageBuffer.subarray(3, this._messageLength - 2)
    this._lrc = this._messageBuffer.readUInt8(this._messageLength - 1)

    if (Cathy.calculateLRC(this._dataBuffer) !== this._lrc) throw new Error('LRC of message is invalid')
  }

  get messageBuffer() { return this._messageBuffer }
  set messageBuffer(messageBuffer) { this._messageBuffer = messageBuffer }
  get dataBuffer() { return this._dataBuffer }
  set dataBuffer(dataBuffer) { this._dataBuffer = dataBuffer }
  get lrc() { return this._lrc }

  get transType() {
    return this._dataBuffer.subarray(getDataFormatStart('transType'), getDataFormatEnd('transType'))
  }
  get hostId() {
    return this._dataBuffer.subarray(getDataFormatStart('transType'), getDataFormatEnd('transType'))
  }
  get receiptNo() {
    return this._dataBuffer.subarray(getDataFormatStart('receiptNo'), getDataFormatEnd('receiptNo'))
  }
  get cardNo() {
    return this._dataBuffer.subarray(getDataFormatStart('cardNo'), getDataFormatEnd('cardNo'))
  }
  get cupFlag() {
    return this._dataBuffer.subarray(getDataFormatStart('cupFlag'), getDataFormatEnd('cupFlag'))
  }
  get transAmount() {
    return this._dataBuffer.subarray(getDataFormatStart('transAmount'), getDataFormatEnd('transAmount'))
  }
  get transDate() {
    return this._dataBuffer.subarray(getDataFormatStart('transDate'), getDataFormatEnd('transDate'))
  }
  get transTime() {
    return this._dataBuffer.subarray(getDataFormatStart('transTime'), getDataFormatEnd('transTime'))
  }
  get approvalNo() {
    return this._dataBuffer.subarray(getDataFormatStart('approvalNo'), getDataFormatEnd('approvalNo'))
  }
  get respCode() {
    return this._dataBuffer.subarray(getDataFormatStart('respCode'), getDataFormatEnd('respCode'))
  }
  get terminalId() {
    return this._dataBuffer.subarray(getDataFormatStart('terminalId'), getDataFormatEnd('terminalId'))
  }
  get referenceNo() {
    return this._dataBuffer.subarray(getDataFormatStart('referenceNo'), getDataFormatEnd('referenceNo'))
  }
  get reserve() {
    return this._dataBuffer.subarray(getDataFormatStart('reserve'), getDataFormatEnd('reserve'))
  }
  get storeId() {
    return this._dataBuffer.subarray(getDataFormatStart('storeId'), getDataFormatEnd('storeId'))
  }
  get cardType() {
    return this._dataBuffer.subarray(getDataFormatStart('cardType'), getDataFormatEnd('cardType'))
  }
  get respTime() {
    return this._dataBuffer.subarray(getDataFormatStart('respTime'), getDataFormatEnd('respTime'))
  }
  get merchantId() {
    return this._dataBuffer.subarray(getDataFormatStart('merchantId'), getDataFormatEnd('merchantId'))
  }
  get encryptedCardNo() {
    return this._dataBuffer.subarray(getDataFormatStart('encryptedCardNo'), getDataFormatEnd('encryptedCardNo'))
  }

  getDataFormatStart(field) {
    return dataFormat[field].position - 1
  }
  getDataFormatEnd(field) {
    return dataFormat[field].position - 1 + dataFormat[field].length
  }
}

Cathy.transType = new Enumerator(transType)
Cathy.respCode = new Enumerator(respCode)
Cathy.dataFormat = dataFormat
Cathy.getDataFormatStart = getDataFormatStart
Cathy.getDataFormatEnd = getDataFormatEnd

module.exports = Cathy