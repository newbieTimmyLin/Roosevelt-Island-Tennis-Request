// background.js


let activeTabId = 0;

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        activeTabId = tab.tabId;
        // Test if the tab is on the site we wish to inject the specific domain
        if (/^https:\/\/rioc\.civicpermits\.com\/Permit/.test(current_tab_info.url)) {
            console.log('I am here!!!')
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('I injected it'))
            $(function() {
                console.log( "ready!" );
                getAllTennisCourtId();
            });
            
        //     chrome.tabs.insertCSS(null, {file: './myStyle.css'});
        //     chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('I injected it'))
        }
    })
});

function getAllTennisCourtId() {
    var courtIds = document.getElementById('header');
    // var courtIds = Array.from(document.getElementById('site').options).map(e => e.value);
    console.log(courtIds);
}