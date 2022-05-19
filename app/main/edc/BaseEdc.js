class BaseEdc {
  constructor() { }

  static stx = Buffer.from('\x02')
  static etx = Buffer.from('\x03')
  static ack = Buffer.from('\x06')
  static space = Buffer.from('\x20')

  static calculateLRC(dataBuffer) {
    let buffer = Buffer.concat([dataBuffer, this.etx])
    let lrc = 0
    for (let i = 0; i < buffer.length; i++) {
      lrc = lrc ^ buffer.readUInt8(i)
      // FIXME: debug mode
      // console.log((i + 1) + ": " + buffer.readUInt8(i).toString(16))
    }
    return lrc
  }
  static generateMessageBuffer(dataStr) {
    const dataBuffer = Buffer.alloc(dataStr.length)
    for (let i = 0; i < dataStr.length; i++) {
      dataBuffer.write(dataStr[i], i)
    }
    const lrc = this.calculateLRC(dataBuffer)

    const messageBuffer = Buffer.concat([this.stx, dataBuffer, this.etx, new Uint8Array([lrc])])
    return messageBuffer
  }
}

module.exports = BaseEdc