const { ipcRenderer } = require('electron')

module.exports = {
  /**
   * @returns {object} response of edc transaction, format：
   * transType: 交易類別
   * hostId: 授權銀行編號
   * receiptNo: 調閱編號
   * cardNo: 信用卡卡號
   * transDate: 交易日期(YYMMDD)
   * transTime: 交易時間(HHMMSS)
   * approvalNo: 授權碼
   */
  send(payload) {
    const resp = ipcRenderer.sendSync('edc:send', payload)
    return resp
  }
}