function chart(dataset){

  let w = 800;
  let h = 480;
  let padding = 40; 
  let singleBar = w/275;

  let startDate = dataset[0][0].substr(0, 4);
  let upToDate = dataset[dataset.length - 1][0].substring(0, 4);
  
  const xScale =  d3.scaleLinear()
                 .domain([startDate, upToDate])
                 .range([padding, w - padding]);

  const yScale =  d3.scaleLinear()
                 .domain([0, d3.max(dataset, function(d){
                   return d[1];
                 })])
                 .range([h - padding, padding]);

  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale);

  const svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

  svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", "translate(0, " + (h - padding) +")")
     .call(xAxis);

  svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", "translate(" + padding + ", 0)") 
     .call(yAxis);  

  let tooltip = d3.select("body")
                  .append("div");
 
  const GDP = [];
  
  for (let i = 0; i < dataset.length; i++) {
    GDP.push(dataset[i][1]);
  }
  
  console.log(GDP);
   
  svg.selectAll("rect")
     .data(GDP)
     .enter()
     .append("rect")
     .attr("class", "bar")
     .attr("fill", "orange")
     .attr("x", (d, i) => {
        return i * singleBar;
  })
     .attr("y", d => h - d/55)
     .attr("width", singleBar)
     .attr("height", d => d)

};

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(json){
  const dataset = json.data;
  chart(dataset)
});
