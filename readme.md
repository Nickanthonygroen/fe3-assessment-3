# Top 50 Countries that consume the most alcohol.

## Explore

The data from the dataset is a list that is split down in 5 columns: The countries from A-Z, amount of beer servings, amount of spirit servings(which is liquor I guess), amount of wine servings and the total amount of pure alcohol in litres.

I want to make a list that ranks the countries from the amount of alcohol they consumed so I need to add the beer servings, spirit servings and wine servings together to get a total number. I don't need the amount of pure alcohol in litres.

Also a list of 193 countries is a bit excessive so I'll probably slice a big chunk out of the list.

## Process


### The bar chart

[Bar chart used ](https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4)


I started with a bar chart to make a top 30 list of countries depending of the amount of alcohol they consumed.

Used a `.forEach` function in combination with `Number` to add beer, mixes and wine in `d.total`.

```js
data.forEach(function(d) {
  d.total = Number(d.beer_servings) + Number(d.spirit_servings) + Number(d.wine_servings);
});


```
Then I sorted the data using `data.sort` checking the lowest value with the highest and then using `.reverse()` to make the chart sort from high to low. Lastly using .slice() to make the list up to 50 countries.

For the sorting I had to use some stackoverflow: [Code for sorting the array](https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
)

```js
data = data.sort(function(a, b) {
  return a.total - b.total;
}).reverse().slice(1,51);
```

I also need to reference the function `drawPie` with an on click event. The click event needs to happen when a bar is being clicked so this the place to put it.

```js
var bars = svg.selectAll(".bar").data(data, function(d) { return d.country; })
bars.enter().append("rect")
  .attr("class", "bar")
  .attr("y", y(0))
  .attr("height", height - y(0))
  .on("click", function(d) {
    drawPie(d);
  });
```


### The pie chart

[Pie chart used](https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0)

What I wanted was to show the different kinds of alcohol per country when clicking on the bar in the bar chart. So when a bar was clicked there had to shown a name above the piechart to know which country.

So I made an variable in which I select the svg with the class `.piechart` and `append` an `h2`.

```js
var headingPie = d3.select(".piechart").append("h2");

```

And later I use the variable to fill the `h2` with the correct data.

```js
function drawPie(data) {headingPie.text(data.country);

```

Since I'm loading in a second SVG that has the same variables such as: `width`, `height`, `svg` and `g` I made some simple adjustments by adding Pie after the variables.



The next thing I needed to do was put the data of the selected bar chart in a pie chart. For this I used a [snippet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) using the `for in` statement.

I made an empty array for the data to be stored in.

```js
var sortedData = [];
```

Then I check the keys if they are equal to `spirit_servings`, `wine_servings` and `beer_servings` and if so then `.push()` into `sortedData` in a object with a `type` and `value`.

```js
for (key in data) {

  if (key === "spirit_servings" || key === "wine_servings" || key === "beer_servings") {
    sortedData.push({
        type: key,
        value: data[key]
    })
  }
}
```

Lastly, what needs to happen is that the piechart needs to empty the values and create a new path for the new data.

```js
d3.selectAll("path").remove();
```

For this bit I used a snippet containing the `.enter()` function and updating the piechart.

```js
var allArcs = gPie.selectAll(".arc")
  .data(pie(sortedData))
  .enter()
  .append("svg:path")
      .attr("d", path)
      .attr("class", function(d) {
        return  d.data.type;
      });
```
