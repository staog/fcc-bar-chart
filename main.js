function chart(gdpData) {
  let height = 400;
  let width = 800;
  
  let minDate = gdpData[0][0].substr(0, 4);
      minDate = new Date(minDate);
  let maxDate = gdpData[gdpData.length - 1][0].substr(0, 4);
      maxDate = new Date(maxDate);
  
  let xAxisScale = d3.time.scale()
                     .domain([minDate, maxDate])
                     .range([0, width]);
  
  let yAxisScale = d3.time.linear()
                     .domain([0, d3.max(gdpData, function(d) {
                       return d[1];
                     })])
                     .range([height, 0]);
  
  let xAxis = d3.svg.axis()
                    .scale(xAxisScale)
                    .orient("bottom");
  
  let yAxis = d3.svg.axis()
                    .scale(yAxisScale)
                    .orient("left");
  
  let tooltip = d3.select('body')
                  .append('div')
                  .style({'position': 'absolute',
                          'padding': '5px',
                          'background': 'black',
                          'color': 'yellow',
                          'border': '1px solid gray'})
  
  let svg = d3.select('#container')
              .append('svg')
  
  }

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data){
  let gdpData = data.data;
  chart(gdpData);
});
