# Top 50 Countries that consume the most alcohol.

## Explore

The data from the dataset is a list that is split down in 5 columns: The countries from A-Z, amount of beer, amount of mixes(liquor), amount of wine and the total amount of pure alcohol in litres.

I want to make a list that ranks the countries from the amount of alcohol they consumed so I need to add the beer, mixes and wine together to get a total number. I don't need the amount of pure alcohol in litres.

Also a list of 193 countries is a bit excessive so I'll probably slice a big chunk out of the list.

## Process


### The bar chart

[Bar chart used ](https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4)


I started with a bar chart to make a top 30 list of countries depending of the amount of alcohol they consumed.

Used a `.forEach` function in combination with `Number` to add beer, mixes and wine in `d.total`.

```js
data.forEach(function(d) {
  d.total = Number(d.beer) + Number(d.mixes) + Number(d.wine);
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
