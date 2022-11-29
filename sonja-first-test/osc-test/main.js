
// create svg element:
var svg = d3
.select("#hammer")
.append("svg")
.attr("width", 800)
.attr("height", 800)

// Add the path 
svg.append('circle')
  .attr('id', 'circle1')
  .attr('cx', 200)
  .attr('cy', 100)
  .attr('r', 20)
  .attr('stroke', 'black')
  .attr('fill', '#69a3b2');


// https://hammerjs.github.io/getting-started/

var myElement = document.getElementById('circle1');


var hammertime = new Hammer(myElement);
hammertime.on('pan', function(ev) {
	console.log(ev);
});
hammertime.on("panleft panright tap press", function(ev) {
  myElement.textContent = ev.type +" gesture detected.";
});

hammertime.get('pinch').set({ enable: true });
hammertime.get('press').set({ enable: true });
hammertime.get('rotate').set({ enable: true });

hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  
  // // only detectable on touch devices
  hammertime.on('rotate', (event) => {
    hammerPlayground.textContent = event.type + ' ';
    hammerPlayground.textContent += `<br> ${event}`;
  });

  hammertime.on('press', (event) => {
    svg.append('circle')
    .style("fill", d3.color("steelblue") );
  });