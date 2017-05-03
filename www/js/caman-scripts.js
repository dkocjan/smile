$(function () {
  Caman('#image', '../img/4.jpg', function () {
    this.render()
  })
  
  let filters = $('#filters button')
  //    originalCanvas = $('#canvas'),
  //    photo = $('#photo');
  
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
    
    Caman('#image', '../img/1.jpg', function () {
      // If such an effect exists, use it:
      if (effect in this) {
        this.revert()
        this[ effect ]()
        this.render()
      }
    })
  })
})
