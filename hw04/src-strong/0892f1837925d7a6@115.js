function _1(md){return(
md`# HW04 Strong baseline`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv()
)}

function _columnKey1(artist){return(
Object.keys(artist[0])[9]
)}

function _columnKey2(artist){return(
Object.keys(artist[0])[10]
)}

function _Column1(artist,columnKey1){return(
artist.map(row => row[columnKey1])
)}

function _Column2(artist,columnKey2){return(
artist.map(row => row[columnKey2])
)}

function _scatterplotData(Column1,Column2){return(
Column1.map((value, index) => {
    return { x: value, y: Column2[index] };
})
)}

function _scatterplotData_counts(scatterplotData){return(
scatterplotData.reduce((counts, point) => {
    const key = `${point.x}-${point.y}`;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
}, {})
)}

function _finalData(scatterplotData_counts){return(
Object.keys(scatterplotData_counts).map((key) => {
    const [x, y] = key.split('-');
    return { x, y, count: scatterplotData_counts[key] };
})
)}

function _createSVG(d3,finalData)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // X 軸的比例尺
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(finalData, (d) => +d.x) ]) // 根據 x 的值設定範圍
    .range([0, width]);

  // Y 軸的比例尺
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(finalData, (d) => +d.y) ]) // 根據 y 的值設定範圍
    .range([height, 0]);

  // 創建 SVG 元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 20);

  // 在 SVG 中添加一個包含所有內容的 g 元素
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // 定義半徑的比例尺
  const radiusScale = d3
    .scaleLinear()
    .domain([1, 10, 20, 30, 40, 50, 51]) // 根據 count 的區間設定
    .range([2, 4, 6, 8, 10, 12, 14]); // 對應的半徑值

  // 繪製點
g.selectAll("circle")
  .data(finalData)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(+d.x))
  .attr("cy", (d) => yScale(+d.y))
  .attr("r", (d) => radiusScale(d.count))
  .attr("fill", "#F26B8A")
  .on("mouseover", (event, d) => { // 添加滑鼠移入事件
    const tooltip = d3.select("#tooltip")
      .style("display", "block")
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 25) + "px");

    tooltip.html(`X: ${d.x}<br>Y: ${d.y}<br>Count: ${d.count}`); // 在 tooltip 中顯示更多資訊
  })
  .on("mouseout", () => { // 添加滑鼠移出事件
    d3.select("#tooltip").style("display", "none");
  })
  .append("title")
  .text((d) => `Count: ${d.count}`);

// 創建 tooltip 元素
const tooltipDiv = d3.select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("display", "none")
  .style("position", "absolute")
  .style("background-color", "white")
  .style("padding", "5px")
  .style("border", "1px solid #ddd")
  .style("border-radius", "3px")
  .style("pointer-events", "none"); // 避免 tooltip 影響滑鼠事件


  // X 軸
  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5)); // 設定刻度數量

  // X 軸標籤
  g.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .style("text-anchor", "middle")
    .text("您對於「台灣 2050 淨零排放」政策的瞭解在那個相對位置？");

  // Y 軸
  g.append("g").call(d3.axisLeft(yScale).ticks(5)); // 設定刻度數量

  // Y 軸標籤
  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", -height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("您認為藝術跟台灣 2050 淨零排放政策的相關度為何？");

  // 顯示 SVG
  return svg.node();
}


function _11(md){return(
md`# 結論
從上圖中，我們可以看出：
x軸與y軸所呈現的結果為正相關，代表回答者針對這兩題的了解程度是差不多的。
大部分的人對於 2050 淨零排放的了解程度大約為2
代表說該政策目前對於大部分的人來說不太了解。
極少數的人了解該政策內容
# 參數、函數`
)}

function _partition(d3,radius){return(
data =>
  d3.partition().size([2 * Math.PI, radius * radius])(
    d3
      .hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)
  )
)}

function _radius(){return(
320
)}

function _color(d3){return(
d3
  .scaleOrdinal()
  .domain(["北部", "南部", "中部", "東部", "有，以行動或計畫進行", "沒有", "不清楚", "有，制定藝術永續推動章程", "有，設置專門的永續部門處理"])
  //.range(d3.schemePaired)
  .range(["#A8497A","#F4A7B9","#D7C4BB","#867835","#F7D94C", "#4F726C","#E79460","#7DB9DE","#986DB2"])
  .unknown("#BEBEBE")
)}

function _arc(d3,radius){return(
d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(1 / radius)
  .padRadius(radius)
  .innerRadius(d => Math.sqrt(d.y0))
  .outerRadius(d => Math.sqrt(d.y1) - 1)
)}

function _mousearc(d3,radius){return(
d3
  .arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => Math.sqrt(d.y0))
  .outerRadius(radius)
)}

function _breadcrumbPoints(breadcrumbWidth,breadcrumbHeight){return(
function breadcrumbPoints(d, i) {
  const tipWidth = 10;
  const points = [];
  points.push("0,0");
  points.push(`${breadcrumbWidth},0`);
  points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
  points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
  points.push(`0,${breadcrumbHeight}`);
  if (i > 0) {
    // Leftmost breadcrumb; don't include 6th vertex.
    points.push(`${tipWidth},${breadcrumbHeight / 2}`);
  }
  return points.join(" ");
}
)}

function _breadcrumbHeight(){return(
30
)}

function _breadcrumbWidth(){return(
80
)}

function _20(htl){return(
htl.html`<style>
.tooltip {
  padding: 8px 12px;
  color: white;
  border-radius: 6px;
  border: 2px solid rgba(255,255,255,0.5);
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
  pointer-events: none;
  transform: translate(-50%, -100%);
  font-family: "Helvetica", sans-serif;
  background: rgba(20,10,30,0.4);
  transition: 0.2s opacity ease-out, 0.1s border-color ease-out;
  text-align: center;
}
img {
  border-radius: 4px;
  padding: 5px;
  width: 80px;
  height: 80px;
}
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./artist.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("columnKey1")).define("columnKey1", ["artist"], _columnKey1);
  main.variable(observer("columnKey2")).define("columnKey2", ["artist"], _columnKey2);
  main.variable(observer("Column1")).define("Column1", ["artist","columnKey1"], _Column1);
  main.variable(observer("Column2")).define("Column2", ["artist","columnKey2"], _Column2);
  main.variable(observer("scatterplotData")).define("scatterplotData", ["Column1","Column2"], _scatterplotData);
  main.variable(observer("scatterplotData_counts")).define("scatterplotData_counts", ["scatterplotData"], _scatterplotData_counts);
  main.variable(observer("finalData")).define("finalData", ["scatterplotData_counts"], _finalData);
  main.variable(observer("createSVG")).define("createSVG", ["d3","finalData"], _createSVG);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("partition")).define("partition", ["d3","radius"], _partition);
  main.variable(observer("radius")).define("radius", _radius);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("arc")).define("arc", ["d3","radius"], _arc);
  main.variable(observer("mousearc")).define("mousearc", ["d3","radius"], _mousearc);
  main.variable(observer("breadcrumbPoints")).define("breadcrumbPoints", ["breadcrumbWidth","breadcrumbHeight"], _breadcrumbPoints);
  main.variable(observer("breadcrumbHeight")).define("breadcrumbHeight", _breadcrumbHeight);
  main.variable(observer("breadcrumbWidth")).define("breadcrumbWidth", _breadcrumbWidth);
  main.variable(observer()).define(["htl"], _20);
  return main;
}
