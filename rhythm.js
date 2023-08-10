// --------------------------------------------------------------------------
// -- rhythm.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Fri Jul 7 10:56 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------
function beatsToTime(tempo, beats) {
    let beatsPerSecond = (tempo / 60);
    return beats / beatsPerSecond
}
