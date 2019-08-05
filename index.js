var AudioContext = require('web-audio-api').AudioContext
context = new AudioContext
var fs = require('fs')
var exec = require('child_process').exec;
var _ = require('underscore');

var pcmdata = [];

//Note: I have no rights to these sound files and they are not created by me.
//You may downlaod and use your own sound file to further test this.
//
var soundfile = "sounds/audio.wav"
decodeSoundFile(soundfile);

/**
 * [decodeSoundFile Use web-audio-api to convert audio file to a buffer of pcm data]
 * @return {[type]} [description]
 */
function decodeSoundFile(soundfile) {
    fs.readFile(soundfile, function (err, buf) {
        if (err) throw err
        context.decodeAudioData(buf, function (audioBuffer) {
            console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
            pcmdata = (audioBuffer.getChannelData(0));
            samplerate = audioBuffer.sampleRate;
            maxvals = []; max = 0;
            const { spawn } = require('child_process');
            const pyProg = spawn('python', ['./index.py', pcmdata]);

            pyProg.stdout.on('data', (data) => {
                console.log(`data:${data}`);
            });
            pyProg.stderr.on('data', (data) => {
                console.log(`error:${data}`);
            });
            pyProg.stderr.on('close', () => {
                console.log("Closed");
            });

            // pyProg.stdout.on('data', function (data) {

            //     console.log(data.toString());
            //     // res.write(data);
            //     // res.end('end');
            // });


        }, function (err) { throw err })
    })
}