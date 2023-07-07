//------------------------------------------------------------------------------
//-- testingKonduktiva-revised.js
//-- Wed Feb  2 07:44:11 PM JST 2022
// license not yet decided; please do not distribute yet.
//------------------------------------------------------------------------------

e = new MusicalEnvironment()

function defaultIOI (player, beat) {
    return getIOI (e, player, beat)
}

e.IOIs.default = defaultIOI

e.IOIs.kick = beat => getNextOnsetFromRhythmMap(densityTest5,1.2,beat)
e.IOIs.snare = beat => getNextOnsetFromRhythmMap(densityTest5,1.2,beat)

e.currentDensityGraphs = ['mediumGlobal','defaultTechno']

function linearFunctionQuantizedMap (pointArray) {
    let times = pointArray.map(t => t.x);
    return new QuantizedMap(times[times.length-1], times, linearFunctionArrayFromPoints(pointArray)) 
}
 
myPoints = [
    new Point (0,0.25)
    , new Point (2,0.6)
    , new Point (3,0.3) 
    , new Point (3.9,1.2) 
    , new Point (4,1.4) 
]

aDensityFuncTSM = linearFunctionQuantizedMap (myPoints)

function runTime (tsm, time) {
    let func = aDensityFuncTSM.wrapLookup(time).func;
    return func(time%(tsm.keyspan))
}

e.densityGraphs.superLow = 
    {
        snare: linearFunctionQuantizedMap( 
            [new Point(0,0.2)
            ,new Point(1.5,0.1)
            ,new Point(3,0.2)
            ,new Point(4,0.3)
            ])
    }

e.densityGraphs.defaultTechno = 
    {
        synth: linearFunctionQuantizedMap( 
            [new Point(0,0.5)
            ,new Point(1.5,1)
            ,new Point(3,0.6)
            ,new Point(4,1.5)
            ])
       ,drum: linearFunctionQuantizedMap( 
            [new Point(0,0.2)
            ,new Point(1.7,0.2)
            ,new Point(2.5,0.5)
            ,new Point(4,0.8)
            ])
    }

e.densityGraphs.sparse = 
    {
        synth: linearFunctionQuantizedMap( 
            [new Point(0,0.1)
            ,new Point(1.5,0.2)
            ,new Point(3,0.3)
            ,new Point(4,0.4)
            ])
       ,drum: linearFunctionQuantizedMap( 
            [new Point(0,0.1)
            ,new Point(1.7,0.2)
            ,new Point(2.5,0.3)
            ,new Point(4,0.4)
            ])
    }


e.densityGraphs.lowGlobal = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,0.3)
            ,new Point(2.7,0.4)
            ,new Point(3.1,0.35)
            ,new Point(4,0.6)
            ])
       , kick: linearFunctionQuantizedMap( 
            [new Point(0,0.3)
            ,new Point(2.7,0.4)
            ,new Point(3.1,0.35)
            ,new Point(4,0.6)
            ])
    }

e.densityGraphs.mediumGlobal = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,1)
            ,new Point(2.7,1.5)
            ,new Point(3.1,1)
            ,new Point(4,2)
            ,new Point(4,2)
            ,new Point(6.5,1.5)
            ,new Point(8,2.3)
            ])
    }

e.densityGraphs.variedGlobalLong = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,0.5)
            ,new Point(2.7,1.5)
            ,new Point(3.1,0.7)
            ,new Point(4,3)
            ,new Point(5.1,0.8)
            ,new Point(6.1,3.8)
            ,new Point(8,5)
            ,new Point(9,0.7)
            ,new Point(9.7,1.5)
            ,new Point(10.1,1)
            ,new Point(12,2)
            ,new Point(13,3)
            ,new Point(14.7,3.5)
            ,new Point(15.3,1)
            ,new Point(16,5)
            ])
    }

e.densityGraphs.higherGlobal = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,2)
            ,new Point(2.7,2.5)
            ,new Point(3.2,1)
            ,new Point(4,4)
            ])
       ,snare: linearFunctionQuantizedMap( 
            [new Point(0,0.2)
            ,new Point(2.7,0.4)
            ,new Point(3.3,0.5)
            ,new Point(4,0.8)
            ])
    }

e.densityGraphs.veryHighGlobal = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,3)
            ,new Point(2.7,3.5)
            ,new Point(3.3,1)
            ,new Point(4,5)
            ])
       ,snare: linearFunctionQuantizedMap( 
            [new Point(0,0.5)
            ,new Point(2.7,0.8)
            ,new Point(3.3,0.6)
            ,new Point(4,0.5)
            ])
    }

e.densityGraphs.rampUp8 = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,2)
            ,new Point(2.7,3)
            ,new Point(5.3,4)
            ,new Point(6.5,5)
            ])
    }

// heating starts as mediumGlobal copy
e.densityGraphs.heating = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,1)
            ,new Point(2.7,1.5)
            ,new Point(3.1,1)
            ,new Point(4,2)
            ,new Point(4,2)
            ,new Point(6.5,1.5)
            ,new Point(8,2.3)
            ])
    }

