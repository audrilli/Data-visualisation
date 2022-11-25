const settings = {
  circleSize: 40,
  strokeWidth: 3,
  triangleSize: 20,
  fontSize: "9px",
};

function listenToTokens() {
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

function drawSVG() {

  var dataArray = [20, 40, 50];
  // creating an svg within the div with id #d3
  var canvas = d3
    .select("body")
    .append("svg")
    // setting svg specific attributes for the svg tag
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

    var bars = canvas.selectAll("circle")
              .data(dataArray)
              .enter()
                .aapend("circle")
                .attr("width", function(d) { return d; })
                .attr("height", 50)
                .attr("y", function(d, i) { return i * 100});

  // creating a <g> group tag
  const indicatorGroup = svg.append("g").attr("id", "indicator");
  const rotatingGroup = indicatorGroup.append("g").attr("id", "rotate");

  const triangle = d3.symbol().type(d3.symbolTriangle).size(settings.triangleSize);
  const circle = d3.symbol().type(d3.symbolCircle)

  // using the same svg selection from before and adding a line
  rotatingGroup
    .append("circle")
    .style("stroke", "#0022ff")
    .style("stroke-width", settings.strokeWidth)
    .style("fill", "transparent")

    .attr("r", settings.circleSize)
    .attr("cx", 0)
    .attr("cy", 0);

  rotatingGroup
    .append("path")
    .attr("d", triangle)
    .attr("stroke", "#0022ff")
    .attr("fill", "#0022ff")
    .attr("transform", `translate(0, -${settings.circleSize + settings.strokeWidth})`);

  indicatorGroup
    .append("text")
    .attr("id", "indicator-text")
    .attr("font-size", settings.fontSize)
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#000")
    .text("0°");
}

function updateText(text) {
  const circleText = d3.select("#indicator-text").text(`${text} °`);
}

function moveSVG(x, y) {
  const indicator = d3
    .select("#indicator")
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("transform", () => `translate(${x}, ${y})`);
}

function rotateSVG(degrees) {
  const rotator = d3
    .select("#rotate")
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("transform", () => `rotate(${degrees})`);
}

drawSVG();
listenToTokens();
