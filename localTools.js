(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.j_lt = global.j_lt || {})));
}(this, (function (exports) { 'use strict';

var version="0.0.1"

var popRows=function(dat){
    dat=dat.slice(0,100)
    var r=table.select('tbody').selectAll("tr")
        .data(dat).enter().append('tr')

    r.selectAll("td")
        .data(d=>Object.values(d)).enter().append("td")
        .text(d=>d)

    for(var aa of ['Both','Primary','Second']){
        r.selectAll("td.b_"+aa)  
    //use a class so you don't re-select the existing <td> elements
            .data(function(d) {return [d];})
            .enter()
            .append("td")
            .attr("class", "b_"+aa)
            .append("button")
            .text(function(d){return aa})
            .on("click", function(d){
                // console.log([this.innerHTML,currentTable,d['Code']])
                stButton([this.innerHTML,currentTable,d['Code']])
            })  
    }
    // return r;
}

var stButton=function(d){
    ptArray=ptArray.concat([{'patient':currentPatient,'Path':d[0],'Type':d[1],'Code':d[2]}])
    ptab.select('tbody').selectAll("tr").remove()
    var shw=function(d) {return({'Path':d.Path,'Type':d.Type,'Code':d.Code})}
    var r=ptab.select('tbody').selectAll('tr').data(ptArray.map(shw)).enter().append('tr')
    r.selectAll('td').data(d=>Object.values(d)).enter().append('td').text(d=>d)
}

function drawTable(data) {
    var column_names=Object.keys(data[0])
    table.select('thead').append('tr').selectAll('th').data(column_names)
        .enter().append("th").text(function(d){return d})
    popRows(data)
}

function selectTab(tabName) {
    d3.select("#searchTableTitle").text(dl[tabName].header)
    table.select('thead').select('tr').remove()
    table.select('tbody').selectAll("tr").remove()
    // var column_names=Object.keys(dl[tabName].data[0])
    // table.select('thead').append('tr').selectAll('th').data(column_names)
    //     .enter().append("th").text(function(d){return d})
    // rows=popRows(dl[tabName].data)
    drawTable(dl[tabName].data)
    currentTable=tabName
}

// function drawTable(data, tableid, dimensions, valueFunc, textFunc, columns) {

//     var sortValueAscending = function (a, b) { return valueFunc(a) - valueFunc(b) }
//     var sortValueDescending = function (a, b) { return valueFunc(b) - valueFunc(a) }
//     var sortNameAscending = function (a, b) { return textFunc(a).localeCompare(textFunc(b)); }
//     var sortNameDescending = function (a, b) { return textFunc(b).localeCompare(textFunc(a)); }
//     var metricAscending = true;
//     var nameAscending = true;

//     var width = dimensions.width + "px";
//     var height = dimensions.height + "px";
//     var twidth = (dimensions.width - 25) + "px";
//     var divHeight = (dimensions.height - 60) + "px";

//     var outerTable = d3.select(tableid).append("table").attr("width", width);

//     outerTable.append("tr").append("td")
//         .append("table").attr("class", "headerTable").attr("width", twidth)
//         .append("tr").selectAll("th").data(columns).enter()
// 		.append("th").text(function (column) { return column; })
//         .on("click", function (d) {
//             // Choose appropriate sorting function.
//             if (d === columns[1]) {
// 			    var sort = metricAscending ? sortValueAscending : sortValueDescending;
//                 metricAscending = !metricAscending;
//             } else if(d === columns[0]) {
// 				var sort = nameAscending ? sortNameAscending : sortNameDescending
//                 nameAscending = !nameAscending;
//             }
			
//             var rows = tbody.selectAll("tr").sort(sort);
//         });

//     var inner = outerTable.append("tr").append("td")
// 		.append("div").attr("class", "scroll").attr("width", width).attr("style", "height:" + divHeight + ";")
// 		.append("table").attr("class", "bodyTable").attr("border", 1).attr("width", twidth).attr("height", height).attr("style", "table-layout:fixed");

//     var tbody = inner.append("tbody");
//     // Create a row for each object in the data and perform an intial sort.
//     var rows = tbody.selectAll("tr").data(data).enter().append("tr").sort(sortValueDescending);

//     // Create a cell in each row for each column
//     var cells = rows.selectAll("td")
//         .data(function (d) {
//             return columns.map(function (column) {
//                 return { column: column, text: textFunc(d), value: valueFunc(d)};
//             });
//         }).enter().append("td")
// 		.text(function (d) {
// 			if (d.column === columns[0]) return d.text;
// 			else if (d.column === columns[1]) return d.value;
// 		});
// }

exports.drawTable=drawTable;
exports.popRows=popRows;
exports.selectTab=selectTab;

Object.defineProperty(exports, '__esModule', { value: true });

})));