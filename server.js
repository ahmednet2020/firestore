const liveServer = require("live-server");
 
const params = {
    port: 7777, // Set the server port. Defaults to 8080.
    host: "0.0.0.0",
    root: './public/'
};
liveServer.start(params);