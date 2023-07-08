
const socket = new WebSocket("ws://localhost:9050");

var term = new window.Terminal({
    cursorBlink: true
});
term.open(document.getElementById('terminal'));

term.setOption("theme", {
      background: "black",
      foreground: "#F5F8FA",
    });

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
                socket.send('^C');
                prompt(term);
                break;
            case '\r': // Enter
                socket.send('\n');
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if (term._core.buffer.x > 2) {
                    term.write('\b \b');
                    socket.send('\b \b');
                }
                break;
            case '\u0009':
                console.log('tabbed', output, ["dd", "ls"]);
                break;
            default:
               // if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                    //term.write(e);
                    socket.send(e);
               // }
        }
    });
}

function clearInput(command) {
    var inputLengh = command.length;
    for (var i = 0; i < inputLengh; i++) {
        term.write('\b \b');
    }
}
function prompt(term) {
    term.write('\r\n$ ');
    //socket.send('\r\n$ ');
}
socket.onmessage = (event) => {
    term.write(event.data);
}

function runCommand(term, command) {
    if (command.length > 0) {
        clearInput(command);
        socket.send('\n');
        return;
    }
}

init();
