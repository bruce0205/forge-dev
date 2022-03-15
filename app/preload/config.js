
const { ipcRenderer } = require('electron')

module.exports = {
  preload: () => {
    const envs = ipcRenderer.sendSync('main:get-env')
    const config = ipcRenderer.sendSync('main:get-config')
    console.log('envs', envs)
    console.log('config', config)
  },
  setConfig(key, value) {
    const response = ipcRenderer.sendSync('main:set-config', { key, value })
    console.log('response:', response)
  },
  deleteConfig(key) {
    const response = ipcRenderer.sendSync('main:delete-config', { key })
    console.log('response:', response)
  },
  isDev: () => {
    console.log('preload:bridgeAPI:isDev')
    const isDev = ipcRenderer.sendSync('main:is-dev')
    document.getElementById('is-dev').innerHTML = isDev
  },
  appVersion: () => {
    console.log('preload:bridgeAPI:appVersion')
    const appVersion = ipcRenderer.sendSync('main:app-version')
    document.getElementById('app-version').innerHTML = appVersion
  }
}