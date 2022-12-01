let normalizedXPos;
let normalizedYPos;

let maxSize = 500;
let minSize = 250;

let co2Max = 350;
let co2Min = 210;
let co2Xposition = 600;
let co2Yposition = window.innerHeight / 2;

let aboveMax = 350;
let aboveMin = 230;
let aboveXposition = window.innerWidth - 600;
let aboveYposition = 400;

let belowMax = 490;
let belowMin = 350;
let belowXposition = window.innerWidth - 800;
let belowYposition = window.innerHeight - 800;

// let dragHandler;


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

    const hotspot = svg.append("g").attr("id", "rainforest");
    const currentHotspot = hotspot.append("g").attr("id", "scalerainforest");

    const co2Circle = svg.append("g").attr("id", "co2indicator");
    const carbonAbove = svg.append("g").attr("id", "aboveindicator");
    const carbonBelow = svg.append("g").attr("id", "belowindicator");

    const dashedline1 = svg.append("g").attr("id", "dashyindicator1");
    const dashedline2 = svg.append("g").attr("id", "dashyindicator2");
    const dashedline3 = svg.append("g").attr("id", "dashyindicator3");

    //const dragbubble = svg.append("g").attr("id", "dragindicator");


    var dragHandler = d3.drag()
        .on('drag', dragged)

    // var circle = svg.append("circle")
    // .attr("cx", 100)
    // .attr("cy", 100)
    // .attr('r', 50)
    // .style("fill", "white");

    //dragHandler(circle);

    //dragged();





    let strokeDash = "5, 10";
    let strokeThickness = 2;

    dashedline1
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", strokeThickness)
        .attr("stroke-dasharray", strokeDash)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", "40%")

        .attr("x1", co2Xposition)
        .attr("y1", co2Yposition)
        .attr("x2", 0)
        .attr("y2", 0);

        //dragHandler(dashedline1);


    dashedline2
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", strokeThickness)
        .attr("stroke-dasharray", strokeDash)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", "40%")

        .attr("x1", aboveXposition)
        .attr("y1", aboveYposition)
        .attr("x2", 0)
        .attr("y2", 0);

    dashedline3
        .append("line")
        .style("stroke", "white")
        .style("stroke-width", strokeThickness)
        .attr("stroke-dasharray", strokeDash)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", "40%")

        .attr("x1", belowXposition)
        .attr("y1", belowYposition)
        .attr("x2", 0)
        .attr("y2", 0);

    hotspot
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", 4)
        .style("fill", "transparent")
        .attr("stroke-dasharray", "5, 15")
        .attr("stroke-linecap", "round")
        .attr("stroke-dashoffset", "15%")

        .attr("r", maxSize)
        .attr("cx", 0)
        .attr("cy", 0);

    hotspot
        .append("circle")
        .style("fill", "black")
        .attr("opacity", "40%")
        .attr("r", 150)
        .attr("cx", 0)
        .attr("cy", 0);

    hotspot
        .append("text")
        .attr("font-size", 30)
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", +10)
        .attr("fill", "white")
        .text("Place Token")

    currentHotspot
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .style("fill", "url(#hotspot-gradient)")

        .attr("r", minSize)
        .attr("cx", 0)
        .attr("cy", 0);

    co2Xposition = 0;
    co2Yposition = 0;
    co2Circle
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .style("fill", "url(#void-gradient)")
        .attr("r", 100)
        .attr("cx", co2Xposition)
        .attr("cy", co2Yposition);

    dragHandler(co2Circle);



    carbonAbove
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .style("fill", "url(#void-gradient)")

        .attr("r", 100)
        .attr("cx", aboveXposition)
        .attr("cy", aboveYposition);

    carbonBelow
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", 3)
        .style("fill", "url(#void-gradient)")

        .attr("r", 100)
        .attr("cx", belowXposition)
        .attr("cy", belowYposition);



    var hotspotbubble = hotspot.append("defs");
    hotspotbubble.append("radialGradient")
        .attr("id", "hotspot-gradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .selectAll("stop")
        .data([
            { offset: "60%", color: "#2B6D2F" },
            { offset: "75%", color: "#2B6D2F" },
            { offset: "98%", color: "#1A331C" },
            { offset: "100%", color: "#04001e" }
        ])
        .enter().append("stop")
        .attr("offset", function (d) { return d.offset; })
        .attr("stop-color", function (d) { return d.color; });

    var voidbubble = hotspot.append("defs");
    voidbubble.append("radialGradient")
        .attr("id", "void-gradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .selectAll("stop")
        .data([
            { offset: "60%", color: "#04001e" },
            { offset: "80%", color: "#191930" },
            { offset: "98%", color: "#9491BF" },
            { offset: "100%", color: "white" }
        ])
        .enter().append("stop")
        .attr("offset", function (d) { return d.offset; })
        .attr("stop-color", function (d) { return d.color; });
}

///////////////////INTERACTIONS///////////////////////////////////

function moveSVG(selector, x, y) {
    const movement = d3
        .select(selector)
        .transition()
        .duration(50)
        .ease(d3.easeLinear)
        .attr("transform", () => `translate(${x}, ${y})`);
}

function connectSVG(selector, x, y) {

    const connect = d3
        .select(selector)
        .transition()
        .duration(50)
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



function dragged() {

    console.log(this);
    console.log(d3.event);

    var current = d3.select(this);
    current
        .attr("transform", () => `translate(${d3.event.x}, ${d3.event.y})`)
    //.attr('cy', d3.event.y);
}


listenToTokens();
drawSVG();
