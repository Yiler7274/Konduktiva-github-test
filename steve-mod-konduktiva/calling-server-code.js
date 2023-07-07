//------------------------------------------------------------------------------
//-- calling-server-code.js
//-- Fri Mar  4 02:13:42 PM CST 2022
//------------------------------------------------------------------------------

.load ./modified-konduktiva-revised.js 
.load ./testingKonduktiva-revised.js
.load ./konduktiva-superdirt-revised.js
.load ./defaultSuperDirtPlayers-revised.js
//.load ./websocket-code.js
setupScheduler(e)
e.startScheduler()

// you need the scheduler to make sure that the players all do their thing on time; this is what keeps everything going at some tempo


//sometimes suceeds sometimes fails needs delay?

//Svg.js example:
.load ./example1.js

//Hydra example:
.load ./example2-hydra.js

.load ./example3-arduino.js

.load ./websocket-with-arduino.js

e.stop('animateTestCircle')

messageAllClients({action:'reload'})
    
messageSpecifiedClient({action:'animationExample'}, 0)
/*
let hoo = [1, 2, 3, 4, 6, 7]

let thousand = buildArray(1000, x => {return x+1})
thousand.splice(899, 1)

console.time('ram')
index = R.findIndex(R.gte(R.__, 900))(thousand)
thousand = safeSplice(thousand, 0, index, 900)
console.timeEnd('ram')

function insertInOrder(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (left <= right) {
    if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    mid = Math.floor((left + right) / 2);
  }
  arr.splice(left, 0, num);
  return arr;
}

console.time('bin')
insertInOrder(thousand, 900)
console.timeEnd('bin')
 */
