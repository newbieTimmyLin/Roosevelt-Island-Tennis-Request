// HTML tags constant
const LOCATION_REQUEST = '#site';
const ADD_FACILITY = '#addFacilitySet';
const TENNIS_COURT_CHECKBOX = '#facilities';

// Timing constant
const START_HR = 7;
const END_HR = 19;
const MIN = ['00', '30'];

// The tennis hour is 7:30 ~ 20:30
function buildTimeSlots() {
    
    var timeSlots = [];

    var j = 1;
    for (i = START_HR; i <= END_HR; ++i) {
        for (; j < MIN.length; ++j) {
            var timeSlot = {startHr: i.toString(), startMin: MIN[j], endHr: (i + 1).toString(), endMin: MIN[j]};
            timeSlots.push(timeSlot);
        }
        j = 0;
    }

    return timeSlots;
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // console.log(msg)
    // First, validate the message's structure.
    if ((msg.from === 'popup')) {
        console.log("Got a message from popup");

        var inputCourtNumber = Number(msg.courtNumber)
        console.log("Court number the user pick is: " + inputCourtNumber);
        
        // Get the court that the client selected
        var allSites = $(LOCATION_REQUEST)[0];
        var tennisRegex = /Tennis/;
        var tennisSites = [];
        for (i = 0; i < allSites.length; i++) {
            if (tennisRegex.test(allSites.options[i].text)) {
                tennisSites.push({value: allSites.options[i].value, text: allSites.options[i].text});
            }
        }
        var pickedTennisSite = tennisSites[inputCourtNumber - 1];
        console.log("The customer pick: " + JSON.stringify(pickedTennisSite));        
        $('#site').val(pickedTennisSite.value);
        // https://stackoverflow.com/questions/25094387/chrome-extension-trigger-events-on-content-scripts-using-jquery
        var event = new CustomEvent('change');
        $('#site')[0].dispatchEvent(event); 
        
        var date = msg.date;
        addFacilities(date);

    }
});

async function addFacilities(date) {

    var timeSlots = buildTimeSlots();
    // timeSlots = timeSlots.slice(0, 18);
    // var timeSlots = [{startHr: "8", startMin: "00", endHr: "9", endMin: "00"},
    //                  {startHr: "9", startMin: "00", endHr: "10", endMin: "00"}]
    console.log(timeSlots);
    // var tempSlot = timeSlots[21];

    for (slot of timeSlots) {
        addFacility(date, slot);
        await sleep(1000);
        // break;
    }
    
    console.log(" I AM DONE ADDING")
    await sleep(500)
    $('#addedFacilities').find('h3').addClass('expanded');
    $('#addedFacilities .details').show();
    // console.log("expanding......")
    // $('#addedFacilities').find('h3').addClass('expanded')
    // $('#addedFacilities .details').show()

}

async function addFacility(date, slot) {

    console.log(slot);

    $(ADD_FACILITY).click();

    // Add the date
    $('#addFacility input.manualDate').val(date);

    var originalAddedFacilities = $('#addedFacilities').length;
    console.log(originalAddedFacilities)

    $('[name="startHour"]').val(slot.startHr);
    $('[name="startMinute"]').val(slot.startMin);
    $('[name="endHour"]').val(slot.endHr);
    $('[name="endMinute"]').val(slot.endMin);

    await sleep(120);
    console.log($('#03726dde-96c4-45e4-a265-363635e5f074'));
    $('.facilityList li').find('input').prop('checked', true);
    $('#addFacility div.controlArea').find('button')[0].click();

    await sleep(150);
    var afterAddedFacilities = $('#addedFacilities').length;
    if (originalAddedFacilities == afterAddedFacilities) {
        console.log('Start time ' + slot.startHr + ' ' + slot.startMin + ' is not available');
        $('#addFacility div.controlArea').find('button')[1].click();
        return;
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function findTennisCourt() {
    var facilitiesLength = $('.facilityList li').find('input').length;
    console.log('length is' + facilitiesLength);
    if (facilitiesLength == 1) {
        return true;
    } else {
        setTimeout(findTennisCourt, 50);
    }
}

