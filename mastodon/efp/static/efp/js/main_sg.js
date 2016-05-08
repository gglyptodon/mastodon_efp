// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

//// Parse the date / time
//var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
//var x = d3.time.scale().range([0, width]);
//var y = d3.scale.linear().range([height, 0]);
//
// Define the axes
//var xAxis = d3.svg.axis().scale(x)
//    .orient("bottom").ticks(5);
//
//var yAxis = d3.svg.axis().scale(y)
//    .orient("left").ticks(5);
//
// Define the line
//var valueline = d3.svg.line()
//    .x(function(d) { return x(d.date); })
//    .y(function(d) { return y(d.close); });

//var gene=null;
var urltmp = null;
//var geneselect = document.getElementById("#geneselect");
var sgv = function(url){
    console.log("nurl",url);
    if (url){
        urltmp = url;
    }
    console.log("url",url, urltmp);
//geneselect = document.getElementById("geneselect");
//console.log(geneselect.value,"gs");
//gene = geneselect.value;

//var expdata = d3.json("testdata/testdata_efp.json", function(data) {
d3.json(url, function(error, data) {
    var allvals = [];
    console.log("d3",data);
    data = [data];
    var mapping = {
'expression_TPM_Chang_BS':null,
'expression_TPM_Chang_M':null,
'expression_TPM_Denton_BSS1':null,
'expression_TPM_Denton_BSS2':null,
'expression_TPM_Denton_BSS3':null,
'expression_TPM_Denton_BSS4':null,
'expression_TPM_Denton_BSS5':null,
'expression_TPM_Denton_MS1':null,
'expression_TPM_Denton_MS2':null,
'expression_TPM_Denton_MS3':null,
'expression_TPM_Denton_MS4':null,
'expression_TPM_Denton_MS5':null,
'expression_TPM_Li_totalS4':null,
'expression_TPM_Li_totalS9':null,
'expression_TPM_Li_totalS14':null,
'expression_TPM_Tausta_BSS4':null,
'expression_TPM_Tausta_BSS9':null,
'expression_TPM_Tausta_BSS14':null,
'expression_TPM_Tausta_MS4':null,
'expression_TPM_Tausta_MS9':null,
'expression_TPM_Tausta_MS14':null,
};
console.log(data,"data");
data.forEach(function(d) {
	Object.keys(mapping).forEach(function(key) {
        	//console.log(key, d.value,"val",d);
           // if (d.tissue === key ){
                //console.log(gene, d.gene);
		mapping[key]= d.value;
        console.log('key',key, 'val', d[key]);
        allvals.push(d[key]);

		//}
	    });
	})


console.log(mapping);
var z = d3.scale.linear()
.domain(
[ d3.min(allvals)//,function(d){return d.value})
 ,d3.max(allvals)//data,function(d){return d.value})
]).range(["yellow","red"]);
console.log(z);

var div_zmaD2016_select = d3.select("#zmaD2016");
var tissues = Object.keys(mapping); // ["M_S1", "M_S2", "M_S3", "M_S4", "M_S5", "BS_S1","BS_S2", "BS_S3", "BS_S4","BS_S5"];
//d3.text("/static/efp/resources/svg/zma1.svg", function(error, externalSVG) {
d3.text("/static/efp/resources/svg/dummy.svg", function(error, externalSVG) {
         if (error) {console.log(error); return;}
        div_zmaD2016_select.html(externalSVG);
//var t="BS_S1";
tissues.forEach(function(t){
    mapping[t] = data[0][t];
    console.log(t,"tissue", data[0][t]);//, mapping[t], mapping);
        if (mapping[t] == null){}
	else{
            console.log("KAJSHD");
            console.log("path#"+t,mapping[t], z(mapping[t]))
            //console.log("path#"+t, );
            var bla = div_zmaD2016_select.select("svg").select("#layer1");
            console.log(bla,'bla');
            var blabla = bla.select("path#"+t);
            console.log(blabla,'aslkdj')
	//div_zmaD2016_select.select("svg").select("#layer1")
        blabla.attr("style", function(){console.log(mapping[t], z(mapping[t]), "mapping");return "fill:"+z(mapping[t])})
}

});
//var BS1 =  paths
//	.data(data, function(d) { return d.tissue; });
//console.log(BS1);
//console.log(data);
	//.attr("style", function(d,i){
	//	console.log(d, "D",i);return "fill:#FF0000"
	//});
});

});
}
