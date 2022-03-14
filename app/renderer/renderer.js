document.getElementById('incrementCount').addEventListener('click', () => {
  console.log('renderer:incrementCount:click')
  bridgeAPI.incrementCount()
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('renderer:DOMContentLoaded')
  bridgeAPI.preload()
  bridgeAPI.updateCountDisplay()
  bridgeAPI.appVersion()
  bridgeAPI.isDev()
  setTimeout(() => {
    bridgeAPI.setConfig('cust', 'h001')
  }, 6000)
})