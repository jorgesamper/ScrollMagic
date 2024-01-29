var BackgroundTitleScrollAnimation = (function() {
  
    // Variables
    var smController = new ScrollMagic.Controller();
    var backgroundParts = $('.background__part');
    var backgroundTitles = $('.background__title');
    
    
    // Inicialización de las escenas
    _initScenes();
    
    // Lógica de las escenas
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
    
    // Eventos de las escenas
    function _bindSceneEvents(scene) {
      scene.on("start", function (event) {
        var target = $(event.target.triggerElement());
        
        _setSectionTitle(target, event.scrollDirection);
      });
    }
    
    // Obtener instancia de la línea de tiempo
    function _getTimelineInstance() {
      return new TimelineLite()
        .to(backgroundParts[0], 0.25, { x: '-16px', opacity: 0 })
        .to(backgroundParts[1], 0.25, { x: '16px', opacity: 0 }, '-=0.25')
        .to(backgroundParts[0], 0.25, { x: '0px', opacity: 1 })
        .to(backgroundParts[1], 0.25, { x: '0px', opacity: 1 }, '-=0.25');
    }
    
    // Establecer el título de la sección
    function _setSectionTitle(sectionTarget, direction) {
      var sectionSelector = direction !== 'REVERSE' 
            ? sectionTarget 
            : sectionTarget.prev();
      
      var title = sectionSelector.data('title');
      
      var tl = new TimelineLite();
      tl.to(backgroundTitles[0], 0.5, { text: title });
      
      // Reiniciar la animación de los títulos de fondo
      tl.restart();
    }
    
})();
