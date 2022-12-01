var dragsvg = d3.select("#d3").append('svg')
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)

var dragHandler = d3.drag()
    .on('drag', dragged)
// .on('start', dragstarted);

var circle = dragsvg.append("circle")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr('r', 100)
    .style("fill", "red");

dragHandler(circle);


function dragged() {
    var current = d3.select(this);
    current
        .attr('cx', d3.event.x)
        .attr('cy', d3.event.y);
}