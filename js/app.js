    var router = new Router($);
    var viewStack = new ViewStack();


    $('button').bind('click',function(){

        var href=$(this).data('href');
        if(href) router.go(href);
    });


    function createUrlSection(o){
        var id     = o.id || 'urlSection';
        var url    = o.url || false;
        var params = o.params || {} ;
        var callback    = (typeof o.callback == 'function')? o.callback : false;
        if(!url) return;

        var data = $.post(url,params, function(data){
            $('#'+id+' section').html(data);
            if(typeof callback == 'function') callback(id,data);

        });

    }


     //vistas
    var portada = new ViewBase($('#portada'));
    var ajustes = new ViewBase($('#ajustes'));
    var about = false;


    //rutas
    router.add(/portada/,function(){

        viewStack.showView(portada, true, function(){

        });
    })
    router.add(/menu/,function(){

        viewStack.showMenu();
    })
    router.add(/ajustes/,function(){
        viewStack.showView(ajustes, false, function(){

        });
    })

    router.add(/about/,function(){

        createUrlSection({
            url : '/test.html',
            callback: function(id){
                console.log(['id',id])
                about = about || new ViewBase($('#'+id));
                viewStack.showView(about, false, function(){})}
        });

    })




    //inicializar
    viewStack.showView(portada, true, function(){});
