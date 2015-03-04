/*
 * 
 *basado : http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 * uso : 
 * Router
        .add(/about/, function() {
        console.log('about');
    })
        .add(/products\/(.*)\/edit\/(.*)/, function() {
        console.log('products', arguments);
        })
    .add(function() {
        console.log('default');
    })
    .go('/products/12/edit/22')
 */

function Router ($){
    var routes  = []
        ,_$ = $ || false
        ,self = this
    ;
            
    // the current URL
    function getFragment() {
        var fragment = window.location.hash;
        return clearSlashes(fragment);
    }
    
    function clearSlashes (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
    
    //add routes
    this.add = function(re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        routes.push({ re: re, handler: handler});
        return this;
    };
    
    this.remove = function(param) {
        for(var i=0, r; i<routes.length, r = routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                routes.splice(i, 1);
                return this;
            }
        }
        return this;
    };
    
    this.flush = function() {
        routes = [];
        return this;
    };
    
    
    /**
     * 
     * Match devuelve un array  con el  primer termino  la propia consulta y las otras concurrencias : ejemplo 
     * '/products/12/edit/22'.match(/products\/(.*)\/edit\/(.*)/)   ; devuelve : ["products/12/edit/22", "12", "22"]
     */
    
    this.check = function(f) {
        var fragment = f || getFragment();
        var routesLength = routes.length;
        for(var i=0; i<routesLength; i++) {
            var match = fragment.match(routes[i].re);
            if(match) {
                match.shift();
                routes[i].handler.apply({}, match);
            return this;
        }
    }
    return this;
    }
    
    this.go =  function(path) {
        path = path ? path : '';
        window.location.hash = path;
        
        return this;
    }
    
    this._routes  = routes;
    
    if(_$) $(window).bind('hashchange', function(e){ self.check();  });
    
};


