const { contextBridge, ipcRenderer } = require('electron')
const test = require('./test')
const config = require('./config')

window.addEventListener('DOMContentLoaded', () => {
  console.log(ipcRenderer.sendSync('ping'))

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('test', test)
contextBridge.exposeInMainWorld('bridgeAPI', config)

ipcRenderer.on('pong', function () {
  console.log('pong')
})