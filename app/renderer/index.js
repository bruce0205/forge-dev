document.getElementById('incrementCount').addEventListener('click', () => {
  console.log('renderer:incrementCount:click')
  test.incrementCount()
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('renderer:DOMContentLoaded')
  bridgeAPI.preload()
  test.updateCountDisplay()
  bridgeAPI.appVersion()
  bridgeAPI.isDev()

  setTimeout(() => {
    bridgeAPI.deleteConfig('cust')
  }, 3000)
  setTimeout(() => {
    bridgeAPI.setConfig('cust', 'h001')
  }, 1000)
})