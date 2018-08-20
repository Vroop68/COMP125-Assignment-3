// jquery way

$.ready(function() {

    $("#clickMeButton").click(()=>{
        // do something
    });
});


// Vanilla JavaScript way

(function(){

    document.getElementById("clickMeButton").addEventListener("click", ()=>{
        // do something
    });

})();

