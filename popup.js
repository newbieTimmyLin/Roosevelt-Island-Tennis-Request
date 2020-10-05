// When pop up content is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    var submitButton = document.getElementById("submit");
    submitButton.addEventListener('click', () => {
        var courtNumber = document.getElementById('inputCourt').value;
        console.log('The court you chose is: ' + courtNumber);
        // ...query for the active tab...
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            // ...and send a request for the DOM info...
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'formInfo', courtNumber: courtNumber, date: '10/05/2020'}
                // ...also specifying a callback to be called 
                //    from the receiving end (content script).
            );
        });
    });
});
