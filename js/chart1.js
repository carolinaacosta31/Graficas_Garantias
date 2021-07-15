
// set the dimensions and margins of the graph
const margin = { top: 60, right: 30, bottom: 70, left: 160 },
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("../data/NumGarantXmes.csv").then(function (data) {

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
    .domain([0, 100000])
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
    .attr("fill", "#005091")
    .append("title")
    .text(function (d) { return d.Fecha + ' \n' + numberWithDots((Math.round(d.Garantias))) + ' garantías'; })

  svg.append("text")
    .attr("x", (width  + margin.right) / 2)
    .attr("y", -30)
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .text("Garantías x mes")
    .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}