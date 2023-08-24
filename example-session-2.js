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
.load ./utilities-general.js
.load ./utilities-array.js
.load ./midi.js
.load ./rhythm.js
.load ./configure-konduktiva.js
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

e.outputs = []

let progression = ["IIm9", "IIm9", "V", "V", "IIIm7", "IIIm7", "VIm","VIm"]


let iois = [1,1,1,1]

let chords = generateChords("C", 5,generateChordProgression(iois, "C", 0.5));

let chordsArp = arpeggiateChordProgression(chords, 8)

generateMidiInfoData2 = {
    velocity: buildArray(8, ((x) => {
        return steveRandomRange(80, 110)
    })),
    IoIs: [4,4,4,4],
    bools: [true, true, true, true],
    music: chords,
    total: 16,
    type: "chords"
}

generateMidiInfoData3 = {
    velocity: buildArray(32, e => {return 90}),
    IoIs: buildArray(32, e => {return 0.5}),
    bools: buildArray(32, e => {return true}),
    music: chordsArp,
    total: 16,
    type: "melodies"
}

updateMidiOutputList(e)

e.changeTempo(113)

let beats = [0,1,2,3]

beats2 = linearArray(0, 0.5, 32)

beats2

assignPlayerForMusicSynthesizerSession(1, generateMidiInfoData2, [0,4,8,12], 1)

assignPlayerForMusicSynthesizerSession(2, generateMidiInfoData3, beats2, 2)

e.play('musicSynthesizerSession1')

e.play('musicSynthesizerSession2')

e.stop("musicSynthesizerSession1")

e.stop("musicSynthesizerSession2")
