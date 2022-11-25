

function setup() {
    createCanvas(windowWidth, windowHeight);

    const { wsPort } = Osc();

    console.log("wsPort: ", wsPort);
  
    // receiving token data
    wsPort.on("updateDevice", (data) => {
      // data.x and data.y are values between 0–1
      const normalizedXPos = window.innerWidth * data.x;
      const normalizedYPos = window.innerHeight * data.y;
  
      moveSVG(normalizedXPos, normalizedYPos);
      rotateSVG(data.rotation);
      updateText(Math.round(data.rotation));
    });

}

function draw() {
background(255);

}