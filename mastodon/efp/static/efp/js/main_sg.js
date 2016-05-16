// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var urltmp = null;
var sgv = function (url) {
    console.log("nurl", url);
    if (url) {
        urltmp = url;
    }
    console.log("url", url, urltmp);
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

                //}
            });
        });


        var z = d3.scale.linear()
            .domain(
            [d3.min(allvals), (d3.min(allvals)+d3.max(allvals))/2,
                d3.max(allvals)//data,function(d){return d.value})
            ]).range(["white","yellow", "red"]);
        console.log(z);

        var div_zmaD2016_select = d3.select("#zmaD2016");
        var tissues = Object.keys(mapping); // ["M_S1", "M_S2", "M_S3", "M_S4", "M_S5", "BS_S1","BS_S2", "BS_S3", "BS_S4","BS_S5"];
//d3.text("/static/efp/resources/svg/zma1.svg", function(error, externalSVG) {
        d3.text("/static/efp/resources/svg/dummy.svg", function (error, externalSVG) {
            if (error) {
                console.log(error);
                return;
            }
            div_zmaD2016_select.html(externalSVG);
//var t="BS_S1";
            tissues.forEach(function (t) {
                mapping[t] = data[0][t];
                console.log(t, "tissue", data[0][t]);//, mapping[t], mapping);
                if (mapping[t] == null) {
                }
                else {
                    console.log("KAJSHD");
                    console.log("path#" + t, mapping[t], z(mapping[t]))
                    //console.log("path#"+t, );
                    var bla = div_zmaD2016_select.select("svg").select("#layer1");
                    console.log(bla, 'bla');
                    var blabla = bla.select("path#" + t);
                    console.log(blabla, 'aslkdj')
                    //div_zmaD2016_select.select("svg").select("#layer1")
                    blabla.attr("style", function () {
                        console.log(mapping[t], z(mapping[t]), "mapping");
                        return "fill:" + z(mapping[t])
                    })
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
