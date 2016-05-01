function tileClick(arg){
    console.log(arg);
    var tmp = svg.selectAll("rect").filter(function(d, i) { return d.hybridid  === arg.hybridid; })//todo
    tmp.active = true;
    console.log("TMP", tmp);
    tmp.attr("stroke",function(d,i){
        if (d.active){
 	        d.active = false
	    }
        else{
            d.active = true;
        }
        console.log("ACT",  d.active, d.plot_id);
        if(d.active){
            return "null";
        }
        else{
           return "black"
        }
    })
    .attr("class", "tile2")
    .attr("stroke-opacity","1")
    .attr("stroke-width","4");
}


function updateLabels(arg) {
    if (arg !=null){
        dmntext =  dmntextlist[arg.value];
        if(arg.value == -1){
            dmntext = "hybridid"
        }
        if (arg.value == -2){
            dmntext = "dummy"
        }

    }
    else{
        index = dmntextlist.indexOf("plot_id");
        dmntext =  dmntextlist[index];
    }
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
