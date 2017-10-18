/*
Data:
https://github.com/fivethirtyeight/data/blob/b667fa08b172fdc91356e00cabf44c5095581f1f/alcohol-consumption/drinks.csv

Sources for the code:
https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0
https://bl.ocks.org/mbostock/3887235
https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
http://jsfiddle.net/U97EY/
http://bl.ocks.org/weiglemc/6185069
*/

//Load the data
d3.csv("data.csv", function(error, data) {
  draw(data);
});

// Set the dimensions of the graph
var margin = {top: 20, right: 20, bottom: 160, left: 60},
    width = 1440 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);

var y = d3.scaleLinear()
          .range([height, 0]);

// Append the svg object to the body of the page
// Append a "group" element to "svg"
// Moves the "group" element to the top left margin
var svg = d3.select(".barchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Function draw is being made here and checks the data with a forEach function.
function draw(data) {
// Fill d.total with the columns with all numbers in these columns
  data.forEach(function(d) {
    d.total = Number(d.beer_servings) + Number(d.spirit_servings) + Number(d.wine_servings);
  });
  console.log(data);

//Sort the data from high to low with a, b and slice from 31 to get a top 30 list.
  data = data.sort(function(a, b) {
    return a.total - b.total;
  }).reverse().slice(1,51);

//Make the domain for the y & x axis. y  with a total number and x with a string of countries.

  y.domain([0, d3.max(data, function(d) { return Number(d.total); })]);
  x.domain(data.map(function(d) { return d.country; }));

  // Add the x Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.9em")
        .attr("dy", "-0.2em")
        .attr("transform", "rotate(-50)");

  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y)
        .ticks(10))


  // Make the barchart and return drawPie with a function when a bar is clicked
  var bars = svg.selectAll(".bar").data(data, function(d) { return d.country; })
  bars.enter().append("rect")
    .attr("class", "bar")
    .attr("y", y(0))
    .attr("height", height - y(0))
    .on("click", function(d) {
      drawPie(d);
    });

    // The xAxis gets defined with the sorted data
    x.domain(data.map(function(d) { return d.country; }));

    // Select the xAxis for the transition
    svg.select(".x.axis")
      .transition()
      .duration(300)
      .call(d3.axisBottom(x))

    // The countries get put into the bars.
    var bars = svg.selectAll(".bar")
      .data(data, function(d) { return d.country; })

    // A rectangle gets put into bars with a height .
    bars.enter()
    .append("rect")
      .attr("class", "bar")
      .attr("y", y(0))
      .attr("height", height - y(0));

    // Transition with the bar elements and the height of the bars gets defined.
    bars.transition()
      .duration(300)
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.total); })
      .attr("height", function(d) { return height - y(d.total); });
};

// the piechart gets selected and puts a h2 inside.
var headingPie = d3.select(".piechart").append("h2");
// The dimensions of the piechart get defined.
var widthPie = 300,
    heightPie = 300,
    svgPie = d3.select(".piechart").append("svg")
          .attr("width", widthPie)
          .attr("height", heightPie),
    radius = Math.min(widthPie, heightPie) / 2,
    gPie = svgPie.append("g").attr("transform", "translate(" + widthPie / 2 + "," + heightPie / 2 + ")");


// The piechart gets drawn.
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value; });
// The arc gets defined
var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// The piechart gets filled in with the data.
function drawPie(data) {
  headingPie.text(data.country);

  // Create empty array to store sortedData
  var sortedData = [];
  // Checks every key for the right data.
  for (key in data) {
    // Is the key equal to spirit_servings, wine_servings and beer_servings? If yes, push into sortedData.
    if (key === "spirit_servings" || key === "wine_servings" || key === "beer_servings") {
      sortedData.push({
        // Makes a object in the array sortedData with the type of drink and the value of the drink.
          type: key,
          value: data[key]
      })
    }
  }

//Makes the piechart empty to be filled again.
  d3.selectAll("path").remove();
//The target "sortedData" gets put in the piechart.
  var allArcs = gPie.selectAll(".arc")
    .data(pie(sortedData))
    .enter()
    .append("svg:path")
        .attr("d", path)
        .attr("class", function(d) {
          return  d.data.type;
        });

  };
