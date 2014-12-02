var dataset;
var margin = {top: 50, right: 30, bottom: 50, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var formatter = d3.format("%");
var barTextPadding = 15;
var barWidth;

var drawChart = function(csvFile, chartSelector){
  d3.csv(csvFile, function(error, data) {
    if (error) {
      console.log(error);
    } else {

      dataset = data;
      dataset.map(function (d){
        d.pct = +d.pct; //corece into numbers
        return d;
      });

      barWidth = width / dataset.length;

      nestedKeys = d3.nest().key(function(d){return d.agerange;})
        .entries(dataset);
      
      var xScale = d3.scale.ordinal()
      .domain(nestedKeys.map(function(d){return d.key;}))
      .rangeRoundBands([0, width], .1);

      var yScale = d3.scale.linear()
        .domain([0, 
                d3.max(dataset, function(d){return d.pct;})
              ])
        .range([height, 0]);
      
      var svg = d3.select(chartSelector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      bars = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform",  
            function(d){return "translate(" + xScale(d.agerange) + ",0)";})
      .append("rect")
        .attr("class", "bar")
        .attr("y", function(d){return yScale(d.pct);})
        .attr("width", xScale.rangeBand())
        .attr("height", function(d){return height - yScale(d.pct);})

      svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "barText")
        .attr("x", function(d){return xScale(d.agerange) + barWidth / 3;})
        .attr("y", function(d){return yScale(d.pct) - barTextPadding;})
        .text(function(d){return formatter(d.pct);});
    
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickFormat(formatter)
        .ticks(6);

      svg.append("g")
        .attr("class", "axis")
        .attr("id", "yAxis")
        .call(yAxis);  
        

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("id", "xAxis")
        .call(xAxis)
      .append("text")
        .attr("x", width/ 3)
        .attr("y", margin.bottom / 2)
        .text("Age Range");
   } 
  });
};
  
drawChart("/assets/data/dataViz/alcoholTestHermosillo.csv", "div#chartMex");