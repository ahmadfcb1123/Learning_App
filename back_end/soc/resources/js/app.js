require('./bootstrap');
window.Echo.channel("alert")
.listen("alert",(e)=>{
    //alert(e.message)
    return e;
})