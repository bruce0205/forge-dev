const { ipcMain } = require('electron');
const overseer = {
  count: 0
}

ipcMain.on('main:increment-count', (event, payload) => {
  console.log('main:increment-count')
  overseer.count += 1
})

ipcMain.on('main:request-count', (event, payload) => {
  console.log('main:request-count')
  event.reply('preload:set-count', overseer.count)
})

module.exports = {}