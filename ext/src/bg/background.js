var portt;
chrome.runtime.onConnect.addListener(function (port) {
  portt = port;
});

//Receive messages from browser-action-popup
chrome.runtime.onMessage.addListener(function (msg) {
  portt.postMessage(msg);
  return true;
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab.url == "https://turnip.exchange/islands") {
      chrome.browserAction.enable();
    } else {
      chrome.browserAction.disable();
    }
  });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url == "https://turnip.exchange/islands") {
    chrome.browserAction.enable();
  } else {
    chrome.browserAction.disable();
  }
});