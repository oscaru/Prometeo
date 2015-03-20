    var router = new Router($);
    var viewStack = new ViewStack();


    $('button').bind('click',function(){

        var href=$(this).data('href');
        if(href) router.go(href);
    });


    


     //vistas
    var portada = new ViewBase($('#portada'));
    var ajustes = new ViewBase($('#ajustes'));
    var about   = new ViewBase($('#urlSection'));


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
                console.log('ajustes');
        });
    })

    router.add(/about/,function(){
        viewStack.loadContent('pages/page1.html',{},about);
        
    })




    //inicializar
    viewStack.showView(portada, true, function(){});
