const WebSocket = require('ws')
var os = require('os');
var pty = require('node-pty');
var exec = require('child_process').exec;

const wss = new WebSocket.Server({ port: 9050 })
if (os.platform() === 'win32')
    exec('index.html');
else
    exec('firefox index.html');

console.log("Socket is up and running...")

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'sh';
var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 25,
    cwd: process.env.HOME,
    env: process.env,
});
wss.on('connection', ws => {
    console.log("new session")
    ws.on('message', command => {
        //console.log(command);
        ptyProcess.write(command);
    })

    ptyProcess.on('data', function (data) {
        ws.send(data)
        console.log(data);
    });
})
