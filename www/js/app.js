const app = {
  
  // Init app
  initialize: () => {
    app.bindEvents()
  },
  
  // Bind event listeners
  bindEvents: () => {
    document.addEventListener('deviceready', app.onDeviceReady, false)
  },
  
  // Device ready
  onDeviceReady: () => {
    console.log('Device Ready!')
  }
  
}


app.initialize()
