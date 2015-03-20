/*
 * Capa de vistas 
 */

function ViewBase ($el){
  this.id  = $el.attr('id');
  this.$el = $el;
    
  /**
   * Replaces the contents of $el with the contents of another element
   * @param element
   */
  this.replaceContent = function(element) {
    this.$el.children().remove();
    this.$el.append(element.children());
  };
    
  
  this.defer = function(f,time) {
    var time = time ||  50;
    setTimeout(f, time);
  };
  
  this.deferTransition = function(f, el) {
    (el ? el : this.$el).one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', f); //The .one() method is identical to .on(), except that the handler is unbound after its first invocation.
  };
  
  this.setHPos = function setHPos(pos) {
    this.$el.removeClass('hleft hmid hright');
    this.$el.addClass(pos);
  };
  
  this.setZPos = function setZPos(pos) {
    this.$el.removeClass('ztop zmid');
    this.$el.addClass(pos);
  };
  
  this.hasHTransition = function hasHTransition() {
    return this.$el.hasClass('htransition');
  },
  this.setHTransition =function setHTransition(transition) {
    if (transition) {
      this.$el.addClass('htransition');
    } else {
      this.$el.removeClass('htransition');
    }
  };
  
  this.isVisible = function isVisible() {
    return !this.hasClass('hidden');
  };
  
  this.setVisible =  function setVisible(visible) {
    if (visible) {
      this.$el.removeClass('hidden');
    } else {
      this.$el.addClass('hidden');
    }
  },
  this.hasClass = function hasClass(className) {
    return this.$el.hasClass(className);
  };

  this.openUrl = function openUrl(evt) {
    var target, activity, href, windowName;
    
   
    target = evt.target;
    href = target.dataset.href;
    windowName = target.id;
    
      activity = new MozActivity({
        // Ask for the "pick" activity
        name: "view",

        // Provide the data required by the filters of the activity
        data: {
          type: "url",
          url : href
        }
      });

      activity.onerror = function onerror() {
       
      };

   
  }
}
