const height = 400,
      width = 800,
      barWidth = width/275;

const chart = d3.select('#chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)

const tooltip = d3.select('#chart')
                  .append('div')
                  .attr('id', 'tooltip')

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(err, data) {


  chart.append('text')
       .attr('transform', 'rotate(-90)')
       .attr('x', -300)
       .attr('y', 80)
       .text('Gross Domestic Product in billions');

  const years = data.data.map(function(item) {
    let quarter;
    let temp = item[0].substring(5, 7);

    switch (true) {
      case temp === '01':
        quarter = 'Q1';
        break;
      case temp === '02':
        quarter = 'Q2';
        break;
      case temp === '03':
        quarter = 'Q3';
        break;
      case temp === '04':
        quarter = 'Q4';
        break;

      return item[0].substring(0, 4) + ' ' + quarter
    }

  });

  const date = data.data.map(function(item) {
    return new Date(item[0]);
  });

  const maxX = new Date(d3.max(date));
    maxX.setMonth(maxX.getMonth() + 3);

  const xScale = d3.scaleTime()
                   .domain([d3.min(date), maxX])
                   .range([0, width]);

  const xAxis = d3.axisBottom()
                  .scale(xScale);

  const xAxisGroup = chart.append('g')
                          .call(xAxis)
                          .attr('id', 'x-axis')
                          .attr('transform', 'translate(60, 400)');

  const grossDomesticProduct = data.data.map(function(item) {
    return item[1];
  })

  const scaledGDP = [];

  const gdpMin = d3.min(grossDomesticProduct),
        gdpMax = d3.max(grossDomesticProduct);


  const linearScale = d3.scaleLinear()
                        .domain([0, gdpMax])
                        .range([0], height);

  scaledGDP = grossDomesticProduct.map(function(item) {
    return linearScale(item);
  });

  const yAxisScale = d3.scaleLinear()
                       .domain([0, gdpMax])
                       .range([height, 0]);

  const yAxis = d3.axisLeft(yAxisScale);

  const yAxisGroup = chart.append('g')
                          .call(yAxis)
                          .attr('id', 'y-axis')
                          .attr('transform', 'translate(60, 0)');

});

