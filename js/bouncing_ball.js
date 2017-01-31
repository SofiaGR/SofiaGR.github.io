var width = document.getElementsByClassName('bouncing_ball_container')[0].offsetWidth,
    height = document.getElementsByClassName('bouncing_ball_container')[0].offsetHeight;

console.log('width: ', width, 'height: ', height);

var svg = d3.select('.bouncing_ball_container').append('svg')
    .attr('width', width)
    .attr('height', height)
    .on("mousemove", function() { var pt = d3.mouse(this); tick(pt); });
	
// Create the svg:defs element and the main gradient definition.
var svgDefs = svg.append('defs');

var grads = svgDefs.append('radialGradient')
    .attr('gradientUnits', 'objectBoundingBox')
	.attr("id", "gradient")
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '100%');

grads.append('stop')
    .attr('offset', '0%')
    .style('stop-color', 'white');

grads.append('stop')
    .attr('offset', '100%')
    .style('stop-color',  '#41c1c0');

var bounce_g = svg.append('g');

/*var string = bounce_g.append('line')
                .style("stroke", "#002e72")  // colour the line
                .attr("x1", 100)     // x position of the first end of the line
                .attr("y1", 50)      // y position of the first end of the line
                .attr("x2", 300)     // x position of the second end of the line
                .attr("y2", 150)    // y position of the second end of the line
                .on("mousemove", mousemove)

var circle = bounce_g.append('circle')
                .attr('class', 'bouncing-circle')
                .attr('cx', 100)
                .attr('cy', 50)
                .attr('r', 20)
                .attr('fill', 'url(#gradient)');

function mousemove() {
    d3.select(this)
        .attr('x1', d3.event.x)
        .attr('y1', d3.event.y)
        .attr('x2', d3.event.x + 200)
        .attr('y2', d3.event.y + 100);
}*/

/////
var npoints = 100;
var ptdata = [];

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d, i) { return d[0]; })
    .y(function(d, i) { return d[1]; });

var path = svg.append("g")
    .append("path")
    .data([ptdata])
    .attr("class", "line regular-mode ")
    .attr("d", line);

function tick(pt) {
    //console.log('tick: ', pt);
    // push a new data point onto the back
    ptdata.push(pt);

    // Redraw the path:
    path
        .attr("d", function(d) { return line(d);})

    // If more than 100 points, drop the old data pt off the front
    if (ptdata.length > npoints) {
        ptdata.shift();
    }
}

var regular_mode = true;
d3.select('.picasso-span')
    .style('cursor', 'pointer')
    .on('click', function() {
        d3.select(this)
            .html(!regular_mode ? "But it's Picasso!" : 'No more Picasso?');

       d3.select('.line')
           .classed('picasso-mode', regular_mode)
           .classed('regular-mode', !regular_mode);

        regular_mode = !regular_mode;
    });

/*
 this.Move = function () {
 var svg = thisobj.svg;

 //thisobj.posX += Math.cos(thisobj.aoa) * thisobj.jumpSize;
 //thisobj.posY += Math.sin(thisobj.aoa) * thisobj.jumpSize;

 thisobj.posX += thisobj.vx;
 thisobj.posY += thisobj.vy;

 if (parseInt(svg.attr('width')) <= (thisobj.posX + thisobj.radius)) {
 thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
 thisobj.aoa = Math.PI - thisobj.aoa;
 thisobj.vx = -thisobj.vx;
 }

 if ( thisobj.posX < thisobj.radius) {
 thisobj.posX = thisobj.radius+1;
 thisobj.aoa = Math.PI - thisobj.aoa;
 thisobj.vx = -thisobj.vx;
 }

 if (parseInt(svg.attr('height')) < (thisobj.posY + thisobj.radius)) {
 thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
 thisobj.aoa = 2 * Math.PI - thisobj.aoa;
 thisobj.vy = -thisobj.vy;
 }

 if (thisobj.posY < thisobj.radius) {
 thisobj.posY = thisobj.radius+1;
 thisobj.aoa = 2 * Math.PI - thisobj.aoa;
 thisobj.vy = -thisobj.vy;
 }

 // **** NOT USING AOA except during initilization. Just left this for future reference *****
 if (thisobj.aoa > 2 * Math.PI)
 thisobj.aoa = thisobj.aoa - 2 * Math.PI;
 if (thisobj.aoa < 0)
 thisobj.aoa = 2 * Math.PI + thisobj.aoa;

 thisobj.Draw();
 }
 */