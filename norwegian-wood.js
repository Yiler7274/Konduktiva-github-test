progression = ["I", "I", "Vm", "I", "I", "I", "Vm", "I"]

chords = generateChords("E", 5, progression)

generateMidiInfoData2 = { velocity: buildArray(8, ((x) => { return steveRandomRange(80, 110) })), IoIs: [1,1,1,1], bools: [true, true, true, true], music: chords, total: 8, type: "chords" }

assignPlayerForMusicSynthesizerSession(1, generateMidiInfoData2, beats, 1)
