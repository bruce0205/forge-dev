const { contextBridge, ipcRenderer } = require('electron')
const config = require('./config')
const edc = require('./edc')
const printer = require('./printer')

window.addEventListener('DOMContentLoaded', () => {
  console.log(ipcRenderer.sendSync('ping'))
})
ipcRenderer.on('pong', function () {
  console.log('pong')
})

contextBridge.exposeInMainWorld('configBridge', config)
contextBridge.exposeInMainWorld('edcBridge', edc)
contextBridge.exposeInMainWorld('printerBridge', printer)
