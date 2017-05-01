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
  },
  
  // Read file
  readFile: (fileEntry) => {
    
    fileEntry.file((file) => {
      let reader = new FileReader()
      
      reader.onloadend = () => {
        console.log(`Successful file read: ${this.result}`)
      }
      
      reader.readAsText(file)
    }, () => console.log(`Error reading file!`))
    
  },
  
  // Write file
  writeFile: (fileEntry, dataObj) => {
    
    // Create a FileWriter object for our fileEntry (log.txt)
    fileEntry.createWriter((fileWriter) => {
      
      fileWriter.onwriteend = () => {
        console.log('Successful file write...')
        readFile(fileEntry)
      }
      
      fileWriter.onerror = (e) => {
        console.log(`Failed writing file: ${e.toString()}`)
      }
      
      if (!dataObj) {
        dataObj = new Blob(['some file data'], { type: 'text/plain' })
      }
      
      fileWriter.write(dataObj)
    })
    
  }
  
}


app.initialize()
