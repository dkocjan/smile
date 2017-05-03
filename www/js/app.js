const app = {
  
  // Init app
  initialize: () => {
    app.bindEvents()
  },
  
  // Bind event listeners
  bindEvents: () => {
    document.addEventListener('deviceready', app.onDeviceReady, false)
    document.getElementById('takePhoto').addEventListener('click', app.takePhoto, false)
    document.getElementById('choosePhoto').addEventListener('click', app.choosePhoto, false)
  },
  
  // Device ready
  onDeviceReady: () => {
    console.log('Device Ready!')
  },
  
  takePhoto: () => {
    
    let options = {
      sourceType:      Camera.PictureSourceType.CAMERA,
      targetWidth:     400,
      targetHeight:    400,
      quality:         50,
      destinationType: Camera.DestinationType.FILE_URI
    }
    
    navigator.camera.getPicture(onTakeSuccess, onTakeFail, options)
    
    function onTakeSuccess(imageURI) {
      let img = `<img src="${imageURI}" alt="" id="image" class="img-fluid mt-2"/>`
      
      $('#photoContainer').html(img)
    }
    
    function onTakeFail(message) {
      console.log('Failed: ' + message)
    }
    
  },
  
  choosePhoto: () => {
    
    let options = {
      sourceType:      Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth:     400,
      targetHeight:    400,
      quality:         50,
      destinationType: Camera.DestinationType.FILE_URI
    }
    
    navigator.camera.getPicture(onGetSuccess, onGetFail, options)
    
    function onGetSuccess(imageURI) {
      let img = `<img src="${imageURI}" alt="" id="image" class="img-fluid mt-2"/>`
      
      $('#photoContainer').html(img)
  
      $(function () {
        Caman('#image', function () {
          this.resize()render()
        })
    
        let filters = $('#filters button')
    
        filters.click(function (e) {
      
          e.preventDefault()
      
          let f = $(this)
      
          if (f.is('.active')) {
            // Apply filters only once
            return false
          }
      
          filters.removeClass('active')
          f.addClass('active')
          // Listen for clicks on the filters
          let effect = $.trim(f[ 0 ].id)
      
          console.log(effect)
      
          Caman('#image', function () {
            // If such an effect exists, use it:
            if (effect in this) {
              this.revert()
              this[ effect ]()
              this.render()
            }
          })
        })
      })
  
  
    }
    
    function onGetFail(message) {
      console.log('Failed: ' + message)
    }
    
  }
  
}


app.initialize()
