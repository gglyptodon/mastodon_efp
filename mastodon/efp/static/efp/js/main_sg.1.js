// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
    
// Adds the svg canvas

//var maize = d3.select("#zma")
//.append("object")
//.attr("data", "resources/svg/zma.svg")
//.attr("width", 335)
//.attr("height", 394)
//.attr("type", "image/svg+xml");


var div_zma = document.getElementById('zma')
d3.xml("resources/svg/zma1.svg", "image/svg+xml", function(error, xml) {
  if (error) throw error;
  div_zma.appendChild(xml.documentElement);
});
var bs1 = d3.select("#zma").select("svg2").selectAll("g").select("#layer1");
console.log(bs1);
// Get the data
