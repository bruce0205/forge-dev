const { ipcRenderer } = require('electron')

module.exports = {
  preload: () => {
    const envs = ipcRenderer.sendSync('main:get-env')
    const config = ipcRenderer.sendSync('main:get-config')
    return { envs, config }
  },
  getConfig() {
    const config = ipcRenderer.sendSync('main:get-config')
    return config
  },
  setConfig(key, value) {
    return ipcRenderer.sendSync('main:set-config', { key, value })
  },
  deleteConfig(key) {
    return ipcRenderer.sendSync('main:delete-config', { key })
  },
  isDev: () => {
    return ipcRenderer.sendSync('main:is-dev')
  },
  appVersion: () => {
    return ipcRenderer.sendSync('main:app-version')
  }
}