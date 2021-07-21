
// set the dimensions and margins of the graph
const margin = { top: 60, right: 30, bottom: 70, left: 160 },
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// declare data varible
let data_tot

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("../data/NumGarantXmes.csv").then(function (data) {

  // List of subgroups = header of the csv files = soil condition here // PARA MOUSEON
  // const data2 = d3.transpose(data)
  // //const subgroups = data2.columns.slice(1)
  //console.log(data) // PARA LEER LOS DATOS PARA LA TABLA
  globalThis.data_tot = data

  // const stackedData = d3.stack() // PARA MOUSEON
  //   .keys(subgroups)
  //   (data)

  let maxGarantias = d3.max(data,
    d => d.Garantias);  
    //console.log(maxGarantias)

  let minGarantias = d3.min(data,
    d => d.Garantias);
    //console.log(minGarantias)

  let cScale = d3.scaleLinear()
    .domain([minGarantias, maxGarantias])
    .range(["#96C03A", "#005091"])

  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Fecha))
    .padding(0.2);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 115000])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.Fecha))
    .attr("y", d => y(d.Garantias))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Garantias))
    .attr("fill", d => cScale(d.Garantias))
    //.attr("fill", "#005091")
    //.attr("class", d => "myRect " + d.key) // PARA MOUSEON
    .append("title")
    .text(function (d) { return d.Fecha + ' \n' + numberWithDots((Math.round(d.Garantias))) + ' garantías'; })

  svg.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) {
      return numberWithDots((Math.round(d.Garantias)));
    })
    .attr("text-anchor", "start")
    .attr("class", "yAxis")
    .attr("style", "font-size: 12px; font-family: Helvetica, sans-serif")
    .attr("fill", "#005091")
    .attr('transform', (d, i) => {
      return 'translate( ' + ((((i * (width / data.length)) + ((width / data.length) / 2)) * 0.99) + 8) + ' , ' + (y(d.Garantias) - 5) + '),' + 'rotate(-90)'
        ;
    })

  svg.append("text")
    .attr("x", (width + margin.right) / 2)
    .attr("y", -30)
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .text("Garantías por mes")
    .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// //console.log('hola')
// //console.log(data_tot)
// var xValues = ['A', 'B', 'C', 'D', 'E'];

// var yValues = ['W', 'X', 'Y', 'Z'];

// var zValues = [
//   [0.00, 0.00, 0.75, 0.75, 0.00],
//   [0.00, 0.00, 0.75, 0.75, 0.00],
//   [0.75, 0.75, 0.75, 0.75, 0.75],
//   [0.00, 0.00, 0.00, 0.75, 0.00]
// ];

// var colorscaleValue = [
//   [0, '#3D9970'],
//   [1, '#001f3f']
// ];

// var data = [{
//   x: xValues,
//   y: yValues,
//   z: zValues,
//   type: 'heatmap',
//   colorscale: colorscaleValue,
//   showscale: false
// }];

// var layout = {
//   title: 'Annotated Heatmap',
//   annotations: [],
//   xaxis: {
//     ticks: '',
//     side: 'top'
//   },
//   yaxis: {
//     ticks: '',
//     ticksuffix: ' ',
//     width: 700,
//     height: 700,
//     autosize: false
//   }
// };

// for (var i = 0; i < yValues.length; i++) {
//   for (var j = 0; j < xValues.length; j++) {
//     var currentValue = zValues[i][j];
//     if (currentValue != 0.0) {
//       var textColor = 'white';
//     } else {
//       var textColor = 'black';
//     }
//     var result = {
//       xref: 'x1',
//       yref: 'y1',
//       x: xValues[j],
//       y: yValues[i],
//       text: zValues[i][j],
//       font: {
//         family: 'Arial',
//         size: 12,
//         color: 'rgb(50, 171, 96)'
//       },
//       showarrow: false,
//       font: {
//         color: textColor
//       }
//     };
//     layout.annotations.push(result);
//   }
// }

// Plotly.newPlot('myDiv', data, layout);
