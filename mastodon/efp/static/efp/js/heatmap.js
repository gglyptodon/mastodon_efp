function drawHeatmap(url) {
    d3.json(url, function (error, pdata) {
            pdata = JSON.parse(pdata)
            //console.log(pdata)
            var margin = {top: 250, right: 0, bottom: 0, left: 250};

            var blockheight = 40;
            var blockwidth = 40;

            var links = pdata.links;
            var links_orig = JSON.parse(JSON.stringify(links));

            var targetnodes = pdata.queryNodes;
            var sourcenodes = pdata.referenceNodes;
            // collect all values for color range
            var allvalues = [];
            var allvaluesDct = {};
            var perGeneAllVals = {}
            sourcenodes.forEach(function(s){
                console.log(s,"s")
                perGeneAllVals[s.index] = [];
            });

            console.log(links, "links")
            links.forEach(function(l){
                console.log("l.source",l.source, perGeneAllVals)
                perGeneAllVals[l.source].push(l.value) //for the domain
                })
                //console.log(l)
                //perGeneAllVals[l].push(l.value) //for the domain


            //var indexMapX = {};
            //var indexMapY = {};

            var isDesc = true;

            for (x in links) {
                allvalues.push(links[x].value);
                allvaluesDct[links[x].source+"_"+links[x].target] = links[x].value;
            }
            // create svg
            var width = targetnodes.length * blockwidth + margin.right + margin.left; // size according to number of nodes
            var height = sourcenodes.length * blockheight + margin.top + margin.bottom; // size according to number of nodes
            var svg = d3.select("#heatmap")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("margin-left", -margin.left + "px")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //var sortColumnID = 0;
            var orders = {
                indexY: d3.range(sourcenodes.length)
                    .sort(
                    function (a, b) {
                        return d3.ascending(sourcenodes[a].index, sourcenodes[b].index);
                    }),
                indexX: d3.range(targetnodes.length).sort(function (a, b) {
                    return d3.ascending(targetnodes[a].index, targetnodes[b].index);
                }),
                //just the default; onclick reorderByColumn
                //valY: d3.range(sourcenodes.length)
                //    .sort(
                //    function (a, b) {
                //        return d3.descending(allvaluesDct[sourcenodes[a].index+"_"+sortColumnID], allvaluesDct[sourcenodes[b].index+"_"+sortColumnID])
                //    })
            };


            //scales and color //todo scale by row
            var genezDct = {}
            for (x in sourcenodes){
                //console.log(x, "xi")
                genezDct[x] = d3.scale.linear()
                .range(["purple", "yellow"])
                .domain([
                    d3.min(perGeneAllVals[x]),
                    d3.max(perGeneAllVals[x])
                    ]
                    )
            }
            var z = d3.scale.linear().
                range(["purple", "yellow"]).domain([d3.min(allvalues), d3.max(allvalues)]);
            var y_scale = d3.scale.ordinal()
                .rangeBands([0, height - margin.top]); //domain will be defined later

            var x_scale = d3.scale.ordinal().rangeBands([0, width - margin.left]);

            // set domains
            //sortY = orders.indexY;
            x_scale.domain(orders.indexX);
            y_scale.domain(orders.indexY);


            var tileArray; //refers to the links
            var colArray; // refers to targets
            var rowArray; // refers to sources
            var ypos; //for remapping positions when elements are removed/added
            var xpos;
            init();

            // data binding
            bindDataLinks(links);
            bindDataSource(sourcenodes);
            bindDataTarget(targetnodes);

            function bindDataLinks(data) {
                tileArray = svg.select("#heatmapG").selectAll(".tile")
                    .data(data, function (d) {
                        return d.source + "_" + d.target
                    });
            }

            function bindDataTarget(data) {
                colArray = svg.select("#heatmapG").selectAll(".hmcol")
                    .data(data, function (d) {
                    //console.log(d,d.name,"d.name heatmapG, col")
                        return d.name
                    });
            }

            function bindDataSource(data) {
                rowArray = svg.select("#heatmapG").selectAll(".hmrow")
                    .data(data, function (d) {
                        //console.log(d,d.name,"d.name heatmapG, row")
                        return d.name
                    });
            }

            function refreshTarget() {
                bindDataTarget(targetnodes);
            }

            function refreshSource() {
                bindDataSource(sourcenodes);

            }

            function refreshLinks() {
                bindDataLinks(links);
            }

            function hm_enter() {

                refreshTarget();
                refreshSource();
                refreshLinks();
                hm_mapIndex();
                // enter for rows
                rowArray
                    .enter().append("g")
                    .attr("class", "hmrow draggable")
                    .attr("transform", function (d) {

                        return "translate(0," + y_scale(ypos[d.index]) + ")";
                    })
                    .append("text")
                    .attr("transform", function (d) {
                        return "translate(-10," + blockheight / 2 + ")";
                    })
                    .attr("fill", function (d) {
                        return "#000"
                    })
                    .style({"font-size": "10px", "z-index": "999999999"})
                    .style("text-anchor", "end")
                    .text(function (d) {
                        return d.name //accession + ", " + d.condition + ", " + d.AID
                    });
                // enter for cols
                var tmp = tileArray.enter()
                    .append("g")
                    .attr("transform", function (d) {
                        //console.log(xpos[d.target], "xposd.target", d.target, x_scale(d.target), x_scale(xpos[d.target]),d)
                        return "translate(" + +x_scale(xpos[d.target]) + ", " + y_scale(ypos[d.source]) + ")"; //column coordinate //todo scale

                    })
                    .attr("class", "tile");

                tmp.append("rect").attr("width", blockwidth)
                    .attr("height", blockheight)
                    .style("stroke", "black")
                    .style("stroke-width", "1px")
                    .style("fill", function (d) {
                        //console.log(genezDct, d.source, d.value, z, genezDct[d.source])
                        return genezDct[d.source](d.value) //new
                    });
                tmp.append("text")
                    .attr("transform", function (d, i) {
                        return "translate(" + blockwidth / 2 + ", " + blockheight / 2 + ")";
                    })
                    .attr("fill", function (d) {
                        return getContrastYIQ(genezDct[d.source](d.value).slice(1))
                    })
                    .style("stroke-width", 1)
                    .style({"font-size": "10px", "z-index": "999999999"})
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return +d.value.toFixed(1);
                    });


                // enter for cols
                colArray.enter()
                    .append("g")
                    .attr("class", "hmcol")
                    .attr("transform", function (d) {
                        return "translate(" + x_scale(xpos[d.index]) + ",0)";
                    })
                    .append("text")
                    .attr("transform", "translate(" + blockwidth / 2 + ",-10) rotate(-90)") //todo
                    .attr("fill", function (d) {
                        return "#000"
                    })
                    .style({"font-size": "10px", "z-index": "999999999"})
                    .style("text-anchor", "start")
                    .text(function (d) {
                        return d.name //.accession + ", " + d.condition
                    })
                    .on('click',reorderByColumn);


                refreshTarget();
                refreshSource();
                refreshLinks();
            }

            function hm_mapIndex() {
                bindDataSource(sourcenodes);
                ypos = {};
                xpos = {};
                sourcenodes.forEach(
                    function (d, i) {
                        ypos[d.index] = i;
                    }
                );
                targetnodes.forEach(
                    function (d, i) {
                        xpos[d.index] = i;
                    }
                )


            }

            function hm_update() {
                refreshTarget();
                refreshSource();
                refreshLinks();
                x_scale.domain(orders.indexX);
                y_scale.domain(orders.valY, "col",sortColumnID);

                rowArray
                    .attr("transform", function (d) {

                        return "translate(0," + y_scale(ypos[d.index]) + ")";
                    })
                    .select("text")
                    .attr("transform", function (d) {
                        return "translate(-10," + blockheight / 2 + ")";
                    })
                    .attr("fill", function (d) {
                        return "#000"
                    })//
                    .style({"font-size": "10px", "z-index": "999999999"})
                    .style("text-anchor", "end")
                    .text(function (d) {
                        return d.name //accession + ", " + d.condition + ", " + d.AID
                    });


                 var tmp = tileArray
                    .attr("transform", function (d) {
                        return "translate(" + +x_scale(xpos[d.target]) + ", " + y_scale(ypos[d.source]) + ")"; //column coordinate //todo scale

                    })
                    .attr("class", "tile");

                tmp.select("rect").attr("width", blockwidth)
                    .attr("height", blockheight)
                    .style("stroke", "black")
                    .style("stroke-width", "1px")
                    .style("fill", function (d) {
                        //console.log(z, genezDct, d.source)
                        return genezDct[d.source](d.value)
                        //return z(d.value)
                    });
                tmp.select("text")
                    .attr("transform", function (d, i) {
                        return "translate(" + blockwidth / 2 + ", " + blockheight / 2 + ")";
                    })
                    .attr("fill", function (d) {
                        return getContrastYIQ(genezDct[d.source](d.value).slice(1))
                    })
                    .style("stroke-width", 1)
                    .style({"font-size": "10px", "z-index": "999999999"})
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return +d.value.toFixed(1);
                    });


                //
                colArray
                    .attr("class", "hmcol")
                    .attr("transform", function (d) {
                        return "translate(" + x_scale(xpos[d.index]) + ",0)";
                    })
                    .select("text")
                    .attr("transform", "translate(" + blockwidth / 2 + ",-10) rotate(-90)") //todo
                    .attr("fill", function (d) {
                        return "#000"
                    })
                    .style({"font-size": "10px", "z-index": "999999999"})
                    .style("text-anchor", "start")
                    .text(function (d) {
                        return d.name //accession + ", " + d.condition
                    });


            }

            function hm_exit() {
                refreshSource();
                refreshTarget();
                refreshLinks();

                rowArray.exit().remove();
                colArray.exit().remove();
                tileArray.exit().remove();

            }

            function hm_rmFromSource(x) {
                sourcenodes = sourcenodes.filter(function (d) {
                    return d != x
                });
                refreshSource();
            }

            function hm_addToSource(x) {
                sourcenodes.push(x);
                refreshSource();
            }

            function hm_rmFromTarget(x) {
                targetnodes = targetnodes.filter(function (d) {
                    return d != x
                });
                refreshTarget()
            }

            function hm_addToTarget(x) {
                targetnodes.push(x);
                refreshTarget();
            }

            function hm_rmFromLinksTarget(x) {
                links = links.filter(function (d) {
                    return d.target != x.index
                });
                refreshLinks();
            }

            function hm_rmFromLinksSource(x) {
                links = links.filter(function (d) {
                    return d.source != x.index
                });
                refreshLinks();
            }

            function hm_addToLinksSource(x) {
                // grab from original copy
                // select from copy what matches x and available nodes
                var tmp_index = [];
                links_orig.forEach(function (d) {
                    tmp_index.push(d.source + "_" + d.target)
                });

                var tmp = links_orig.filter(function (d) {
                    return tmp_index.indexOf(d.source + "_" + d.target) >= 0
                });
                var sourcen = sourcenodes.map(function (d) {
                    return d.index
                });
                var targetn = targetnodes.map(function (d) {
                    return d.index
                });

                tmp = tmp.filter(function (d) {
                    return sourcen.indexOf(d.source) >= 0
                });
                tmp = tmp.filter(function (d) {
                    return targetn.indexOf(d.target) >= 0;
                });
                tmp.forEach(function (d) {
                    links.push(d)
                });
                refreshLinks();
            }

            function hm_addToLinksTarget(x) {
                // grab from original copy
                // select from copy what matches x and available nodes
                var tmp_index = [];
                links_orig.forEach(function (d) {
                    tmp_index.push(d.source + "_" + d.target)
                });
                var tmp = links_orig.filter(function (d) {
                    return tmp_index.indexOf(d.source + "_" + d.target) >= 0
                });
                var sourcen = sourcenodes.map(function (d) {
                    return d.index
                });
                var targetn = targetnodes.map(function (d) {
                    return d.index
                });
                tmp = tmp.filter(function (d) {
                    return sourcen.indexOf(d.source) >= 0
                });
                tmp = tmp.filter(function (d) {
                    return targetn.indexOf(d.target) >= 0;
                });
                tmp.forEach(function (d) {
                    links.push(d)
                });
                refreshLinks();
            }

            hm_rowButtonClick = function (b) {
                d3.select(b).attr("class", function (d) {
                    if (d.deselected == true) {
                        d.deselected = false;
                        refreshSource();
                        hm_addToSource(d);
                        hm_addToLinksSource(d);
                        hm_enter();
                        return "btn btn-primary btn-xs"
                    }
                    else {
                        d.deselected = true;
                        refreshSource();
                        hm_rmFromSource(d);
                        hm_rmFromLinksSource(d);
                        hm_exit();
                        return "btn btn-primary-outline btn-xs"
                    }
                });
            };

            hm_colButtonClick = function (b) {
                d3.select(b)
                    .attr("class", function (d) {
                        if (d.deselected) {
                            d.deselected = false;
                            refreshTarget();
                            hm_addToTarget(d);
                            hm_addToLinksTarget(d);
                            refreshLinks();
                            hm_enter();
                            return "btn btn-primary btn-xs";
                        }
                        else {
                            d.deselected = true;
                            refreshTarget();
                            hm_rmFromTarget(d);
                            hm_rmFromLinksTarget(d);
                            refreshLinks();
                            hm_exit();
                            return "btn btn-primary-outline btn-xs";
                        }
                    });
            };
            hm_redrawButtonClick = function () {
                hm_mapIndex();
                hm_update();
                hm_enter();
            };
            hm_clearSelection = function () {
                //todo set all buttons to deselected
                // and clear targets and sources
            };

            function init() {
                var heatmapG = svg.append("g")
                    .attr("transform", "translate(50,50)")
                    .attr("id", "heatmapG");
                // draw
                hm_enter();

            }

            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            //color based on background color
            function getContrastYIQ(hexcolor) {
                var r = parseInt(hexcolor.substr(0, 2), 16);
                var g = parseInt(hexcolor.substr(2, 2), 16);
                var b = parseInt(hexcolor.substr(4, 2), 16);
                var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                return (yiq >= 128) ? 'black' : 'white';
            }

            function reorderByColumn(e){
                sortColumnID = e.index;
                if (isDesc == false){
                    orders.valY= d3.range(sourcenodes.length)
                        .sort(
                        function (a, b) {
                            return d3.descending(allvaluesDct[sourcenodes[a].index+"_"+sortColumnID], allvaluesDct[sourcenodes[b].index+"_"+sortColumnID])
                        })
                     isDesc = true;
                     }
                else{
                    orders.valY= d3.range(sourcenodes.length)
                        .sort(
                        function (a, b) {
                            return d3.ascending(allvaluesDct[sourcenodes[a].index+"_"+sortColumnID], allvaluesDct[sourcenodes[b].index+"_"+sortColumnID])
                        })
                    isDesc = false;
                }

                hm_update();
                }


            // add buttons
            // for the rows
//            var rbc = d3.select("#rb").append("div").attr("id", "rbc").selectAll("button");
//            rbc.data(sourcenodes)
//                .enter()
//                .append("text")
//                .append("button")
//                .attr("class", "btn btn-primary btn-xs")
//                .attr("onclick", "hm_rowButtonClick(this)")
//                .text(function (d) {
//                    return d.name;
//                })
//
//            var cbc = d3.select("#cb").append("div").attr("id", "cbc").selectAll("button");
//            cbc.data(targetnodes)
//                .enter()
//                .append("button")
//                .attr("class", "btn btn-primary btn-xs")
//                .attr("onclick", "hm_colButtonClick(this)")
//                .text(function (d) {
//                    return d.name;
//                })

        }
    );

}