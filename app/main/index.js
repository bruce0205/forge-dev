const { app, BrowserWindow, autoUpdater, dialog, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev')
const log = require('electron-log')
const config = require('./service/config')
const printer = require('./service/printer')

require('./service/edc')
// require('../test/cathy')

log.transports.file.level = true
log.transports.console.level = true
log.transports.file.maxSize = 5 * 1024 * 1024

log.info('========== app is starting ==========')
log.info(`__dirname: ${__dirname}`)
log.info(`process.cwd(): ${process.cwd()}`)
log.info(`running in development: ${isDev}`)

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(process.cwd(), 'node_modules', '.bin', 'electron')
  })
} else {
  const server = 'https://hazel-dev-omega.vercel.app/'
  const url = `${server}/update/${process.platform}/${app.getVersion()}`
  const feed = {
    url,
    provider: 'github',
    owner: 'bonviesinfo',
    repo: 'Eletron-POS',
    token: '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',
    private: true
  }

  autoUpdater.setFeedURL(feed)
  autoUpdater.checkForUpdates()
}

/** autoUpdater start */
autoUpdater.on('checking-for-update', () => {
  log.info('[autoUpdater][checking-for-update]')
})
autoUpdater.on('update-available', info => {
  log.info('[autoUpdater][update-available]')
})
autoUpdater.on('update-not-available', info => {
  log.info('[autoUpdater][update-not-available]')
})
autoUpdater.on('download-progress', info => {
  log.info('[autoUpdater][download-progress]')
  console.log(info.percent)
})
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
  log.info('[autoUpdater][update-downloaded]')
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
autoUpdater.on('error', message => {
  log.info('[autoUpdater][error] ' + message)
})
/** autoUpdater end */

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'index.js')
    }
  });

  if (config.getConfig()['mode'] === 'dev') {
    mainWindow.loadFile(path.join(__dirname, '..', 'html.dev', 'index.html'));
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'html', 'index.html'));
  }
};

/** app event listener start */
app.on('ready', () => {
  config.initConfig()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
/** app event listener end */

ipcMain.on('ping', function (event, payload) {
  console.log('ping')
  // mainWindow.webContents.send('pong')
  event.returnValue = 'response from ipcMain'
})

// setInterval(() => {
//   ipcMain.emit('pong')
// }, 1000)