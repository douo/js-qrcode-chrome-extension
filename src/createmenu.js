// The onClicked callback function.
function onClickHandler(info, tab) {
    var data = "";
    if(info.menuItemId == "jsqr-page"){
	data = info.pageUrl;
    }else if(info.menuItemId == "jsqr-selection"){
	data = info.selectionText;
    }else if(info.menuItemId == "jsqr-link"){
	data = info.linkUrl;
    }else if(info.menuItemId == "jsqr-image"){
	data = info.srcUrl;
    }
    console.log(info);
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
    var contexts = ["page","selection","link","image"];
    var texts = [chrome.i18n.getMessage("context_menu_page"),
		 chrome.i18n.getMessage("context_menu_selection"),
		 chrome.i18n.getMessage("context_menu_link"),
		 chrome.i18n.getMessage("context_menu_image"),];
    for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = chrome.i18n.getMessage("context_menu_placeholder",texts[i]);
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                             "id": "jsqr-" + context});
    }
});
