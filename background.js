chrome.action.onClicked.addListener((tab) => {
    // Ensure the tab is valid and send a message to the content script
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { action: "triggerMain" });
    }
});