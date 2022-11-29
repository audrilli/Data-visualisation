let normalizedXPos;
let normalizedYPos;

let maxSize = 100;
let minSize = 25;

let co2Max = 180;
let co2Min = 140;
let co2Xposition = 240;
let co2Yposition = window.innerHeight / 2;


let aboveMax = 150;
let aboveMin = 80;
let aboveXposition = window.innerWidth - 240;
let aboveYposition = 200;

let belowMax = 180;
let belowMin = 150;
let belowXposition = window.innerWidth - 240;
let belowYposition = window.innerHeight - 200;

function listenToTokens() {
    const { wsPort } = Osc();

    console.log("wsPort: ", wsPort);

    // receiving token data
    wsPort.on("updateDevice", (data) => {
        // data.x and data.y are values between 0–1
        normalizedXPos = window.innerWidth * data.x;
        normalizedYPos = window.innerHeight * data.y;

        let HotspotValue;
        if (data.rotation > 180) {
            HotspotValue = mapValue(data.rotation, 180, 360, maxSize, minSize);
        } else {
            HotspotValue = mapValue(data.rotation, 0, 180, minSize, maxSize);
        }

        let co2Value;
        if (data.rotation < 180) {
            co2Value = mapValue(data.rotation, 180, 360, co2Max, co2Min);
        } else {
            co2Value = mapValue(data.rotation, 0, 180, co2Min, co2Max);
        }

        let aboveValue;
        if (data.rotation > 180) {
            aboveValue = mapValue(data.rotation, 180, 360, aboveMax, aboveMin);
        } else {
            aboveValue = mapValue(data.rotation, 0, 180, aboveMin, aboveMax);
        }

        let belowValue;
        if (data.rotation > 180) {
            belowValue = mapValue(data.rotation, 180, 360, belowMax, belowMin);
        } else {
            belowValue = mapValue(data.rotation, 0, 180, belowMin, belowMax);
        }



        moveSVG('#rainforest', normalizedXPos, normalizedYPos);
        scale('#scalerainforest circle', HotspotValue);

        scale('#co2indicator circle', co2Value);
        scale('#aboveindicator circle', aboveValue);
        scale('#belowindicator circle', belowValue);

        connectSVG('#dashyindicator1 line', normalizedXPos, normalizedYPos);
        connectSVG('#dashyindicator2 line', normalizedXPos, normalizedYPos);
        connectSVG('#dashyindicator3 line', normalizedXPos, normalizedYPos);






    });
}


function drawSVG() {

    const svg = d3
        .select("#d3")
        .append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

    const hotspot1 = svg.append("g").attr("id", "rainforest");
    const currentHotspot1 = hotspot1.append("g").attr("id", "scalerainforest");

    const co2Circle = svg.append("g").attr("id", "co2indicator");
    const carbonAbove = svg.append("g").attr("id", "aboveindicator");
    const carbonBelow = svg.append("g").attr("id", "belowindicator");

    const dashedline1 = svg.append("g").attr("id", "dashyindicator1");
    const dashedline2 = svg.append("g").attr("id", "dashyindicator2");
    const dashedline3 = svg.append("g").attr("id", "dashyindicator3");



    dashedline1
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .attr("x1", co2Xposition)
        .attr("y1", co2Yposition)
        .attr("x2", 0)
        .attr("y2", 0);

    dashedline2
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .attr("x1", aboveXposition)
        .attr("y1", aboveYposition)
        .attr("x2", 0)
        .attr("y2", 0);

    dashedline3
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .attr("x1", belowXposition)
        .attr("y1", belowYposition)
        .attr("x2", 0)
        .attr("y2", 0);

    hotspot1
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", maxSize)
        .attr("cx", 0)
        .attr("cy", 0);

    currentHotspot1
        .append("circle")
        //.attr("class", "inner") //oben scalerainforest .inner
        .style("stroke", "red")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", minSize)
        .attr("cx", 0)
        .attr("cy", 0);

    co2Circle
        .append("circle")
        .style("stroke", "#0022ff")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 100)
        .attr("cx", co2Xposition)
        .attr("cy", co2Yposition);

    carbonAbove
        .append("circle")
        .style("stroke", "#0022ff")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 100)
        .attr("cx", aboveXposition)
        .attr("cy", aboveYposition);

    carbonBelow
        .append("circle")
        .style("stroke", "#0022ff")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 100)
        .attr("cx", belowXposition)
        .attr("cy", belowYposition);
}

function moveSVG(selector, x, y) {
    const movement = d3
        .select(selector)
        .transition()
        .duration(300)
        .ease(d3.easeLinear)
        .attr("transform", () => `translate(${x}, ${y})`);
}

function connectSVG(selector, x, y) {
    const connect = d3
        .select(selector)
        .transition()
        .duration(300)
        .ease(d3.easeLinear)
        .attr("x2", x)
        .attr("y2", y);
}

function scale(selector, rotation) {

    const scaleGroup = d3
        .select(selector)
        .transition()
        .duration(50)
        .ease(d3.easeLinear)
        .attr("r", rotation);
}

function mapValue(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

listenToTokens();
drawSVG();