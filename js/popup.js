chrome.commands.onCommand.addListener((command) => {
    if (command === 'set_text') {
        var text = getTextFromClipboard();
        chrome.storage.sync.set({ "jwt": text }, function () {
            window.close();
        });
    }

    if (command === 'get_text') {
        chrome.storage.sync.get(/* String or Array */["jwt"], function (items) {
            copyToClipboard(items.jwt);
            window.close();
        });
    }
});