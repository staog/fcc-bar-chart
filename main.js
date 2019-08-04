function chart(dataset){

  let margin = 50;
  let w = 800;
  let h = 480;
  let singleBar = w/275;
  
  let tooltip = d3.select("#chart")
                  .append("div")
                  .attr("id", "tooltip")
                  .style("opacity", 0)
  
  const GDP = dataset.map(d => d[1]);
  const linearScale = d3.scaleLinear()
                        .domain([0, d3.max(GDP)])
                        .range([margin, h - margin]);
  const scaledGDP = GDP.map(d => linearScale(d));
  const years = dataset.map(d => new Date(d[0]));
  
  const xScale = d3.scaleTime()
                   .domain([d3.min(years), d3.max(years)])
                   .range([margin, w - margin]);
  
  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(GDP)])
                   .range([h - margin, margin])
  
  const svg = d3.select("#chart")
                .append("svg")
                .attr("align", "centre")
                .attr("width", w)
                .attr("height", h);
  
  svg.append('text')
      .attr("class", "text")
      .attr('transform', 'rotate(-90)')
      .attr('x', -230)
      .attr('y', 80)
      .text('Gross Domestic Product');
  
  svg.append('text')
     .attr("class", "text")
     .attr('x', w/2.7 + 120)
     .attr('y', h - 10)
     .text('Growth of GDP through the years after WWII')
  
  const xAxis = d3.axisBottom()
                   .scale(xScale);
  
  const yAxis = d3.axisLeft()
                  .scale(yScale);
  
   svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", "translate(0, " + (h - margin) + ")")
     .call(xAxis);

  svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", "translate(" + margin + ", 0)") 
     .call(yAxis);  
  
  svg.selectAll("rect")
     .data(scaledGDP)
     .enter()
     .append("rect")
     .attr("class", "bar")
     .attr('data-date', (d, i) => dataset[i][0])
     .attr('data-gdp', (d, i) => dataset[i][1])
     .attr("fill", "orange")
     .attr("x", (d, i) => xScale(years[i]))
     .attr("y", (d, i) => h - d)
     .attr("width", singleBar)
     .attr("height", d => d - margin)
     .on("mouseover", (d, i) => {
       let info = d3.timeFormat("%b %Y")
       tooltip.transition()
              .duration(150)
              .style("opacity", .9)
       tooltip.html("Date " + info(years[i]) + "<br>$" + GDP[i] + " Billions")
              .attr("data-date", dataset[i][0])
              .style("left", i + 30 + "px")
              .style("top", h - 100 + "px")
              .style("transform", "translate(60px)")
     })
     .on("mouseout", d => {
       tooltip.transition()
              .duration(50)
              .style("opacity", 0)
     })
  
};
  
  
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(json){
  const dataset = json.data;
  chart(dataset)
});
