
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

//  var myElement = document.getElementById('circle1');


// var hammertime = new Hammer(myElement);
// hammertime.on('pan', function(ev) {
// 	console.log(ev);
// });
// hammertime.on("panleft panright tap press", function(ev) {
//   myElement.textContent = ev.type +" gesture detected.";
// });

// hammertime.get('pinch').set({ enable: true });
// hammertime.get('press').set({ enable: true });
// // hammertime.get('rotate').set({ enable: true });

// hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
// hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  
//   // // only detectable on touch devices
//   // hammertime.on('rotate', (event) => {
//   //   hammerPlayground.textContent = event.type + ' ';
//   //   hammerPlayground.textContent += `<br> ${event}`;
//   // });

//   hammertime.on('press', (event) => {
//     svg.append('circle1')
//     hammerPlayground.textContent = event.type + 'pressed';
//     hammerPlayground.textContent += `<br> ${event}`;
//   });

  var myElement = document.getElementById('circle1');
  var statusBar = document.getElementById('status');
  
  // create a simple instance on our object
  var hammertime = new Hammer(myElement);
  hammertime.on('pan', function(ev) {
    	console.log(ev);
   });

  hammertime.on("panleft panright tap press", function(ev) {
  myElement.textContent = ev.type +" gesture detected.";
});
  
  // add a "PAN" recognizer to it (all directions)
  hammertime.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
  
  // tie in the handler that will be called
  hammertime.on("pan", handleDrag);
  
  // poor choice here, but to keep it simple
  // setting up a few vars to keep track of things.
  // at issue is these values need to be encapsulated
  // in some scope other than global.
  var lastPosX = 0;
  var lastPosY = 0;
  var isDragging = false;
  function handleDrag(ev) {
    
    // for convience, let's get a reference to our object
    var elem = ev.target;
    
    // DRAG STARTED
    // here, let's snag the current position
    // and keep track of the fact that we're dragging
    if ( ! isDragging ) {
      isDragging = true;
      lastPosX = elem.offsetLeft;
      lastPosY = elem.offsetTop;
      setStatus("You, sir, are dragging me...");
      
     //setElementText("WOAH");
    }
    
    // we simply need to determine where the x,y of this
    // object is relative to where it's "last" known position is
    // NOTE: 
    //    deltaX and deltaY are cumulative
    // Thus we need to always calculate 'real x and y' relative
    // to the "lastPosX/Y"
    var posX = ev.deltaX + lastPosX;
    var posY = ev.deltaY + lastPosY;
    
    // move our element to that position
    elem.style.left = posX + "px";
    elem.style.top = posY + "px";
    
    // DRAG ENDED
    // this is where we simply forget we are dragging
    if (ev.isFinal) {
      isDragging = false;
      setStatus("Much better. It's nice here.");
      setBlockText("Thanks");
    }
  }
  
  function setStatus(msg) {
    statusBar.textContent = msg;
  }
  function setBlockText(msg) {
    myBlock.textContent = msg;
  }