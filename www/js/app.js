const app = {
  
  // Init app
  initialize: () => {
    app.bindEvents()
  },
  
  // Bind event listeners
  bindEvents: () => {
    document.addEventListener('deviceready', app.onDeviceReady, false)
    $('#takePhoto').click(() => app.getPhoto('CAMERA'))
    $('#choosePhoto').click(() => app.getPhoto('LIBRARY'))
    $('#loadPhoto').click(app.loadPhoto)
    $('#savePhoto').click(app.savePhoto)
  },
  
  // Device ready
  onDeviceReady: () => {
    console.log('Device Ready!')
  },
  
  getPhoto: (type) => {
    console.log(`getPhoto called, type=${type}`)
    let options = {
      quality:         50,
      destinationType: Camera.DestinationType.FILE_URI
    }
    if (type === 'CAMERA')
      options.sourceType = Camera.PictureSourceType.CAMERA
    else if (type === 'LIBRARY')
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY
    
    navigator.camera.getPicture(onSuccess, onFail, options)
    
    function onSuccess(imageURI) {
      let img = `<img src="${imageURI}" alt="" id="image" class="img-fluid mt-2"/>`
      
      $('#photoContainer').html(img)
      
      app.camanScripts()
  
      $('#loadPhotoButtons').children().removeClass('col-12').addClass('col-4')
      $('#filtersContainer').removeClass('hidden-xs-up')
    }
    
    function onFail(message) {
      console.log('Failed: ' + message)
    }
    
  },
  
  camanScripts: () => {
    
    
    $(function () {
      Caman('#image', function () {
        this.render()
      })
      
      let filters = $('#filters').children()
      
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
    
  },
  
  loadPhoto: () => {
    let img = `<img src="../img/1.jpg" alt="" id="image" class="img-fluid mt-2"/>`
    $('#photoContainer').html(img)
    app.camanScripts()
    
    $('#loadPhotoButtons').children().removeClass('col-12').addClass('col-4')
    $('#filtersContainer').removeClass('hidden-xs-up')
    $('#savePhotoContainer').removeClass('hidden-xs-up')
  
  },
  
  savePhoto: () => {
  
  }
  
}


app.initialize()
