This code is based on Konduktiva, a Javascript library for sequencing and live coding. In this version, users are allowed to play different chords using different commands. The notation used for the chords is Roman numeral notation. Here's a [Wikipedia article](https://en.wikipedia.org/wiki/Roman_numeral_analysis#:~:text=In%20music%20theory%2C%20Roman%20numeral,note%20is%20that%20scale%20degree.) about Roman numeral.

#These are the instructions of how to use a particular file (romanNumeral.js) to play different chord progression with a virtual MIDI synthesizer.

Dependencies:

1. Tonal (npm package): You can install tonal by running "npm install tonal" in your shell command.

2. Easymidi (npm package): You can install easymidi by running "npm install easymidi" in your shell command.

Instructions: 

1. Setup your MIDI environment , a virtual sythesizer (i.e. Surge XT), and a virtual MIDI instrument (i.e. vmpk). You may need a host (i.e. Host AU) for the synthesizer.

2. Load Konductiva (line 8 to 11) and start the musical environment scheduler (line 17 to 18).

3. Load all the necessary functions, classes, and gloabal variables (line 12~16).

4. Load easymidi (line 21 to 29).

5. update MIDI output list (line 52) and define necessary arguments for music synthesizer session (line 35 to 49). This step may be skipped depending on the device you are using.

6. Assign a music synthesizer session (line 59).

7. Load line 61 to start playing the chord progression, line 63 to stop.

8. You can change the chord progression by changing the "progression" variable in line 35, load line 37 to 49, and reasign the music synthesizer session. For example, if you want to play the first 8 bars of the song Norweigian Wood by The Beatles, you need to load the following code:

progression = ["I", "I", "Vm", "I", "I", "I", "Vm", "I"]

chords = generateChords("E", 5, progression)

generateMidiInfoData2 = {
    velocity: buildArray(8, ((x) => {
        return steveRandomRange(80, 110)
    })),
    IoIs: [1,1,1,1],
    bools: [true, true, true, true],
    music: chords,
    total: 8,
    type: "chords"
}

assignPlayerForMusicSynthesizerSession(1, generateMidiInfoData2, beats, 1)

