// The onClicked callback function.
function onClickHandler(info, tab) {
    var data = "";
    if(info.menuItemId == "jsqr-page"){
	data = info.pageUrl;
    }else if(info.menuItemId == "jsqr-selection"){
	data = info.selectionText;
    }else if(info.menuItemId == "jsqr-link"){
	data = info.linkUrl;
    }
    chrome.tabs.executeScript(tab.id, { "code": "Jsqr"},function(a){
	//根据 Jsqr 是否为 undefined 来检测是否已加载过 scripts
	if(a[0] && a[0].generateInject){
	    chrome.tabs.executeScript(tab.id, { "code": "Jsqr.generateInject(\""+data+"\")"});
	}else{// 依次加载各个 script
	    chrome.tabs.executeScript(tab.id, { "file": "jquery.min.js"},function(){
		chrome.tabs.executeScript(tab.id, { "file": "qrcode.js"},function(){
		    chrome.tabs.executeScript(tab.id, { "file": "jquery.qrcode.js"},function(){
			chrome.tabs.executeScript(tab.id, { "file": "jsqr.js"},function(){
			    chrome.tabs.executeScript(tab.id, { "code": "Jsqr.generateInject(\""+data+"\")"});
			});
		    });
		});
	    });
	}
    });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    // Create one test item for each context type.
    var contexts = ["page","selection","link"];
    var texts = ["当前页面","选择文本","选择链接"];
    for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = "为"+texts[i]+"生成二维码";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                             "id": "jsqr-" + context});
    }
});
