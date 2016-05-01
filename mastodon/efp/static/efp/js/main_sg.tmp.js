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

//var expdata = d3.json("testdata/testdata_efp.json", function(data) {
var expdata = d3.csv("testdata/testdata_efp.csv", function(error, data) {
console.log(data,"data");
console.log(expdata,"expdata");
data.forEach(function(d) {
            console.log(d.tissue)
            d.tissue = d.tissue;
            d.value = +d.value;
        });


console.log(expdata,"e");
var z = d3.scale.linear()
.domain(
[ d3.min(data,function(d){return d.value})
 ,d3.max(data,function(d){return d.value})
]).range(["blue","yellow"]);
console.log(z);

var div_zma_select = d3.select("#zma");
var tissues = ["M_S1", "M_S2", "M_S3", "M_S4", "M_S5", "BS_S1","BS_S2", "BS_S3", "BS_S4","BS_S5"];
d3.text("resources/svg/zma1.svg", function(error, externalSVG) {
         if (error) {console.log(error); return;}
         div_zma_select.html(externalSVG);
        // var svgMS1 = div_zma_select.select("svg").select("#layer1").select("path#M_S1")
       //  svgMS1.data(data).attr("style",function(d){console.log("tt",d.study, d.value, z(d.value));if (d.tissue=="M_S1"){return "fill:"+z(d.value)} else{return "fill:#FF00FF"}});
	// tissues.forEach(function(t){
	//	console.log("TTT",t)
	d3.selectAll("path").select(function(d,i){console.log(d,i,this, this.id, t, this.id==t); return this.id==t ? this:null; });
	//	.data(data)//.each( function(d, i){
                 //console.log(d,i);
  		//if(d.id == t){console.log( d3.select(this).attr("style"),"ST" );}
//		});

	


//		var paths = div_zma_select.select("svg")
//
//		.select("#layer1")
//		.selectAll("path");
//                console.log(paths.attr("style"),"AAAA", paths.attr("id"));
		//.filter(function(d,i){console.log(d,i, this, this.id,"FILTER",this.id==t,this.id,t);return this.id==t})
///		paths.data(data)
	//	.attr("style", function(d){
	//		console.log(d, this.id, this,"STY" )
	//		if (d.tissue == t){
	//			return "fill:"+z(d.value)
	//			}

	//		}
//		);
                //paths.each(function(d){console.log(d)})
		//.filter(function(x,y){ console.log(x,y,"XY");return x.tissue==t})//each(function(d,i){console.log(d,i,"di")});
		
//selectAll("path").data(data) //+t).data(data)
	//	.attr("style", function(d){
//console.log("d.value",d.value,"d.tissue",d.tissue,"t",t);
			//	var old = null// d.attr("style") 
		//		if (d.tissue==t){
		//			return "fill:"+z(d.value)
		//		} 
		//		else{
		//			return old
//
				
			
	});

     //    console.log("ZMA",svgMS1);
         //do_stuff();
});

});
}
