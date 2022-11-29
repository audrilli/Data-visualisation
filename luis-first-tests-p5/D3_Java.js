
function listenToTokens() {
    const { wsPort } = Osc();

    console.log("wsPort: ", wsPort);

    // receiving token data
    wsPort.on("updateDevice", (data) => {
        // data.x and data.y are values between 0–1
        const normalizedXPos = window.innerWidth * data.x;
        const normalizedYPos = window.innerHeight * data.y;

        // moveSVG(normalizedXPos, normalizedYPos);
        //rotateSVG(data.rotation);
        // updateText(Math.round(data.rotation));
        moveSVG('#circlegroupindicator1', normalizedXPos, normalizedYPos);
        scale('#scaleindicator1', data.rotation);

        moveSVG('#circleonegroupindicator2', 200, 200);
        scale('#scaleindicator2', data.rotation/2);
        // scale('#circleonegroupindicator2', data.rotation);
        // scale('#circleonegroupindicator3', data.rotation);
    });
}


function drawSVG() {

    const svg = d3
        .select("#d3")
        .append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

    const CircleGroup1 = svg.append("g").attr("id", "circlegroupindicator1");
    const innerCircleGroup1 = CircleGroup1.append("g").attr("id", "scaleindicator1");
    //firstGroup = svg.append("g").attr("id", "circleonegroupindicator");
    const CircleGroup2 = svg.append("g").attr("id", "circleonegroupindicator2");
    const innerCircleGroup2 = CircleGroup2.append("g").attr("id", "scaleindicator2");

    const Circle3Group = svg.append("g").attr("id", "circleonegroupindicator3");
    //const rotatingGroup = indicatorGroup.append("g").attr("id", "rotate");

    // d3.select('#circleonegroupindicator')
    //     .append("circle")
    //     .style("stroke", "#0022ff")
    //     .style("stroke-width", 3)
    //     .style("fill", "transparent")

    //     .attr("r", 100)
    //     .attr("cx", 0)
    //     .attr("cy", 0);

    CircleGroup1
        .append("circle")
        .style("stroke", "#0022ff")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 100)
        .attr("cx", 0)
        .attr("cy", 0);

    innerCircleGroup1
        .append("circle")
        .style("stroke", "red")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 20)
        .attr("cx", 0)
        .attr("cy", 0);


    CircleGroup2
        .append("circle")
        .style("stroke", "#0022ff")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 100)
        .attr("cx", 0)
        .attr("cy", 0);

    innerCircleGroup2
        .append("circle")
        .style("stroke", "red")
        .style("stroke-width", 3)
        .style("fill", "transparent")

        .attr("r", 20)
        .attr("cx", 0)
        .attr("cy", 0);

}

function moveSVG(selector, x, y) {
    const movement = d3
        .select(selector)
        .transition()
        .duration(300)
        .ease(d3.easeLinear)
        .attr("transform", () => `translate(${x}, ${y})`);
}

function scale(selector, rotation) {
    const scaleValue = rotation / 100;

    const circleGroup = d3
        .select(selector)
        .transition()
        .duration(300)
        .ease(d3.easeLinear)
        .attr("transform", `scale(${scaleValue})`);
}

listenToTokens();
drawSVG();