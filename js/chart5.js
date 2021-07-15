
// set the dimensions and margins of the graph
const margin5 = { top: 60, right: 30, bottom: 70, left: 160 },
    width5 = 800 - margin5.left - margin5.right,
    height5 = 400 - margin5.top - margin5.bottom;

// append the svg object to the body of the page
const svg5 = d3.select("#my_dataviz5")
    .append("svg")
    .attr("width", width5 + margin5.left + margin5.right)
    .attr("height", height5 + margin5.top + margin5.bottom)
    .append("g")
    .attr("transform", `translate(${margin5.left},${margin5.top})`);

// Parse the Data
d3.csv("../data/GarantXDepto.csv").then(function (data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width5])
        .domain(data.map(d => d.Departamento))
        .padding(0.2);
    svg5.append("g")
        .attr("transform", `translate(0, ${height5})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 260000])
        .range([height5, 0]);
    svg5.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg5.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Departamento))
        .attr("y", d => y(d.Garantias))
        .attr("width", x.bandwidth())
        .attr("height", d => height5 - y(d.Garantias))
        .attr("fill", "#005091")
        .append("title")
        .text(function (d) { return d.Departamento + ' \n' + numberWithDots((Math.round(d.Garantias))) + ' garantías'; })

    svg5.append("text")
        .attr("x", (width5  + margin5.right) / 2)
        .attr("y", -30)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Garantías x departamento")
        .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}