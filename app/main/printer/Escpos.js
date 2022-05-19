class Escpos {
  constructor() { }

  static NULL = Buffer.from([0x00])
  static ESC = Buffer.from([0x1b])
  static FS = Buffer.from([0x1c])
  static GS = Buffer.from([0x1d])

  // Printer hardware
  static HW_INIT = Buffer.from([0x1b, 0x40]) // Clear data in buffer and reset modes
  static HW_SELECT = Buffer.from([0x1b, 0x3d, 0x01]) // Printer select
  static HW_RESET = Buffer.from([0x1b, 0x3f, 0x0a, 0x00]) // Reset printer hardware

  // Feed control sequences
  static CTL_LF = Buffer.from([0x0a]) // Print and line feed
  static CTL_FF = Buffer.from([0x0c]) // Form feed
  static CTL_CR = Buffer.from([0x0d]) // Carriage return
  static CTL_HT = Buffer.from([0x09]) // Horizontal tab
  static CTL_VT = Buffer.from([0x0b]) // Vertical tab

  // Paper
  static PAPER_FULL_CUT = Buffer.from([0x1d, 0x56, 0x00]) // Full paper cut
  static PAPER_PARTIAL_CUT = Buffer.from([0x1d, 0x56, 0x01]) // Partial paper cut
  static PAPER_CUT_A = Buffer.from([0x1d, 0x56, 0x41]) // Paper cut A
  static PAPER_CUT_B = Buffer.from([0x1d, 0x56, 0x42]) // Paper cut B

  // Cash Drawer
  static CD_KICK_2 = Buffer.from([0x1b, 0x70, 0x00]) // Send pulse to pin 2
  static CD_KICK_5 = Buffer.from([0x1b, 0x70, 0x01]) // Send pulse to pin 5

  // Code Pages
  static CP_SET = Buffer.from([0x1b, 0x74]) // Set Code Page
  static CP_CP437 = Buffer.from([0x0]) // USA, Standard Europe
  static CP_CP850 = Buffer.from([0x2]) // Multilingual

  // Text formating
  static TXT_NORMAL = Buffer.from([0x1b, 0x21, 0x00])        // Normal text
  static TXT_2HEIGHT = Buffer.from([0x1b, 0x21, 0x10])       // Double height text
  static TXT_2WIDTH = Buffer.from([0x1b, 0x21, 0x20])        // Double width text
  static TXT_4SQUARE = Buffer.from([0x1b, 0x21, 0x30])        // Quad area text
  static TXT_UNDERL_OFF = Buffer.from([0x1b, 0x2d, 0x00])        // Underline font OFF
  static TXT_UNDERL_ON = Buffer.from([0x1b, 0x2d, 0x01])        // Underline font 1
  static TXT_UNDERL2_ON = Buffer.from([0x1b, 0x2d, 0x02])        // Underline font 2
  static TXT_BOLD_OFF = Buffer.from([0x1b, 0x45, 0x00])        // Bold font OFF
  static TXT_BOLD_ON = Buffer.from([0x1b, 0x45, 0x01])        // Bold font ON
  static TXT_FONT_A = Buffer.from([0x1b, 0x4d, 0x00])        // Font type A
  static TXT_FONT_B = Buffer.from([0x1b, 0x4d, 0x01])        // Font type B
  static TXT_ALIGN_LT = Buffer.from([0x1b, 0x61, 0x00])        // Left justification
  static TXT_ALIGN_CT = Buffer.from([0x1b, 0x61, 0x01])        // Centering
  static TXT_ALIGN_RT = Buffer.from([0x1b, 0x61, 0x02])        // Right justification
  static TXT_INVERT_ON = Buffer.from([0x1d, 0x42, 0x01])        // Inverted color text
  static TXT_INVERT_OFF = Buffer.from([0x1d, 0x42, 0x00])        // Inverted color text
  static TXT_COLOR_BLACK = Buffer.from([0x1b, 0x72, 0x00])        // Default Color
  static TXT_COLOR_RED = Buffer.from([0x1b, 0x72, 0x01])        // Alternative Color (Usually Red)
  static TXT_NORMAL_SIZE = Buffer.from([0x1D, 0x21, 0x00])        // Normal text size
  static TXT_LARGE_SIZE = Buffer.from([0x1D, 0x21, 0x11])        // Large text size

  //  Barcodes
  static BARCODE_TXT_OFF = Buffer.from([0x1d, 0x48, 0x00])         // HRI barcode chars OFF
  static BARCODE_TXT_ABV = Buffer.from([0x1d, 0x48, 0x01])         // HRI barcode chars above
  static BARCODE_TXT_BLW = Buffer.from([0x1d, 0x48, 0x02])         // HRI barcode chars below
  static BARCODE_TXT_BTH = Buffer.from([0x1d, 0x48, 0x03])         // HRI barcode chars both above and below
  static BARCODE_FONT_A = Buffer.from([0x1d, 0x66, 0x00])         // Font type A for HRI barcode chars
  static BARCODE_FONT_B = Buffer.from([0x1d, 0x66, 0x01])         // Font type B for HRI barcode chars
  static BARCODE_HEIGHT = Buffer.from([0x1d, 0x68])         // Barcode Height (1 - 255)
  static BARCODE_WIDTH = Buffer.from([0x1d, 0x77])         // Barcode Width (2 - 6)
  static BARCODE_UPC_A = Buffer.from([0x1d, 0x6b, 0x00])         // Barcode type UPC-A
  static BARCODE_UPC_E = Buffer.from([0x1d, 0x6b, 0x01])         // Barcode type UPC-E
  static BARCODE_EAN13 = Buffer.from([0x1d, 0x6b, 0x02])         // Barcode type EAN13
  static BARCODE_EAN8 = Buffer.from([0x1d, 0x6b, 0x03])         // Barcode type EAN8
  static BARCODE_CODE39 = Buffer.from([0x1d, 0x6b, 0x04])         // Barcode type CODE39
  static BARCODE_ITF = Buffer.from([0x1d, 0x6b, 0x05])         // Barcode type ITF
  static BARCODE_NW7 = Buffer.from([0x1d, 0x6b, 0x06])         // Barcode type NW7


  static BARCODE_HEIGHT_TW_INVOICE = Buffer.from([0x1d, 0x68, 0x26])        // Barcode Height wit taiwan format
  static BARCODE_WIDTH_TW_INVOICE = Buffer.from([0x1d, 0x77, 0x01])       //F Barcode Width wit taiwan format

  //  QRCode size
  static QRCODE_NORMAL = Buffer.from([0x04])
  static QRCODE_LARGE = Buffer.from([0x08])

  //  Images
  static IMAGE = Buffer.from([0x1d, 0x76, 0x30, 0x00])    // Start image pixel data

  // Page mode
  static PAGE_MODE_INIT = Buffer.from('\x1B\x4C\x1D\x50\x00\xCB\x1B\x57\x00\x00\x00\x00\xA0\x01\x01\x00\x1B\x54\x30')
  static PAGE_MODE_END = Buffer.from([0x0C])

  static SMOOTHING_ON = Buffer.from('\x1D\x62\x01')
  static SMOOTHING_OFF = Buffer.from('\x1D\x62\x00')
}

module.exports = Escpos