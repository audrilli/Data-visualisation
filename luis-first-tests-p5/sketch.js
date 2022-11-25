

function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {

  const { wsPort } = Osc();

  console.log("wsPort: ", wsPort);

  // receiving token data
  wsPort.on("updateDevice", (data) => {
    // data.x and data.y are values between 0–1
    const normalizedXPos = window.innerWidth * data.x;
    const normalizedYPos = window.innerHeight * data.y;
     // using the same svg selection from before and adding a line
     background(255);
     fill(125);
     circle(normalizedXPos, normalizedYPos, data.rotation);
     console.log(data.rotation);
  });
}