e.currentDensityGraphs = ['lowGlobal']
e.currentDensityGraphs = ['mediumGlobal']
e.currentDensityGraphs = ['higherGlobal']
e.currentDensityGraphs = ['variedGlobalLong']
e.currentDensityGraphs = ['veryHighGlobal']
e.currentDensityGraphs = ['veryHighGlobal','rampUp8']
e.currentDensityGraphs = ['higherGlobal','defaultTechno']
e.currentDensityGraphs = ['veryHighGlobal','defaultTechno']
e.currentDensityGraphs = ['lowGlobal','defaultTechno']
e.currentDensityGraphs = ['mediumGlobal','defaultTechno']
e.currentDensityGraphs 

e.densityGraphs.defaultTechno = 
    {
        synth: linearFunctionQuantizedMap( 
            [new Point(0,0.5)
            ,new Point(1.5,1)
            ,new Point(3,0.6)
            ,new Point(4,1.5)
            ])
       ,snare: linearFunctionQuantizedMap( 
            [new Point(0,0.2)
            ,new Point(1.0,0.3)
            ,new Point(2.5,1.2)
            ,new Point(4,0.4)
            ,new Point(6.5,0.6)
            ,new Point(8,1.7)
            ])
       ,test: linearFunctionQuantizedMap( 
            [new Point(0,2)
            ,new Point(2.7,2.5)
            ,new Point(3.2,1)
            ,new Point(4,4)
            ])
       ,kick: linearFunctionQuantizedMap( 
            [new Point(0,0.4)
            ,new Point(1.7,0.6)
            ,new Point(2.5,0.9)
            ,new Point(4,1.4)
            ])
       //,kick: linearFunctionQuantizedMap( 
       //     [new Point(0,0.2)
       //     ,new Point(1.7,0.2)
       //     ,new Point(2.5,0.5)
       //     ,new Point(4,0.8)
       //     ])
       ,hat: linearFunctionQuantizedMap( 
            [new Point(0,3)
            ,new Point(2.7,3.5)
            ,new Point(3.3,2)
            ,new Point(4,5)
            ,new Point(6,4)
            ,new Point(8,8)
            ])
    }


e.densityGraphs.mediumGlobal = 
    {
       default: linearFunctionQuantizedMap( 
            [new Point(0,1)
            ,new Point(2.7,1.5)
            ,new Point(3.1,1)
            ,new Point(4,2)
            ])
    }


function changeRhythmPattern (env, players, rhythm) {
    players.forEach(p => e.players[p].rhythmMap = rhythm)
} 

e.maskMaps
e.maskMaps.default = new QuantizedMap(4,[0],[false])

//e.actions.superDirt = (p,b) => playSuperDirtSample (e,p,b)
e.actions.superDirt = (p,b) => {if ((mask(p, e.maskMaps[e.players[p].maskMap] ,(e.currentBeat()),1)) != true) {playSuperDirtSample (e,p,b)}}


//STEVE MOD:
//Added animateSize function. This function is called from modified-konduktiva-revised.js inside function setupSVGAnimation:

//e.actions.animateSize = (p,b) => {if ((mask(p, e.maskMaps[e.players[p].maskMap] ,(e.currentBeat()),1)) != true) {changeCircleSize(b);console.log(b,p.counter)}}

/* Full Example and explanation can be found in steve-modification-documentation.js but the examples here are still left untouched . Will be deleted when instructions and explanations are fully conplete. Also backups should be made*/

/*
e.actions.animateSize = (p,b) => {if ((mask(p, e.maskMaps[e.players[p].maskMap] ,(e.currentBeat()),1)) != true) {
    console.log('hi')
}}
*/

// Steve version of roundOff and randomRange is defined here because Dr.Bell's functions do not work as expected:
function steveRoundOff (number,decimalPlaces){
    let roundedNumber=number.toFixed(decimalPlaces);
    return JSON.parse(roundedNumber)}


function steveRandomRange (min, max,decimalPlaces) {
    if (decimalPlaces==undefined){decimalPlaces=0}
      return steveRoundOff(min + (max - min) * (Math.random()),decimalPlaces);
}

/*
function changeCircleSize (){
    console.log('hi')
    if (circleSize==100){
        //messageClientsManual({action:'animate',info:['size',[0,500,10,10]]})
        messageClientsManual({action:'animate',info:{
            type:'size',
            info:{
                shapesIndex:0,
                time:20,
                sizeX:10,
                sizeY:10
            }
        }})
        circleSize=10
    }
    else{
        //messageClientsManual({action:'animate',info:['size',[0,10,100,100]]})
        messageClientsManual({action:'animate',info:{
            type:'size',
            info:{
                shapesIndex:0,
                time:20,
                sizeX:100,
                sizeY:100
            }
        }})
        circleSize=100
    }
}
*/

            //let unmaskedOnsets = onsetsAfterLastScheduled.filter(t => 

e.rhythmMaps.straight = new QuantizedMap(1,[1],[new QuantizedMap(4,[0,1,2,3],[1,1,1,1])])
let straightEights = buildArray(7,i => 0.5)
let straight16ths = buildArray(15,i => 0.25)
straightEights
straight16ths
e.rhythmMaps.straight2 = new QuantizedMap(1,[1],[new QuantizedMap(4,[0].concat(runningSum(0,straightEights)),[0.5].concat(straightEights))])
e.rhythmMaps.straight3 = new QuantizedMap(1,[1],[new QuantizedMap(4,[0].concat(runningSum(0,straight16ths)),[0.25].concat(straight16ths))])
