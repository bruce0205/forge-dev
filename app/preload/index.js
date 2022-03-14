const { contextBridge, ipcRenderer } = require('electron')

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

ipcRenderer.on('pong', function () {
  console.log('renderer:pong')
})

ipcRenderer.on('preload:set-count', (event, newCount) => {
  console.log("preload:set-count")
  document.getElementById('count').innerHTML = newCount
})

contextBridge.exposeInMainWorld(
  'bridgeAPI',
  {
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
    isDev: () => {
      console.log('preload:bridgeAPI:isDev')
      const isDev = ipcRenderer.sendSync('main:is-dev')
      document.getElementById('is-dev').innerHTML = isDev
    },
    appVersion: () => {
      console.log('preload:bridgeAPI:appVersion')
      const appVersion = ipcRenderer.sendSync('main:app-version')
      document.getElementById('app-version').innerHTML = appVersion
    },
    updateCountDisplay: () => {
      console.log('preload:bridgeAPI:updateCountDisplay')
      ipcRenderer.send('main:request-count', {})
    },
    incrementCount: () => {
      console.log('preload:bridgeAPI:incrementCount')
      ipcRenderer.send('main:increment-count', {})
      ipcRenderer.send('main:request-count', {})
    },
  }
)
