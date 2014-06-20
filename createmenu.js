// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    var data = "";
    if(info.menuItemId == "jsqr-page"){
	data = info.pageUrl;
    }else if(info.menuItemId == "jsqr-selection"){
	data = info.selectionText;
    }else if(info.menuItemId == "jsqr-link"){
	data = info.linkUrl;
    }
    console.log("data:"+data);
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["page","selection","link"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "jsqr-" + context});
    console.log("'" + context + "' item:" + id);
  }
});
