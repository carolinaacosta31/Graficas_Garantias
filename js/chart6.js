
// set the dimensions and margins of the graph
const margin6 = { top: 60, right: 30, bottom: 70, left: 160 },
    width6 = 800 - margin6.left - margin6.right,
    height6 = 400 - margin6.top - margin6.bottom;

// append the svg object to the body of the page
const svg6 = d3.select("#my_dataviz6")
    .append("svg")
    .attr("width", width6 + margin6.left + margin6.right)
    .attr("height", height6 + margin6.top + margin6.bottom)
    .append("g")
    .attr("transform", `translate(${margin6.left},${margin6.top})`);

// Parse the Data
d3.csv("../data/GarantXMunicipios30.csv").then(function (data) {

    let maxGarantias = d3.max(data,
        d => d.Garantias);
    //console.log(maxGarantias)
    maxGarantias = 250743;

    let minGarantias = d3.min(data,
        d => d.Garantias);
    //console.log(minGarantias)
    minGarantias = 5927;

    let cScale = d3.scaleLinear()
        .domain([minGarantias, maxGarantias])
        .range(["#96C03A", "#005091"])

    // X axis
    const x = d3.scaleBand()
        .range([0, width6])
        .domain(data.map(d => d.Municipio))
        .padding(0.2);
    svg6.append("g")
        .attr("transform", `translate(0, ${height6})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 310000])
        .range([height6, 0]);
    svg6.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg6.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Municipio))
        .attr("y", d => y(d.Garantias))
        .attr("width", x.bandwidth())
        .attr("height", d => height6 - y(d.Garantias))
        .attr("fill", d => cScale(d.Garantias))
        .append("title")
        .text(function (d) { return d.Municipio + ' \n' + numberWithDots((Math.round(d.Garantias))) + ' garantías'; })

    svg6.append("g")
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
            return 'translate( ' + ((((i * (width6 / data.length)) + ((width6 / data.length) / 2)) * 0.99) + 8) + ' , ' + (y(d.Garantias) - 5) + '),' + 'rotate(-90)'
                ;
        })

    svg6.append("text")
        .attr("x", (width6 + margin6.right) / 2)
        .attr("y", -30)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Garantías x municipio")
        .attr("style", "fill: black; font-size: 20px; font-family: Helvetica");


})

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}