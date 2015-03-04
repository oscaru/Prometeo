

//Produce un delay al llamar una funcion
//use: (throttle (alert, 'mi timer', 2000))('mostrar esto')
function throttle(f, timerName, delay){
    var timerName = timerName || 'throttle';
    window['timer_'+ timerName] = window['timer_'+ timerName] || null;
    return function(){
        var context = this, args = arguments;
        clearTimeout(window['timer_'+ timerName]);
        window['timer_'+ timerName] = window.setTimeout(function(){
            f.apply(context, args);
        },
        delay || 500);
    };
}
