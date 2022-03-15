const { contextBridge, ipcRenderer } = require('electron')
const test = require('./test')
const app = require('./app')

window.addEventListener('DOMContentLoaded', () => {
  console.log(ipcRenderer.sendSync('ping'))
  // ipcRenderer.send('ping')
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('test', test)
contextBridge.exposeInMainWorld('bridgeAPI', app)
