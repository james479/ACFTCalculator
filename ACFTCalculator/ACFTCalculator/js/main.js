import { deadLiftTable, standingPowerThrowTable, pushUpTable, sprintDragCarryTable, legTuckTable, runTable } from './EventTables.js';

//convert seconds to minutes and seconds
function minutesAndSecondsDisplay(time) {
    let outputString = '';
    outputString += (Math.floor(time / 60)).toString() + ':';
    outputString += Math.round(((time % 60 * .01).toFixed(2) * 100)).toString();
    return outputString;
}

function convertMinutesAndSeconds(time) {
    let minutes = (Math.floor(time / 60));
    let seconds = ((time % 60 * .01).toFixed(2));
    return parseFloat(minutes) + parseFloat(seconds);
}

//reverse number in range slider
function reverseNumber(min, max, num) {
    return max + min - num;
}


//getting deadlift score
function getDeadliftScore(value) {
    return deadLiftTable[value];
}

 //getting a power throw value that is on the table
function getPowerThrowScore(value) {
    while (!standingPowerThrowTable.hasOwnProperty(value)) {
        value = (value - 0.1).toFixed(1);
    }
    return standingPowerThrowTable[value];
}

//geting pushup score 
function getPushUpScore(value) {
    while (!pushUpTable.hasOwnProperty(value)) {
        value = value - 1;
    }
    return pushUpTable[value];
}

//getting sprint drag carry score
function getSprintDragCarryScore(value) {
    while (!sprintDragCarryTable.hasOwnProperty(value)) {
        value = parseFloat((value + 0.01).toFixed(2));
    }
    return sprintDragCarryTable[value];
}

//getting leg tuck score
function getLegTuckScore(value) {
    return legTuckTable[value];
}

//getting 2 mile run score 
function getRunScore(value) {
    while (!runTable.hasOwnProperty(value)) {
        value = parseFloat((value + 0.01).toFixed(2));
    }
    return runTable[value];
} 

//object for scores in each event
const eventScore = {
    deadliftScore: 0,
    standingThrowScore: 0,
    pushupScore: 0,
    legTuckScore: 0,
    dragCarryScore: 0,
    runScore: 0
}

function getTotalScore() {
    let total = 0;
    for (let event in eventScore) {
        total += eventScore[event];
    }
    return total;
}

function getStandards() {
    let radioButtons = document.getElementsByName('group-radio-standards');
    if (radioButtons[0].checked) {
        return 60;
    }
    else if (radioButtons[1].checked) {
        return 65;
    }
    else {
        return 70;
    }
}


function passed(standard) {
    let pass = true;
    for (event in eventScore) {
        if (eventScore[event] < standard) {
            pass = false;
            break;
        }
    }
    return pass;
}

//populate pass/fail label
function populatePassFailLabel() {
    let passOrFail = document.getElementById('result-label');
    if (passed(getStandards())) {
        passOrFail.textContent = 'PASS'
    }
    else {
        passOrFail.textContent = 'FAIL';
    }
}

let sliders = document.getElementsByClassName('regular-output');
let totalScoreLabel = document.getElementById('total-score');

for (let i = 0; i < sliders.length; i++) {
    let fitnessEventID = sliders[i].dataset.event;
    let rawScoreLabel = document.getElementById(fitnessEventID);
    let scoreLabel = document.getElementById(`${fitnessEventID}-score`);
    scoreLabel.textContent = 0;
    totalScoreLabel.textContent = getTotalScore();


    let min = parseFloat(sliders[i].getAttribute('min'));
    let max = parseFloat(sliders[i].getAttribute('max'));

    if (sliders[i].classList.contains('time-output')) {
        rawScoreLabel.textContent = minutesAndSecondsDisplay(reverseNumber(min, max, sliders[i].value));
    }
    else {
        rawScoreLabel.textContent = sliders[i].value;
    }
    sliders[i].addEventListener('input', function () {
        if (sliders[i].classList.contains('time-output')) {
            rawScoreLabel.textContent = minutesAndSecondsDisplay(reverseNumber(min, max, parseFloat(sliders[i].value)));
        }
        else {
            rawScoreLabel.textContent = sliders[i].value;
        }

        switch (fitnessEventID) {
            case 'deadlift':
                eventScore.deadliftScore = getDeadliftScore(sliders[i].value);
                scoreLabel.textContent = eventScore.deadliftScore;
                break;
            case 'standing-throw':
                eventScore.standingThrowScore = getPowerThrowScore(sliders[i].value);
                scoreLabel.textContent = eventScore.standingThrowScore;
                break;
            case 'pushup':
                eventScore.pushupScore = getPushUpScore(sliders[i].value);
                scoreLabel.textContent = eventScore.pushupScore;
                break;
            case 'drag-carry':
                let convertedCarryScore = reverseNumber(min, max, sliders[i].value);
                convertedCarryScore = convertMinutesAndSeconds(convertedCarryScore);
                eventScore.dragCarryScore = getSprintDragCarryScore(convertedCarryScore);
                scoreLabel.textContent = eventScore.dragCarryScore;
                break;
            case 'leg-tuck':
                eventScore.legTuckScore = getLegTuckScore(sliders[i].value);
                scoreLabel.textContent = eventScore.legTuckScore;
                break;
            case 'run':
                let convertedRunScore = reverseNumber(min, max, sliders[i].value);
                convertedRunScore = convertMinutesAndSeconds(convertedRunScore);
                eventScore.runScore = getRunScore(convertedRunScore);
                scoreLabel.textContent = eventScore.runScore;
                break;
        }
        totalScoreLabel.textContent = getTotalScore();
        populatePassFailLabel();
    });

    document.querySelectorAll('input[type="radio"]').forEach(function (e) {
        e.addEventListener('click', function () {
            populatePassFailLabel();
        });
    });
    
}






   

