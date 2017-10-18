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

### The pie chart

[Pie chart used](https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0)

What I wanted was to show the different kinds of alcohol per country when clicking on the bar in the bar chart. So when a bar was clicked there had to shown a name above the piechart to know which country.

So I made an variable in which I select the svg with the class `.piechart` and `append` an `h2`.

```js
var headingPie = d3.select(".piechart").append("h2");

```
Since I'm loading in a second SVG that has the same variables such as: `width`, `height`, `svg` and `g` I made some simple adjustments by adding Pie after the variables.

```js
var widthPie = 300,
    heightPie = 300,
    svgPie = d3.select(".piechart").append("svg")
          .attr("width", widthPie)
          .attr("height", heightPie),
    radius = Math.min(widthPie, heightPie) / 2,
    gPie = svgPie.append("g").attr("transform", "translate(" + widthPie / 2 + "," + heightPie / 2 + ")");
```
