// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var urltmp = null;

// samples columns, genes rows
var colnames = [
            'expression_TPM_Chang_BS',
            'expression_TPM_Chang_M',
            'expression_TPM_Denton_BSS1',
            'expression_TPM_Denton_BSS2',
            'expression_TPM_Denton_BSS3',
            'expression_TPM_Denton_BSS4',
            'expression_TPM_Denton_BSS5',
            'expression_TPM_Denton_MS1',
            'expression_TPM_Denton_MS2',
            'expression_TPM_Denton_MS3',
            'expression_TPM_Denton_MS4',
            'expression_TPM_Denton_MS5',
            'expression_TPM_Li_totalS4',
            'expression_TPM_Li_totalS9',
            'expression_TPM_Li_totalS14',
            'expression_TPM_Tausta_BSS4',
            'expression_TPM_Tausta_BSS9',
            'expression_TPM_Tausta_BSS14',
            'expression_TPM_Tausta_MS4',
            'expression_TPM_Tausta_MS9',
            'expression_TPM_Tausta_MS14',
        ];
        var mapping = {
            'expression_TPM_Chang_BS': null,
            'expression_TPM_Chang_M': null,
            'expression_TPM_Denton_BSS1': null,
            'expression_TPM_Denton_BSS2': null,
            'expression_TPM_Denton_BSS3': null,
            'expression_TPM_Denton_BSS4': null,
            'expression_TPM_Denton_BSS5': null,
            'expression_TPM_Denton_MS1': null,
            'expression_TPM_Denton_MS2': null,
            'expression_TPM_Denton_MS3': null,
            'expression_TPM_Denton_MS4': null,
            'expression_TPM_Denton_MS5': null,
            'expression_TPM_Li_totalS4': null,
            'expression_TPM_Li_totalS9': null,
            'expression_TPM_Li_totalS14': null,
            'expression_TPM_Tausta_BSS4': null,
            'expression_TPM_Tausta_BSS9': null,
            'expression_TPM_Tausta_BSS14': null,
            'expression_TPM_Tausta_MS4': null,
            'expression_TPM_Tausta_MS9': null,
            'expression_TPM_Tausta_MS14': null,
        };


var rownum = null;
var run = function(url){
    var genemapping={};
    d3.json(url, function (error, data) {
        console.log(data)
        data = JSON.parse(data);//unescape
        var allvals = [];
        var rownames = [];
        console.log(data[0]); //colname in pk; values in fields.COLNAME
        rownum = data.length

        data.forEach(function (d) {
            rownames.push(d.pk)
            var pk = d.pk
            genemapping.pk = null;
            Object.keys(mapping).forEach(function (key) {
                //genemapping.pk[key] = null;
                //console.log(d.fields[key]);
            //    allvals.push(d[key]);
            });
            });
        console.log(rownames);
        console.log(mapping)


        });
}
var sgv = function (url) {
    if (url) {
        urltmp = url;
    }
    d3.json(url, function (error, data) {
        var allvals = [];
        data = [data];
        var mapping = {
            'expression_TPM_Chang_BS': null,
            'expression_TPM_Chang_M': null,
            'expression_TPM_Denton_BSS1': null,
            'expression_TPM_Denton_BSS2': null,
            'expression_TPM_Denton_BSS3': null,
            'expression_TPM_Denton_BSS4': null,
            'expression_TPM_Denton_BSS5': null,
            'expression_TPM_Denton_MS1': null,
            'expression_TPM_Denton_MS2': null,
            'expression_TPM_Denton_MS3': null,
            'expression_TPM_Denton_MS4': null,
            'expression_TPM_Denton_MS5': null,
            'expression_TPM_Li_totalS4': null,
            'expression_TPM_Li_totalS9': null,
            'expression_TPM_Li_totalS14': null,
            'expression_TPM_Tausta_BSS4': null,
            'expression_TPM_Tausta_BSS9': null,
            'expression_TPM_Tausta_BSS14': null,
            'expression_TPM_Tausta_MS4': null,
            'expression_TPM_Tausta_MS9': null,
            'expression_TPM_Tausta_MS14': null,
        };
        data.forEach(function (d) {
            Object.keys(mapping).forEach(function (key) {
                mapping[key] = d.value;
                allvals.push(d[key]);
            });
        });


        var z = d3.scale.linear()
            .domain(
            [d3.min(allvals), (d3.min(allvals)+d3.max(allvals))/2,
                d3.max(allvals)//
            ]).range(["white","yellow", "red"]);

        var div_zmaD2016_select = d3.select("#zmaD2016");
        var tissues = Object.keys(mapping); //
        d3.text("/static/efp/resources/svg/dummy.svg", function (error, externalSVG) {
            if (error) {
                return;
            }
            div_zmaD2016_select.html(externalSVG);
            tissues.forEach(function (t) {
                mapping[t] = data[0][t];
                if (mapping[t] == null) {
                }
                else {
                    var bla = div_zmaD2016_select.select("svg").select("#layer1");
                    var blabla = bla.select("path#" + t);
                    blabla.attr("style", function () {
                        return "fill:" + z(mapping[t])
                    })
                }

            });
        });

 var tmpsvg = d3.select("#legend").append("svg")
     .attr("width", 400)
    .attr("height", 30);


        var defs = tmpsvg.append("defs");

var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "white");
linearGradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "yellow");
linearGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "red");
tmpsvg.append("rect")
    .attr("transform","translate (20,0)")
	.attr("width", 300)
	.attr("height", 30)
	.style("fill", "url(#linear-gradient)");

  tmpsvg.append("text")

	.attr("x", 7)
	.attr("y", 5)
	.attr("dy", "0.9em")
	//.text(d3.min(allvals).toFixed(2));
	.text("0");

    tmpsvg.append("text")

	.attr("x", 320)
	.attr("y", 5)
	.attr("dy", "0.9em")

	.text(d3.max(allvals).toFixed(2));

});


}
