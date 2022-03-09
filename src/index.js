const { app, BrowserWindow, autoUpdater, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev')

console.log("app.getVersion()", app.getVersion())
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

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
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

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  if (isDev) mainWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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
