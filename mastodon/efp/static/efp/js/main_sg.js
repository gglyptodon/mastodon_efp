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
    
var sgv = function(){

var div_zma_select = d3.select("#zma");
d3.text("resources/svg/zma1.svg", function(error, externalSVGText) {
         if (error) {console.log(error); return;}

         div_zma_select.html(externalSVGText);

         var svg = div_zma_select.select("svg").select("#layer1").select("path#M_S1").attr("style","fill:#00FFFF");

         console.log("ZMA",svg);
         //do_stuff();
});
}
