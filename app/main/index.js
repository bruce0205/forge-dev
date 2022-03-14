const { app, BrowserWindow, autoUpdater, dialog, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev')
const log = require('electron-log')
const utility = require('./utility')

require('electron-reload')(__dirname, {
  electron: path.join(process.cwd(), 'node_modules', '.bin', 'electron')
});

log.transports.file.level = true
log.transports.console.level = true
// log.transports.console.format = '{h}:{i}:{s} {text}'
log.transports.file.maxSize = 5 * 1024 * 1024

log.info('app is starting')
log.info(`__dirname: ${__dirname}`) // /Users/brucehsu/workspace/test-electron/forge-dev/app/main
log.info(`process.cwd(): ${process.cwd()}`) // /Users/brucehsu/workspace/test-electron/forge-dev

const overseer = {
  count: 0
}

function initialize() {
  utility.initConfig()
}

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
  // const server = 'https://update.electronjs.org'
  // const feed = `${server}/bruce0205/forge-dev/${process.platform}-${process.arch}/${app.getVersion()}`

  const server = 'https://hazel-dev-omega.vercel.app/'
  const url = `${server}/update/${process.platform}/${app.getVersion()}`
  const feed = {
    url,
    provider: 'github',
    owner: 'bruce0205',
    repo: 'forge-dev',
    token: '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',
    private: true
  }

  autoUpdater.setFeedURL(feed)
  autoUpdater.checkForUpdates()
}

/** autoUpdater start */
autoUpdater.on('checking-for-update', () => {
  console.log('checking-for-update....')
})
// 有更新檔可下載
autoUpdater.on('update-available', info => {
  // do something...
})
// 沒有更新檔可下載
autoUpdater.on('update-not-available', info => {
  // do something...
})
// 下載進度，開始下載後會持續觸發此事件
autoUpdater.on('download-progress', info => {
  console.log(info.percent)
})
// 下載完成
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
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
  console.error('There was a problem updating the application')
  console.error(message)
})
/** autoUpdater end */

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    // icon: path.join(__static, 'icon.png'), // 開啟後工具列的 icon
    webPreferences: {
      preload: path.join(process.cwd(), 'app', 'preload', 'index.js')
    },
    // frame: false,          // 標題列不顯示
    // transparent: true,     // 背景透明
    // autoHideMenuBar: true  // 工具列不顯示
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(process.cwd(), 'app', 'renderer', 'index.html'));

  // Open the DevTools.
  if (isDev) mainWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  initialize()
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('main:is-dev', async (event, payload) => {
  event.returnValue = isDev
})

ipcMain.on('main:app-version', async (event, payload) => {
  event.returnValue = app.getVersion()
})

ipcMain.on('ping', function (event, payload) {
  console.log('main:ping')
  mainWindow.webContents.send('pong')
  event.returnValue = ' return bbb '
})

ipcMain.on('main:increment-count', (event, payload) => {
  console.log('main:increment-count')
  overseer.count += 1
})

ipcMain.on('main:request-count', (event, payload) => {
  console.log('main:request-count')
  event.reply('preload:set-count', overseer.count)
})
ipcMain.on('main:get-env', async (event, payload) => {
  event.returnValue = {
    appVersion: app.getVersion(), // 1.0.2-test.0
    appName: app.getName(), // forge-dev
    appDataPath: app.getPath('appData'), // /Users/brucehsu/Library/Application Support
    userDataPath: app.getPath('userData'), // /Users/brucehsu/Library/Application Support/forge-dev
    homePath: app.getPath('home'), // /Users/brucehsu
    logsPath: app.getPath('logs'), // /Users/brucehsu/Library/Logs/forge-dev
    appPath: app.getAppPath() // /Users/brucehsu/workspace/test-electron/forge-dev
  }
})

ipcMain.on('main:get-config', (event, payload) => {
  event.returnValue = utility.getConfig()
})

ipcMain.on('main:set-config', (event, payload) => {
  log.info('[main:set-config]: ' + JSON.stringify(payload))
  utility.setConfigByKey(payload.key, payload.value)
  event.returnValue = { success: true }
})