
// set the dimensions and margins of the graph
const margin4 = { top: 60, right: 30, bottom: 70, left: 160 },
    width4 = 800 - margin4.left - margin4.right,
    height4 = 400 - margin4.top - margin4.bottom;

// append the svg object to the body of the page
const svg4 = d3.select("#my_dataviz4")
    .append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform", `translate(${margin4.left},${margin4.top})`);

// Parse the Data
d3.csv("../data/ProductosXMes.csv").then(function (data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width4])
        .domain(data.map(d => d.Fecha))
        .padding(0.2);
    svg4.append("g")
        .attr("transform", `translate(0, ${height4})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 40])
        .range([height4, 0]);
    svg4.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg4.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Fecha))
        .attr("y", d => y(d.Productos))
        .attr("width", x.bandwidth())
        .attr("height", d => height4 - y(d.Productos))
        .attr("fill", "#005091")
        .append("title")
        .text(function (d) { return d.Fecha + ' \n' + numberWithDots((Math.round(d.Productos))) + ' productos'; })

    svg4.append("text")
        .attr("x", (width4  + margin4.right) / 2)
        .attr("y", -30)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Productos x mes")
        .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}