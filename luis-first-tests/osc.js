const websocketServer = "ws://127.0.0.1:6050"; // port from IR Tracking app

const Osc = () => {
  const wsPort = new osc.WebSocketPort({
    url: websocketServer,
    metadata: true,
  });
  const viewPortWidth = window.innerWidth;
  const viewPortHeight = window.innerHeight;

  console.log("screen: ", viewPortWidth, viewPortHeight);

  wsPort.open();

  wsPort.on("message", function (msg) {
    if (msg.args[1]) {
      const trackedDevice = {
        id: msg.args[0].value,
        identify: msg.args[1].value,
        x: msg.args[2].value, // 0 – 1, e.g. 0.98 -> token is at 98% of the tables width
        y: msg.args[3].value, // 0 – 1, e.g. 0.98 -> token is at 98% of the tables height
        rotation: msg.args[4].value,
        intensity: msg.args[5].value,
      };

      const xPos = trackedDevice.x * viewPortWidth;
      const yPos = trackedDevice.y * viewPortHeight;

      if (msg.address === "/tracker/add") {
        wsPort.emit("addDevice", trackedDevice);
      } else if (msg.address === "/tracker/update") {
        wsPort.emit("updateDevice", trackedDevice);
      } else if (msg.address === "/tracker/remove") {
        wsPort.emit("removeDevice", trackedDevice);
      }
    }
  });

  return { wsPort };
};
