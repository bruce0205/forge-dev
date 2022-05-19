document.addEventListener('DOMContentLoaded', () => {
  configBridge.preload()
  configBridge.appVersion()
  configBridge.isDev()

  // configBridge.deleteConfig('cust')
  // configBridge.setConfig('cust', 'h001')
})