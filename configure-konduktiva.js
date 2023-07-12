// --------------------------------------------------------------------------
// -- configure-konduktiva.js
// -- initial author: Renick Bell (renick@gmail.com)
// -- initial creation date: Fri Jul 7 10:56 AM CST 2023
// -- contributors: Yiler Huang (yiler7777@gmail.com); Steve Wang (stevesg168@gmail.com)
// -- license: GPL 3.0
// --------------------------------------------------------------------------
//writen by Bell:
e.actions.yoshimiSequncedRhythm = ((p, b) => {
    console.log(e.players[p])
    add2Log(JSON.stringify(e.players[p]))
    console.log(mask(p, e.maskMaps[e.players[p].maskMap], (e.currentBeat()), 1))
    if ((mask(p, e.maskMaps[e.players[p].maskMap], (e.currentBeat()), 1)) != true) {
        sortMidiInfo(e.players[p].beat.wrapLookup(b), e.players[p])
    }
})

function setupPlayer(env, sequenceName) {
    env.players[sequenceName] = new Player(sequenceName);
    console.log('checkpoint 1')
    env.players[sequenceName].maskMap = 'default'
    console.log('checkpoint 2')
    //env.players[playerName].samplePattern = playerName;
    env.players[sequenceName].action = 'yoshimiSequncedRhythm';
    console.log('checkpoint 3')
    return sequenceName
}

function updateMidiOutputList(e) {
    let easymidiOutputs = easymidi.getOutputs()
    //The line below is specific To my Device:
    if (e.outputs !== undefined) {
        e.outputs.forEach(x => {
            x.close()
        })
    }
    e.outputs = easymidiOutputs.map(x => {
        return new easymidi.Output(x)
    })
}

//assignPlayerForMusicSynthesizerSession(1, generateMidiInfoData, twelveBars, 1)


function editSessionPlayer(session, midiInfo, beat, channel) {
    console.log('chose to edit');
    let name = 'musicSynthesizerSession' + JSON.stringify(session)
    let sessionPlayer = e.players['musicSynthesizerSession' + session];
    sessionPlayer.keyspan = midiInfo.total;
    sessionPlayer.midiData = midiInfo;
    sessionPlayer.beat = beat;
    sessionPlayer.session = 1;
    sessionPlayer.channel = channel;
    let adjustedIoisAndBools = extendIoisAndBools(midiInfo.music, midiInfo.IoIs, midiInfo.bools)
    let midiRhythm = new RhythmPattern(name, `midiRhythm${session}`, midiInfo.total, adjustedIoisAndBools.IoIs, adjustedIoisAndBools.bools)
    midiRhythm.add(e)
    e.outputs[session] = (new easymidi.Output(easymidi.getOutputs()[session]))
}

function checkIfSessionPlayerExist(session) {
    return Object.keys(e.players).find(x => x === 'musicSynthesizerSession' + session);
}

function extendIoisAndBools(chords, iois, bools) {
    let chordsLength = chords.length;
    let newIois = [];
    let newBools = [];
    if (iois.length != bools.length) {
        console.log("The length of IoIs and bools should be the same.")
    }
    while (newIois.length < chordsLength) {
        iois.forEach(ioi => newIois.push(ioi));
        bools.forEach(b => newBools.push(b));
    }
    return {
        bools: newBools,
        IoIs: newIois
    }
}

function createSessionPlayer(session, midiInfo, beat, channel) {
    let name = 'musicSynthesizerSession' + JSON.stringify(session)
    setupPlayer(e, name);
    let adjustedIoisAndBools = extendIoisAndBools(midiInfo.music, midiInfo.IoIs, midiInfo.bools)
    let midiRhythm = new RhythmPattern(name, `midiRhythm${session}`, midiInfo.total, adjustedIoisAndBools.IoIs, adjustedIoisAndBools.bools)
    midiRhythm.add(e)
    let sessionPlayer = e.players['musicSynthesizerSession' + session]
    sessionPlayer.midiData = midiInfo;
    sessionPlayer.beat = beat;
    sessionPlayer.session = 1; //changed for fitting my synth
    sessionPlayer.channel = channel;
    e.outputs.push(new easymidi.Output(easymidi.getOutputs()[session]))
}


function assignPlayerForMusicSynthesizerSession(session, midiInfo, keys, channel) {
    midiInfo.IoIs = adjustArrayLength(midiInfo.music.length, midiInfo.IoIs)
    midiInfo.bools = adjustArrayLength(midiInfo.music.length, midiInfo.bools)
    let beat = new QuantizedMap(midiInfo.total, keys, buildArray(keys.length, (x) => {
        return x
    }))
    if (checkIfSessionPlayerExist(session) != undefined) {
        editSessionPlayer(session, midiInfo, beat, channel)
    }
    if (checkIfSessionPlayerExist(session) === undefined) {
        createSessionPlayer(session, midiInfo, beat, channel)
    } else {
        editSessionPlayer(session, midiInfo, beat, channel)
    }
}
