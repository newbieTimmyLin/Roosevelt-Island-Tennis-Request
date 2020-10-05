// foreground.js

// Create button property
const first = document.createElement('button');
first.innerText = "SET DATA";
first.id = "first";

// Add buttons craeted above to the desired page
document.querySelector('body').appendChild(first);

first.addEventListener('click', () => {
    // sync accross different device
    // chrome.storage.sync
    chrome.storage.local.set({"password": "123"});
    console.log("I SET DATA!!!");

    var x = document.getElementById('site');
    console.log(x)

    for (i = 0; i < x.length; i++) {
        console.log(x.options[i].value);
        console.log(x.options[i].text);
        console.log('---------------------')
    }

    console.log($('#site').trigger('change'));
})

const site = document.getElementById('site');
site.addEventListener('click', () => {
    console.log("I CHANGE");
})
