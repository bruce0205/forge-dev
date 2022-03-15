const { app, ipcMain } = require('electron');
const path = require('path')
const log = require('electron-log')
const fs = require('fs')
const isDev = require('electron-is-dev')

const configPath = path.join(app.getPath('home'), `.${app.getName()}`)
const configFilename = 'config.json'

const config = {
  initConfig() {
    // initialize config
    if (!fs.existsSync(path.join(configPath, configFilename))) {
      fs.mkdirSync(configPath, { recursive: true })
      fs.writeFileSync(path.join(configPath, configFilename), JSON.stringify({}))
      log.info("initialize empty config")
    }
  },
  getConfig() {
    return JSON.parse(fs.readFileSync(path.join(configPath, configFilename)))
  },
  setConfigByKey(key, value) {
    const config = JSON.parse(fs.readFileSync(path.join(configPath, configFilename)))
    config[key] = value
    fs.writeFileSync(path.join(configPath, configFilename), JSON.stringify(config))
  },
  deleteConfigByKey(key) {
    const config = JSON.parse(fs.readFileSync(path.join(configPath, configFilename)))
    delete config[key]
    fs.writeFileSync(path.join(configPath, configFilename), JSON.stringify(config))
  }
}

ipcMain.on('main:get-env', async (event, payload) => {
  event.returnValue = {
    appVersion: app.getVersion(),
    appName: app.getName(),
    appDataPath: app.getPath('appData'),
    userDataPath: app.getPath('userData'),
    homePath: app.getPath('home'),
    logsPath: app.getPath('logs'),
    appPath: app.getAppPath()
  }
})

ipcMain.on('main:is-dev', async (event, payload) => {
  event.returnValue = isDev
})

ipcMain.on('main:app-version', async (event, payload) => {
  event.returnValue = app.getVersion()
})

ipcMain.on('main:get-config', (event, payload) => {
  event.returnValue = config.getConfig()
})

ipcMain.on('main:set-config', (event, payload) => {
  log.info('[main:set-config]: ' + JSON.stringify(payload))
  config.setConfigByKey(payload.key, payload.value)
  event.returnValue = { success: true }
})

ipcMain.on('main:delete-config', (event, payload) => {
  log.info('[main:delete-config]: ' + JSON.stringify(payload))
  config.deleteConfigByKey(payload.key)
  event.returnValue = { success: true }
})

module.exports = config