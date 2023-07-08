
const socket = new WebSocket("ws://localhost:9050");
//var fitAddon = new FitAddon();
var term = new window.Terminal({
    cursorBlink: false
});
//term.loadAddon(fitAddon)
term.open(document.getElementById('terminal'));

term.setOption("theme", {
      background: "black",
      foreground: "white",
    });
term._core._inputHandler._coreService.isCursorHidden;

//window.onresize = function () {
//    fitAddon.fit();
//}

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };
    prompt(term);

    term.onData(e => {
        switch (e) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                socket.send("exit\n");
                break;
            default:
                socket.send(e);
        }
    });
}

function clearInput(command) {
    var inputLengh = command.length;
    for (var i = 0; i < inputLengh; i++) {
        term.write('\b \b');
    }
}
function send1(){
    socket.send('sleep 2041160180\n');
}
function prompt(term) {
    term.write('\r\n>');
    setTimeout(send1, 1005 );
}
socket.onmessage = (event) => {
    term.write(event.data);
}

init();
