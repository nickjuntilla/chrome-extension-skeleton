var bkg = chrome.extension.getBackgroundPage();
var clickHandler = function (e) {
  var url = "https://en.wikipedia.org/wiki/";
  if(e.selectionText) {
    url += ""+ encodeURI(e.selectionText);
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {searchURL: url}, function(response) {
    });
  });
};

chrome.contextMenus.create({
  "title": "Wikipedia",
  "contexts": ["selection", "link"],
  "onclick" : clickHandler
});
