
// set the dimensions and margins of the graph
const margin2 = { top: 60, right: 30, bottom: 70, left: 160 },
    width2 = 800 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
const svg2 = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", `translate(${margin2.left},${margin2.top})`);

// Parse the Data
d3.csv("../data/IntermediariosXMes.csv").then(function (data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width2])
        .domain(data.map(d => d.Fecha))
        .padding(0.2);
    svg2.append("g")
        .attr("transform", `translate(0, ${height2})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 80])
        .range([height3, 0]);
    svg2.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg2.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Fecha))
        .attr("y", d => y(d.Intermediarios))
        .attr("width", x.bandwidth())
        .attr("height", d => height3 - y(d.Intermediarios))
        .attr("fill", "#005091")
        .append("title")
        .text(function (d) { return d.Fecha + ' \n' + numberWithDots((Math.round(d.Intermediarios))) + ' Intermediarios'; })

    svg2.append("text")
        .attr("x", (width2  + margin2.right) / 2)
        .attr("y", -30)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Intermediarios x mes")
        .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}