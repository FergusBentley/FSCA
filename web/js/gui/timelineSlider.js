// Setup timeline slider
$(function(){
    let values = [], ticks = [], tickLabels = [], tickString, tickLabelString, minValue, maxValue, diff;

    values = [-500, -300, -50, 0, 100, 350, 500, 800, 1100];

    minValue = Math.min(...values);
    maxValue = Math.max(...values);

    diff = maxValue - minValue;

    for (var i = 0; i < values.length; i++) {
        ticks[i] = Math.round(((values[i] - minValue) / diff) * 100);
        tickLabels[i] = Math.abs(values[i]) + (values[i] < 0 ? " BC" : (values[i] === 0 ? "" : " AD"));
    }

    tickString = `["${ ticks.join('", "') }"]`;
    tickLabelString = `["${ tickLabels.join('", "') }"]`;

    $('#timeline').attr('data-slider-min', minValue)
                  .attr('data-slider-max', maxValue)
                  .attr('data-slider-ticks', tickString);

    $('#timeline').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        },
        ticks_snap_bounds: 30,
        ticks_tooltip: true,
        step: 1
    });

    $('#timeline').bind('slide', function(evt){
        console.log(evt.value);
    });
});
