var fs = require("fs");
let raw_emotion = fs.readFileSync("emotion.json")
let emotiondata = JSON.parse(raw_emotion)
let raw_other = fs.readFileSync("otherfunctions.json")
let otherdata = JSON.parse(raw_other)
let raw_key = fs.readFileSync("key.json")
let keydata = JSON.parse(raw_key)
let raw_sound = fs.readFileSync("soundboard.json")
let sounddata = JSON.parse(raw_sound)
var clock 

//===========================================================================
//var btSerial = new (require("bluetooth-serial-port").BluetoothSerialPort)();
const COM = "COM3";

var SerialPort = require("serialport");
// creates a new serial port connection, in this case to port named in COM variable


var serialPort = new SerialPort(COM, {
	baudRate: 115200, // these are the default settings for Microbit
	dataBits: 8,
	parity: 'none',
	stopBits: 1
});
 
serialPort.on('error', function (err) {
	console.log(' ');
	console.log('[Microbit not detected in port ' + COM + '. If you plug one in please restart this program.]');
})





//===========================================================================

const readkey = require('readkey');
//clock()
var flag = false;

const keyCommands = [
	{ fn: (str, key) => str === keydata['emotionkey1'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '1'] + ":") },//happy
	{ fn: (str, key) => str === keydata['emotionkey2'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '2'] + ":") },//sad
	{ fn: (str, key) => str === keydata['emotionkey3'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '3'] + ":") },//confused
	{ fn: (str, key) => str === keydata['emotionkey4'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '4'] + ":") },//angry
	{ fn: (str, key) => str === keydata['emotionkey5'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '5'] + ":") },//asleep
	{ fn: (str, key) => str === keydata['emotionkey6'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '6'] + ":") },//suprised 
	{ fn: (str, key) => str === keydata['emotionkey7'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '7'] + ":") },//silly
	{ fn: (str, key) => str === keydata['emotionkey8'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '8'] + ":") },//fabulous
	{ fn: (str, key) => str === keydata['emotionkey9'], command: () => serialPort.write(emotiondata['emotionstring'] + "." + emotiondata['emotion' + '9'] + ":") },//meh
//========================================================================================================
	{ fn: (str, key) => str === keydata['soundkey1'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise15'] + ":") },//bading
	{ fn: (str, key) => str === keydata['soundkey2'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise16'] + ":") },//wawawawaa
	{ fn: (str, key) => str === keydata['soundkey3'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise12'] + ":") },//punchline
	{ fn: (str, key) => str === keydata['soundkey4'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise13'] + ":") },//baddy
	{ fn: (str, key) => str === keydata['soundkey5'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise19'] + ":") },//power up
	{ fn: (str, key) => str === keydata['soundkey6'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise20'] + ":") },//power down
	{ fn: (str, key) => str === keydata['soundkey7'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise17'] + ":") },//jump up
	{ fn: (str, key) => str === keydata['soundkey8'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise18'] + ":") },//jump down
	{ fn: (str, key) => str === keydata['soundkey9'], command: () => serialPort.write(sounddata['playstring'] + "." + sounddata['noise6'] + ":") },//ringtone
//=======================================================================================================================================================================
	{ fn: (str, key) => str === keydata['dicekey'], command: () => serialPort.write(otherdata['dicestring'] + ".") },//diceroll
	{ fn: (str, key) => str === keydata['coinkey'], command: () => serialPort.write(otherdata['coinstring'] + ".") },//coinflip
	{ fn: (str, key) => str === keydata['counterkey'], command: () => serialPort.write(otherdata['counterstring'] + "." ) }, //counter

//============================================================================================================================================================================================
	{ fn: (str, key) => str === keydata['timerkey'], command: () => serialPort.write("timer" + "." + otherdata['timerstring'] + ":") }, //30second timer
	
//===================================================================================================================================================================================================================================================

	//{ fn: (str, key) => str === 'p', command: () => flag = true }

	{ fn: (str, key) => str === keydata['clockonkey'], command: () => clock_start()}, //turns on the clock 
	{ fn: (str, key) => str === keydata['clockoffkey'], command: () => clearInterval(clock) },// turns off the clock
	//{ fn: (str, key) => key.ctrl && key.name === 'r', command: () => serialPort.write(otherdata['resetstring'] + ".") } ,//I have done a differnt method for the reset function, by pressing buttons A and B together on the microbit. 
//==============================================================================================================================================================================================================================================
	{ fn: (str, key) => str === keydata['uprisingkey'], command: () => serialPort.write(otherdata['uprisingstring'] + ".") },//uprisisng
//=================================================================================================================================================================================================================================================================
	{ fn: (str, key) => key.ctrl && key.name === keydata['exitkey1'], command: () => process.exit() },
	{ fn: (str, key) => key.ctrl && key.name === keydata['exitkey2'], command: () => process.exit() },

];
readkey(keyCommands);

function clock_start() {
	clock_func()
	clock = setInterval(clock_func, 10000)
}
function clock_off() {
	
	flag = false
	console.log("working")
}
function clock_func() {
	let date_ob = new Date();
	serialPort.write("time"+"."+date_ob.getHours()+":"+ date_ob.getMinutes() + ";")
	return ["time" + "." + date_ob.getHours() + ":" + date_ob.getMinutes() + ";"];

}
