const margin = { top: 50, right: 30, bottom: 20, left: 250 };
const width = 1000 - margin.left - margin.right;
const height = 1800 - margin.top - margin.bottom;

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);


d3.csv("../data.csv").then((data) => {

    
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

   
    const legendSvg = d3
    .select("#legend")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 30);

    legendSvg
        .selectAll("rect")
        .data([
        "作業一",
        "作業二",
        "作業三",
        "作業四",
        "作業五",
        "作業六",
        "作業七",
        "作業八",
        "作業九",
        "作業十",
        ])
        .enter()
        .append("rect")
        .attr("x", (d, i) => i *70+20)
        .attr("y", 10)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", colorScale);

    legendSvg
        .selectAll("text")
        .data([
        "作業一",
        "作業二",
        "作業三",
        "作業四",
        "作業五",
        "作業六",
        "作業七",
        "作業八",
        "作業九",
        "作業十",
        ])
        .enter()
        .append("text")
        .attr("x", (d, i) => i * 70+40)
        .attr("y", 25)
        .text((d) => d);


    const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);



    const yScale = d3.scaleBand()
        .domain(data.map((d) => `${d["班級"]} - ${d["學號"]} - ${d["姓名"]}`))
        .range([0, height])
        .padding(0.4);


    const series = d3
        .stack()
        .keys([
        "作業一",
        "作業二",
        "作業三",
        "作業四",
        "作業五",
        "作業六",
        "作業七",
        "作業八",
        "作業九",
        "作業十",
        ])(data);

    svg
        .selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .attr("fill", (d) => colorScale(d.key))
        .selectAll("rect")
        .data((d) => d)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d[0]))
        .attr("y",  (d, i) => yScale(data[i]["班級"] + " - " + data[i]["學號"] + " - " + data[i]["姓名"]))
        .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
        .attr("height", yScale.bandwidth());


    svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));


    svg
        .append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));
});




