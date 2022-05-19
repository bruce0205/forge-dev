const { ipcRenderer } = require('electron')

module.exports = {
  /**
   * 銷售單收據列印
   * 
   * @param {object} headers 收據表頭，包含欄位：headTime (列印時間標題), invoiceHead1~6 (收據抬頭一~六), salePointInvoiceName (列印內容標題)
   * @param {array} salesDetails 銷售明細，為array object，object 包含欄位：item, qty, salePrice, subTotal
   * @param {integer} total 金額合計，為銷售明細所有小計的總合
   * @returns {object} response about this request
   * @example
     printerBridge.printReceipt(
      {
        "headTime": "    列印：", 
        "invoiceHead1": "     Facebook : Hunter Taiwan ", 
        "invoiceHead2": "      台北市忠誠路二段78號",
        "invoiceHead3": "     預約專線: 02-88665682",
        "invoiceHead4": "     美容 10:00-12:30 14:00-19:30 ",
        "invoiceHead5": "     門市 10:00-21:30   全年無休",
        "invoiceHead6": "     <商品售出恕不受理退換>",
        "salePointInvoiceName": "-----------------------------------\n\n項目     數量   單價     小計\n\n-----------------------------------"
      },
      [
          {"item": "口服藥7日份", "qty": 1, "salePrice": 100, "subTotal": 100},
          {"item": "點滴 200ml以下(技術耗材)", "qty": 1, "salePrice": 200, "subTotal": 200},
          {"item": "紅血球生成素 EPO (醫院)", "qty": 1, "salePrice": 500, "subTotal": 500}
      ], 
      800
    );
   * 
   */
  printReceipt(headers, salesDetails, total) {
    const payload = { headers, salesDetails, total }
    console.log(payload)
    const resp = ipcRenderer.sendSync('printer:receipt', payload)
    return resp
  },

  /**
   * [測試] 銷售單收據列印
   * 
   * @example 
   * printerBridge.testPrintReceipt()
   */
  testPrintReceipt() {
    const resp = ipcRenderer.sendSync('test:printer:receipt', {})
    return resp
  },
  testPrintInvoiceDetail() {
    const resp = ipcRenderer.sendSync('test:printer:invoice:detail', {})
    return resp
  },
  /**
   * 開啟錢櫃
   *
   * @example
   * printerBridge. openCashRegister()
   */
  openCashRegister() {
    const resp = ipcRenderer.sendSync('printer:openCashRegister', {})
    return resp
  }
}