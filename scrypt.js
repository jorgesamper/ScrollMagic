// Crea una instancia de ScrollMagic Controller
var controller = new ScrollMagic.Controller();

// Crea una escena
var scene = new ScrollMagic.Scene({
  triggerElement: '.box', // Elemento que dispara la animación
  triggerHook: 0.8, // A qué punto de la ventana debe ocurrir la animación
  reverse: false // Si la animación debería revertirse cuando se haga scroll hacia arriba
})
.setClassToggle('.box', 'fade-in') // Añade o elimina una clase cuando se active la escena
.addTo(controller); // Agrega la escena al controller



var BackgroundTitleScrollAnimation = (function() {
  
    // vars
    var smController = new ScrollMagic.Controller();
    
    // selector
    var backgroundParts = $('.background__part'),
        backgroundTitles = $('.background__title');
    
    
    _initScenes();
    
    
    ///////////// LOGIC
    
    function _initScenes() {
      
        $('.js-trigger').each(function(index, item) {
          
          var tl = _getTimelineInstance();
          
          var scene = new ScrollMagic.Scene({
            triggerElement: item
          })
          .setTween(tl)
          .addTo(smController);
          
          _bindSceneEvents(scene);
          
        });
      
    }
    
    function _bindSceneEvents(scene) {
      scene.on("start", function (event) {
        var target = $(event.target.triggerElement());
        
        _setSectionTitle(target, event.scrollDirection);
      });
    }
    
    function _getTimelineInstance() {
      return new TimelineLite()
        .to(backgroundParts[0], 0.25, { x: '-16px', opacity: 0 })
        .to(backgroundParts[1], 0.25, { x: '16px', opacity: 0 }, '-=0.25')
        .to(backgroundParts[0], 0.25, { x: '0px', opacity: 1 })
        .to(backgroundParts[1], 0.25, { x: '0px', opacity: 1 }, '-=0.25');
    }
    
    function _setSectionTitle(sectionTarget, direction) {
      var sectionSelector = direction !== 'REVERSE' 
            ? sectionTarget 
            : sectionTarget.prev();
      
      var title = sectionSelector.data('title');
      
      setTimeout(function() {
        backgroundTitles.text(title);
      }, 260);
    }
    
  })();