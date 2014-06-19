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
	// utf8 支持
	option.text = String(text).replace(
		/[\u0080-\u07ff]/g,
		function(c) {
			var cc = c.charCodeAt(0);
			return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
		}
	).replace(
		/[\u0800-\uffff]/g,
		function(c) {
			var cc = c.charCodeAt(0);
			return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3f, 0x80 | cc & 0x3f);
		}
	);
	clearCanvas();
	$("canvas").qrcode(option);
    }
    var status = "init";
    function showInput(){
	if(status != "input"){
	    $(".result").hide();
	    $(".btns").show();
	    $(".text").height(225);
	    $(".input").width(256);
	    $(".input").height($(".text").height()+$(".btns").height());
	    
	    status = "input";
	}
    }
    function showCode(){
	if(status != "code"){
	    $(".btns").hide();
	    $(".text").height(18);
	    $(".input").height($(".text").height());
	    $(".result").show();
	    
	    status = "code";
	}
    }

    function init(){
	$(".text").click(showInput);
	/* 
	   有可能在某种情况下，页面弹出时，text 会立刻获得焦点
	   比如 Mac ，但给 canvas 加了 tabindex 后就可以避免
	*/
	setTimeout(function(){$(".text").focus(showInput)},50);
	$("#cancel").click(showCode);
	$("#ok").click(function(){
	    generete($(".text").val());
	    showCode();
	})
    }

    $(init);

}(jQuery);

