
// set the dimensions and margins of the graph
const margin3 = { top: 60, right: 30, bottom: 70, left: 160 },
    width3 = 800 - margin3.left - margin3.right,
    height3 = 400 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
const svg3 = d3.select("#my_dataviz3")
    .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
    .attr("transform", `translate(${margin3.left},${margin3.top})`);

// Parse the Data
d3.csv("../data/SucursalesXMes.csv").then(function (data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width3])
        .domain(data.map(d => d.Fecha))
        .padding(0.2);
    svg3.append("g")
        .attr("transform", `translate(0, ${height3})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 4500])
        .range([height3, 0]);
    svg3.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg3.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Fecha))
        .attr("y", d => y(d.sucursales))
        .attr("width", x.bandwidth())
        .attr("height", d => height3 - y(d.sucursales))
        .attr("fill", "#005091")
        .append("title")
        .text(function (d) { return d.Fecha + ' \n' + numberWithDots((Math.round(d.sucursales))) + ' sucursales'; })

    svg3.append("text")
        .attr("x", (width3  + margin3.right) / 2)
        .attr("y", -30)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Sucursales x mes")
        .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}