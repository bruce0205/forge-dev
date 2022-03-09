document.getElementById('incrementCount').addEventListener('click', () => {
  console.log('renderer:incrementCount:click')
  bridgeAPI.incrementCount()
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('renderer:DOMContentLoaded')
  bridgeAPI.updateCountDisplay()
  bridgeAPI.appVersion()
  bridgeAPI.isDev()
})