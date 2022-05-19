const Cathy = require('./index')

class CathyResponse extends Cathy {
  constructor() {
    super()
  }

  print() {
    console.log('encoding:', this.encoding)
    console.log('message:', this.message)
  }
  isSuccess() {
    return this.respCode.toString() === '0000'
  }
  toJSON() {
    return {
      transType: this.transType.toString(),
      hostId: this.hostId.toString(),
      receiptNo: this.receiptNo.toString(),
      cardNo: this.cardNo.toString().trim(),
      transAmount: this.transAmount.toString(),
      transDate: this.transDate.toString(),
      transTime: this.transTime.toString(),
      approvalNo: this.approvalNo.toString(),
      respCode: this.respCode.toString(),
      terminalId: this.terminalId.toString(),
      referenceNo: this.referenceNo.toString(),
      reserve: this.reserve.toString(),
      storeId: this.storeId.toString(),
      cardType: this.cardType.toString(),
      respTime: this.respTime.toString(),
      merchantId: this.merchantId.toString(),
      encryptedCardNo: this.encryptedCardNo.toString()
    }

  }
}

module.exports = CathyResponse