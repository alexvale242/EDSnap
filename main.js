
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "triggerMain") {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createPanel();
            });
        } else {
            createPanel();
        }        
    }
});