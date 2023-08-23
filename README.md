This code is based on Konduktiva, a Javascript library for sequencing and live coding. In this version, users are allowed to play different chords using different commands. The notation used for the chords is Roman numeral notation. Here's a [Wikipedia article](https://en.wikipedia.org/wiki/Roman_numeral_analysis#:~:text=In%20music%20theory%2C%20Roman%20numeral,note%20is%20that%20scale%20degree.) about Roman numeral.

## These are the instructions of how to use a particular file (example-session.js) to play different chord progression with a virtual MIDI synthesizer.

Dependencies:

1. Tonal (npm package): You can install tonal by running "npm install tonal" in your shell command.

2. Easymidi (npm package): You can install easymidi by running "npm install easymidi" in your shell command.

Instructions: 

1. Setup your MIDI environment , a virtual sythesizer (i.e. Surge XT), and a virtual MIDI instrument (i.e. vmpk). You may need a host (i.e. Host AU) for the synthesizer if you are using a mac.

2. Load Konductiva (line 8 to 11) and start the musical environment scheduler (line 17 to 18).

3. Load all the necessary functions, classes, and gloabal variables (line 12~16).

4. Load easymidi (line 21 to 29).

5. update MIDI output list (line 52) and define necessary variables for music synthesizer session (line 33 to 48).

6. Assign a music synthesizer session (line 56).

7. Load line 58 to start playing the chord progression, line 60 to stop.

8. You can change the chord progression by changing the "progression" variable in line 33, load line 39 to 48, and reasign the music synthesizer session. For example, if you want to play the first 8 bars of the song Norweigian Wood by The Beatles, you can load the code in the norwegian-wood.js file.

If you are using a mac, these are the instructions for how to setup a MIDI environment:

Dependencies: 

1. Go to your MIDI studio by opening the Audio MIDI setup app, click window on the top bar, and click "Show MIDI studio".

2. Click the IAC driver block and add 4 ports, you can name them however you want.

3. Install a host ([Hosting AU](http://ju-x.com/hostingau.html) is used in this example)

4. Install a virtual MIDI synthesizer ([Surge XT](https://surge-synthesizer.github.io/) is used in this example)

5. Install a virtual MIDI instrument ([vmpk virtual keyboard](https://sourceforge.net/projects/vmpk/) is used in this example)

Instructions: 

1. Start by lauching your Hosting AU and vmpk keyboard.

2. Assign a synthesizer to a track in Hosting AU by clicking the "No instrument" button.

3. Go to the example-session.js file and run updateMidiOutputList(e) (line 52)

4. If you see the ports you created in your MacOS MIDI studio when you run e.outputs, your MIDI environment is setup successfully.


# Melodies

The file example-session-2.js is an extensiion of example-session.js, which has an extra player that plays melodies.

To play the chords and the molodies together, please follow the instructions below:

  1. Run line 8 to 77 to set up the musical environment and assign session players.
  2. Run play the and melodis by running the following code:
  ```javascript
  e.play('musicSynthesizerSession1')

  e.play('musicSynthesizerSession2')
  ```
  3. Run the code below to stop the players:
  ```javascript
  e.stop("musicSynthesizerSession1")

  e.stop("musicSynthesizerSession2")
  ```
