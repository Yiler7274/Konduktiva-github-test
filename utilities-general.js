// --------------------------------------------------------------------------
// -- utilities-array.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Fri Jul 7 10:57 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------
function steveRoundOff(number, decimalPlaces) {
    let roundedNumber = number.toFixed(decimalPlaces);
    return JSON.parse(roundedNumber)
}

function steveRandomRange(min, max, decimalPlaces) {
    if (decimalPlaces == undefined) {
        decimalPlaces = 0
    }
    return steveRoundOff(min + (max - min) * (Math.random()), decimalPlaces);
}


function barsToBeats(beatsPerBar, inputBars) {
    return inputBars.map(e => e *= beatsPerBar)
}

function add2Log(info) {
    fs.appendFileSync('logs.txt', info + '\n')
}
