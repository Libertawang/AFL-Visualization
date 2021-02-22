var width = document.getElementById('vis')
    .clientWidth;
var height = document.getElementById('vis')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
},
    width = 1920 - margin.left - margin.right
height = 680 - margin.top - margin.bottom;


var svg = d3v4.select('#vis')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var x_scale = d3v4.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale = d3v4.scaleLinear()
    .range([height, 0]);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g')
    .attr('class', 'y axis');


var y_axis = d3v4.axisLeft(y_scale);
var x_axis = d3v4.axisBottom(x_scale);


var colour_scale = d3v4.scaleQuantile()
    .range(["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"]);



function update(year) {
    d3v4.csv('region_data_' + year + '.csv', function(csv_data) {

        var t = d3v4.transition()
            .duration(1500);

        var Regions = csv_data.map(function(d) {
            return d.Region;
        });
        x_scale.domain(Regions);

        var max_value = d3v4.max(csv_data, function(d) {
            return d.value;
        });
        y_scale.domain([70, 130]);
        colour_scale.domain([0, max_value]);

        var bars = svg.selectAll('.bar')
            .data(csv_data);

        //exit
        bars
            .exit()
            .remove();

        //enter
        var new_bars = bars
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('height', 0)
            .attr('y', height)
            .attr('width', x_scale.bandwidth());

        //update
        new_bars.merge(bars)
            .transition(t)
            .attr('x', function(d) {
                return x_scale(d.Region);
            })
            .attr('y', function(d) {
                return y_scale(d.value);
            })
            .attr('height', function(d) {
                return height - y_scale(d.value);
            })
            .attr('fill', function(d) {
                return colour_scale(d.value);
            });

        svg.select('.x.axis')
            .transition(t)
            .call(x_axis);

        svg.select('.y.axis')
            .transition(t)
            .call(y_axis);

    });
}

var select = d3v4.select('#year');
select.on('change', function() {
    console.log(this.value);
    update(this.value);
})

update('2018');