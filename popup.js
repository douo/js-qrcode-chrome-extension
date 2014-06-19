!function($){
    var size = 256;
    var option = {
	size: size,
	ecLevel: 'M'
    }
    $("canvas").width(size);
    $("canvas").height(size);
    chrome.tabs.query({
	currentWindow: true,
	active: true
    },
		      function(tab){
			  option.text = tab[0].url;
			  $("canvas").qrcode(option);
		      });
    function clearCanvas(){
	var canvas = $("canvas")[0];
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function generete(text){
	option.text = text;
	clearCanvas();
	$("canvas").qrcode(option);
    }

    function showInput(){
	$(".result").hide();
	$(".btns").show();
	$(".text").height(225);
	$(".input").width(256);
	$(".input").height($(".text").height()+$(".btns").height());
    }
    function showCode(){
	$(".btns").hide();
	$(".text").height(18);
	$(".input").height($(".text").height());
	$(".result").show();
    }

    function init(){
	$(".text").focus(showInput);
	$("#cancel").click(showCode);
	$("#ok").click(function(){
	    generete($(".text").val());
	    showCode();
	})
    }

    $(init);

}(jQuery);

