# SimpleXterm

## Setup process
There are two parts to this, the frontend and backend, just like a typical web application.

To get the backend running use the following steps:

- `cd` into the directory.
- Run `npm install` to pull in dependencies.
- Run `node server.js` to start the WebSocket the frontend will be connecting to.

There is not much to do regarding the frontend except to open up `index.html` in the browser.

The WebSocket port number is hard coded thus `9050`. Feel free to change it in `server.js`
Also, don't forget to update the WebSocket URL in `client.js` after.

