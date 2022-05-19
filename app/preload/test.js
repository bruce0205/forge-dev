const { ipcRenderer } = require('electron')

ipcRenderer.on('preload:set-count', (event, newCount) => {
  console.log("renderer:test:set-count")
  document.getElementById('count').innerHTML = newCount
})

module.exports = {
  updateCountDisplay: () => {
    console.log('preload:test:updateCountDisplay')
    ipcRenderer.send('main:request-count', {})
  },
  incrementCount: () => {
    console.log('preload:test:incrementCount')
    ipcRenderer.send('main:increment-count', {})
    ipcRenderer.send('main:request-count', {})
  }
}