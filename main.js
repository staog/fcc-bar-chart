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

  });    .attr('transform', 'translate(60, 0)');

});

