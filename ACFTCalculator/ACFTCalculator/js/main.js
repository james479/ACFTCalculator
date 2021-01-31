import { deadLiftTable, standingPowerThrowTable, pushUpTable, sprintDragCarryTable, legTuckTable, runTable } from './EventTables.js';

//convert seconds to minutes and seconds
function minutesAndSecondsDisplay(time) {
    let outputString = '';
    outputString += (Math.floor(time / 60)).toString() + ':';
    outputString += Math.round(((time % 60 * .01).toFixed(2) * 100)).toString();
    return outputString;
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

//variables to keep track of score in each event
let deadliftScore = 0;
let standingThrowScore = 0;
let pushupScore = 0;
let legTuckScore = 0;
let standThrowScore = 0;
let runScore = 0;

function getTotalScore() {
    return deadliftScore + standingThrowScore + pushupScore + legTuckScore + standingThrowScore + runScore;
}


//get all regular slider out classes
let regularinputSliders = document.getElementsByClassName('regular-output');

for (let i = 0; i < regularinputSliders.length; i++) {
    let eventID = regularinputSliders[i].dataset.event;
    let label = document.getElementById(eventID);
    let scoreLabel = document.getElementById(`${eventID}-score`);
    scoreLabel.textContent = 0;
    let totalScore = document.getElementById('total-score');
    label.textContent = regularinputSliders[i].value;
    regularinputSliders[i].addEventListener('input', function () {
        label.textContent = regularinputSliders[i].value;
        switch (eventID) {
            case 'deadlift':
                deadliftScore = getDeadliftScore(regularinputSliders[i].value);
                scoreLabel.textContent = deadliftScore;
                break;
            case 'standing-throw':
                standingThrowScore = getPowerThrowScore(regularinputSliders[i].value);
                scoreLabel.textContent = standingThrowScore;
                break;
            case 'pushup':
                pushupScore = getPushUpScore(regularinputSliders[i].value);
                scoreLabel.textContent = pushupScore;
                break;
            case 'leg-tuck':
                legTuckScore = getLegTuckScore(regularinputSliders[i].value);
                scoreLabel.textContent = legTuckScore;
                break;
        }
        totalScore.textContent = getTotalScore();
    });
}

//classes with time as score
let timeSliders = document.getElementsByClassName('time-output');

for (let i = 0; i < timeSliders.length; i++) {
    let eventID = timeSliders[i].dataset.event;
    console.log(eventID);
    let label = document.getElementById(eventID);
    let scoreLabel = document.getElementById(`${eventID}-score`);
    scoreLabel.textContent = 0;
    let totalScore = document.getElementById('total-score');
    label.textContent = regularinputSliders[i].value;
    let min = parseFloat(timeSliders[i].getAttribute('min'));
    let max = parseFloat(timeSliders[i].getAttribute('max'));

    label.textContent = minutesAndSecondsDisplay(reverseNumber(min, max, parseFloat(timeSliders[i].value)));
    timeSliders[i].addEventListener('input', function () {
        label.textContent = minutesAndSecondsDisplay(reverseNumber(min, max, parseFloat(timeSliders[i].value)));
        switch (eventID) {

            default:
        }
    });
}



   

