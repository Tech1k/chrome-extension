function Background () {
    chrome.runtime.onInstalled.addListener(function (details) {
        // only run the following section on install
        if (details.reason !== "install") {
            return;
        }

        chrome.tabs.create({
            url: "https://www.byndsearch.com/extension/thanks"
        });
    });
};

var background = new Background();

chrome.omnibox.onInputEntered.addListener(function (text) {
    chrome.tabs.query({
        'currentWindow': true,
        'active'       : true
    }, function (tabs) {
        chrome.tabs.update(tabs[0].id, {
            url: "https://www.byndsearch.com/web?q=" + encodeURIComponent(text) + "&client=beyondsearch-chrome"
        });
    });
});

chrome.contextMenus.create({
    title   : 'Search BeyondSearch for "%s"',
    contexts: ["selection"],
    onclick : function (info) {
        var queryText = info.selectionText;
        chrome.tabs.create({
            url: "https://www.byndsearch.com/web?q=" + queryText + "&client=beyondsearch-chrome"
        });
    }
});

chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.tabs.create({url: "https://www.byndsearch.com/web?client=beyondsearch-chrome"});
});
