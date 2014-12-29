//source for stack overflow tags comes from:
//https://data.stackexchange.com/stackoverflow/query/207593/tag-totals-grouped-by-target-tag-synonyms

var diameter = 600,
	format = d3.format(",d"),
    color = d3.scale.category20b(),
    maxTextSize = 16,
    tagJson = new Object(),
    svg;

d3.json("/data/dataViz/tags.json",function(data) {

	tagJson.children = data;

  var textScale = d3.scale.linear()
    .domain([d3.min(data, function (d) {return d.value;}), 
      d3.max(data, function (d) {return d.value;})])
    .range([1, maxTextSize]);

	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([diameter, diameter])
	    .padding(3);

    var svg = d3.select("#tagBubbleChart").append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	    .attr("class", "bubble")
	    .append("g")
	    .call(d3.behavior.zoom().scaleExtent([1, 64]).on("zoom", zoom))
  	.append("g");

    var node = svg.selectAll(".node")
  		.data(bubble.nodes(tagJson)
  				.filter(function(d) { return !d.children; })
  			)
    .enter().append("g")
		.attr("class", "node")
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	node.append("title")
		.text(function (d){ return d.TagName + ": " + format(d.value); });

	node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.value); });

    node.append("text")
      .attr("dy", "-.5em")
      .style("text-anchor", "middle")
      .style("font-size", function(d) {return Math.round(textScale(d.value)) + "px"})
      .text(function(d) { return d.TagName; });
        
    node.append("text")
      .attr("dy", ".7em")
      .style("text-anchor", "middle")
      .style("font-size", function(d) {return Math.round(textScale(d.value)) + "px"})
      .text(function(d) { return format(d.value); });

    function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

});


d3.select(self.frameElement).style("height", diameter + "px");