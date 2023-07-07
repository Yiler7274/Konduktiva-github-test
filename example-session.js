// --------------------------------------------------------------------------
// -- romanNumeral.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Thu Jun 8 10:11 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------
.load ./steve-mod-konduktiva/modified-konduktiva-revised.js
.load ./steve-mod-konduktiva/testingKonduktiva-revised.js
.load ./steve-mod-konduktiva/konduktiva-superdirt-revised.js
.load ./steve-mod-konduktiva/defaultsuperdirtplayers-revised.js
.load ./functions-classes/general.js
.load ./functions-classes/array-utilities.js
.load ./functions-classes/midi.js
.load ./functions-classes/konduktiva.js
setupScheduler(e)
e.startScheduler()
const easymidi = require('easymidi');

const {
    Chord,
    Interval,
    Note,
    Scale,
    Key,
    Progression,
    Midi
} = require("tonal")

let twoBars = barsToBeats(4, buildArray(3, (x) => {return x}))

e.outputs = []


let progression = [["IIm9", "IIm9", "V", "V"], ["IIIm7", "IIIm7", "VIm","VIm"]]


let chords2 = generateChords("D", 5, progression)

generateMidiInfoData2 = {
    velocity: buildArray(8, ((x) => {
        return steveRandomRange(80, 110)
    })),
    IoIs: [1,1,1,1],
    bools: [true, true, true, true],
    music: chords2,
    total: 8,
    type: "chords"
}

updateMidiOutputList(e)

e.changeTempo(113)


let testQM = new QuantizedMap(4, [1,2,3,4], [1,2,3,4])

assignPlayerForMusicSynthesizerSession(1, generateMidiInfoData2, twoBars, testQM, 1)
e.players.musicSynthesizerSession1


e.play('musicSynthesizerSession1')

e.stop("musicSynthesizerSession1")

