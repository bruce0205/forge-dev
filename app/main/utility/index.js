const { app } = require('electron');
const path = require('path')
const log = require('electron-log')
const fs = require('fs')

const configPath = path.join(app.getPath('home'), `.${app.getName()}`)
const configFilename = 'config.json'

module.exports = {
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
  }
}