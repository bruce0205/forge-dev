const feedingLine = Buffer.from('\x1B\x64\x06')
const iconv = require('iconv-lite')
const _ = {
  EOL: '\n'
};

function genTextBuffer(content, encoding = 'cp950') {
  return iconv.encode(content + _.EOL, 'cp950')
}

/**
 * @deprecated
 */
class Printer {
  constructor() {

  }
  genReceipt() {
    return Buffer.concat([
      Buffer.from('\x1d\x24'), // reset
      Buffer.from('\x1b\x21\x00'), // selectPrintMode
      Buffer.from('\x1d\x21\x00'), // setTextSize(1,1)
      Buffer.from('\x1b\x61\x01'), // setJustification(Printer::JUSTIFY_CENTER);
      Buffer.from(genTextBuffer('交易名細')),
      Buffer.from('\x1b\x21\x00'), // selectPrintMode
      Buffer.from('\x1d\x21\x00'), // setTextSize(1,1)
      Buffer.from('\x1b\x61\x00'), // setJustification();
      Buffer.from('\x32\x30\x32\x30\x2d\x30\x34\x2d\x30\x31\x20\x31\x30\x3a\x31\x30\x3a\x31\x30\x0a'), // 2020-04-01 10:10:10\n
      Buffer.from(genTextBuffer('----------------------------------')),
      Buffer.from(genTextBuffer('  品名    單價*數量    金額')),
      Buffer.from(genTextBuffer('小型犬 洗澡')),
      Buffer.from(genTextBuffer('            600*1      600 TX')),
      Buffer.from(genTextBuffer('基本小修')),
      Buffer.from(genTextBuffer('            300*1      300 TX')),
      Buffer.from(genTextBuffer('----------------------------------')),
      Buffer.from(genTextBuffer('合計 2項')),
      Buffer.from(genTextBuffer('總計 $900')),
      Buffer.from(genTextBuffer('備註')),
      Buffer.from('\x1B\x64\x06'), // feeding line
      Buffer.from('\x1d\x56\x41\x03') // cut
    ])
  }
  genOpenCashRegister() {
    return Buffer.from([0x10, 0x14, 0x01, 0x00, 0x01])
  }
}

module.exports = Printer