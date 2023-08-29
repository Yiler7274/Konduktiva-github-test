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

let progression = ["IIm9", "IIm9", "V", "V", "IIIm7", "IIIm7", "VIm","VIm"]

let chords = generateChords("D", 5, progression)

let iois = [1,1,1,1]

generateMidiInfoData2 = {
    velocity: buildArray(8, ((x) => {
        return steveRandomRange(80, 110)
    })),
    IoIs: iois,
    bools: [true, true, true, true],
    music: generateChords("C", 5,generateChordProgression(iois, "C", 0.5)),
    total: 8,
    type: "chords"
}

updateMidiOutputList(e)

e.changeTempo(113)

let beats = [0,1,2,3]

assignPlayerForMusicSynthesizerSession(1, generateMidiInfoData2, beats, 1)

e.play('musicSynthesizerSession1')

e.stop("musicSynthesizerSession1")
