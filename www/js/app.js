const app = {
  
  // Splashscreen
  showSplash: () => {
    navigator.splashscreen.show()
    setTimeout(() => {
      navigator.splashscreen.hide()
    }, 2500)
  },
  
  // Init app
  initialize: () => {
    app.showSplash()
    app.bindEvents()
    app.camanFilters()
  },
  
  // Bind event listeners
  bindEvents: () => {
    document.addEventListener('deviceready', app.onDeviceReady, false)
    $('#takePhoto').click(() => app.getPhoto('CAMERA'))
    $('#choosePhoto').click(() => app.getPhoto('LIBRARY'))
    $('#loadPhoto').click(app.loadPhoto)
    $('#savePhoto').click(app.savePhoto)
    $('#sharePhoto').click(app.sharePhoto)
    $('#rotateRight').click(() => app.rotatePhoto('right'))
    $('#rotateLeft').click(() => app.rotatePhoto('left'))
  },
  
  // Device ready
  onDeviceReady: () => {
    console.log('Device Ready!')
  },
  
  config: {
    // The better quality, the longer render time
    quality:       100,
    currentFilter: ''
  },
  
  getPhoto: (type) => {
    
    // Options for camera
    let options = {
      quality:         app.config.quality,
      destinationType: Camera.DestinationType.FILE_URI
    }
    
    if (type === 'CAMERA') {
      options.sourceType = Camera.PictureSourceType.CAMERA
    }
    else if (type === 'LIBRARY') {
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY
    }
    
    navigator.camera.getPicture(onSuccess, onFail, options)
    
    function onSuccess(imageURI) {
      let img = `<img
        src="${imageURI}"
        id="image"
        class="img-fluid mt-2"
      />`
      
      $('#photoContainer').html(img)
      
      app.camanRenderImage()
      app.showSaveAndShareButtons()
      
    }
    
    function onFail(message) {
      console.log('Failed: ' + message)
    }
    
  },
  
  camanRenderImage: () => {
    Caman('#image', function () {
      this.resize({ width: 600 }) // The bigger width, the longer render time
      this.render()
    })
  },
  
  camanFilters: () => {
    
    let filters = $('#filters').children()
    
    filters.click(function (e) {
      
      e.preventDefault()
      
      let f = $(this)
      
      // Apply filters only once
      if (f.is('.active')) {
        return false
      }
      
      filters.removeClass('active')
      f.addClass('active')
      
      // Listen for clicks on the filters
      let effect = $.trim(f[ 0 ].id)
      
      console.log(effect)
      app.config.currentFilter = effect
      
      Caman('#image', function () {
        // If such an effect exists, use it:
        if (effect in this) {
          this.revert()
          this[ effect ]()
          this.render()
        }
      })
      
    })
    
  },
  
  showSaveAndShareButtons: () => {
    $('#loadPhotoButtons').children().removeClass('col-12').addClass('col-4')
    $('#filtersContainer').removeClass('hidden-xs-up')
    $('#savePhotoContainer').removeClass('hidden-xs-up')
  },
  
  loadPhoto: () => {
    let img = `<img
        src="../img/1.jpg"
        id="image"
        class="img-fluid mt-2"
      />`
    
    $('#photoContainer').html(img)
    
    app.camanRenderImage()
    app.showSaveAndShareButtons()
    
  },
  
  rotatePhoto: (dir) => {
    Caman('#image', function () {
      let deg
      if (dir === 'right') {
        deg = 90
      }
      else if (dir === 'left') {
        deg = -90
      }
      
      this.rotate(deg)
      this.render()
      
    })
  },
  
  dateFormat: (date) => {
    
    addZero = (i) => {
      if (i < 10) {
        i = `0${i}`
      }
      return i
    }
    
    let months     = [
          'sty',
          'lut',
          'mar',
          'kwi',
          'maj',
          'cze',
          'lip',
          'sie',
          'wrz',
          'paz',
          'lis',
          'gru'
        ],
        day        = date.getDate(),
        monthIndex = date.getMonth(),
        year       = date.getFullYear(),
        hours      = addZero(date.getHours()),
        minutes    = addZero(date.getMinutes()),
        seconds    = addZero(date.getSeconds())
    
    return `${day}-${months[ monthIndex ]}-${year}-${hours}:${minutes}:${seconds}`
    
  },
  
  savePhoto: () => {
    let date = new Date(),
        id   = app.dateFormat(date)
    
    console.log(id)
    
    Caman('#image', function () {
      
      this.render(() => {
        
        let image  = this.toBase64()
        let params = {
          data:         image,
          prefix:       'smile_',
          format:       'JPG',
          quality:      '80',
          mediaScanner: true
        }
        
        let onSaveSuccess = (filePath) => console.log(`File saved on ${filePath}`)
        let onSaveError   = (msg) => console.log(msg)
        
        window.imageSaver.saveBase64Image(params, onSaveSuccess, onSaveError)
        
      })
      
    })
  },
  
  sharePhoto: () => {
    Caman('#image', function () {
      
      this.render(() => {
        let image = this.toBase64()
        window.plugins.socialsharing.share(null, 'Android filename', `${image}`, null)
      })
      
    })
  }
  
}


app.initialize()
