/**
 * jQuery slideshow plugin
 * - Simple slideshow plugin with fadeout / fadein effect
 * 
 * Author: Martin Ejstrup ( ﾉ^ω^)ﾉﾟ
 * 
 * @todo clean up code 
 * @todo add settings.cycle option ?
 */
(function ($) {
  $.fn.slideshow = function(options) {
    // Default settings.
    var settings = $.extend({
      showPager: true,
      animSpeed: 500,
      animDelay: 5000,
      cycle: true
    }, options );
    var nextSlideInterval, itemContainer, container, pager;
    
    return this.each(function() {
      container = $(this);
      _slideshowInit(container);
      itemContainer = container.find(".slideshow-items");
      if (settings.cycle == true) _slideShowCycle();
    });
    
    function _slideshowInit(container) {
      if (!container.hasClass("slideshow")) container.addClass("slideshow");
      container.children().hide();
      container.find("> :first-child").addClass("active").show();
      container.children().wrapAll("<div class='slideshow-items'/>");
      
      if (settings.showPager == true) {
        _slideshowPagination(container);
        pager = container.find(".slideshow-pager");
        pager.find("li").bind("click", _slidePagerClickHandler);
      }
      
    }
    
    function _slideshowPagination() {
      var nav = $("<ul class='slideshow-pager'>");
      var itemContainer = container.find(".slideshow-items");
      var childrenSize = itemContainer.children().size();
      for (i = 0; i < childrenSize; i++) {
        nav.append("<li><a href='#'></a></li>");
      }
      nav.find("li:first").addClass("active");
      container.append(nav);
    }
    
    function _slidePagerClickHandler(e) {
      e.preventDefault();
      _slideNavigateTo($(this).index());
    }
    
    function _slideNavigateTo(index) {
      var active_item = itemContainer.find(".active");
      var next_item = itemContainer.find("> :eq("+(index)+")");
      
      // don't do anything when navigating to current item
      if (active_item.index() == index) return;
      
      active_item.removeClass("active").fadeOut(settings.animSpeed);
      next_item.addClass("active").fadeIn(settings.animSpeed);
      
      // update pager
      if (settings.showPager == true) {
        pager.find("li").removeClass("active");
        pager.find("li:eq("+index+")").addClass("active");
      }
      
      // reset cycle
      if (settings.cycle == true) _slideShowCycle();
    }
    
    function _slideNavigateToNext() {
      var next_item = itemContainer.find("> :first");
      if (itemContainer.find(".active").next().length > 0) next_item = itemContainer.find(".active").next();
      _slideNavigateTo(next_item.index());
    }
    
    function _slideShowCycle() {
      //_slideNavigateToNext();
      
      clearInterval(nextSlideInterval);
      nextSlideInterval = setInterval(_slideNavigateToNext, settings.animDelay);
     
    }
    
  };
}(jQuery));
