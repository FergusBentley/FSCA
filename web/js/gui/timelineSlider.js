// Setup timeline slider
$(function(){

    updateTimelineSlider();

    $('#timeline').bind('slide', function(evt){
        let ticks = JSON.parse($('#timeline').attr('data-slider-ticks'));
        let tickLabels = JSON.parse($('#timeline').attr('data-slider-tick-labels'));
        let i = ticks.indexOf(evt.value + "");
        $('#timeline-value').html(tickLabels[i]);
    });
});

function updateTimelineSlider() {
    // Will be fetched based on the selected language
    let values = [-500, -300, -50, 0, 100, 350, 500, 800, 1100];

    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    let diff = maxValue - minValue;

    let ticks = [], tickLabels = [];
    for (var i = 0; i < values.length; i++) {
        ticks[i] = Math.round(((values[i] - minValue) / diff) * 100);
        tickLabels[i] = Math.abs(values[i]) + (values[i] < 0 ? " BC" : (values[i] === 0 ? "" : " AD"));
    }

    // Convert arrays to HTML attribute strings
    let tickString = `["${ ticks.join('", "') }"]`;
    let tickLabelString = `["${ tickLabels.join('", "') }"]`;

    $('#timeline').attr('data-slider-min', minValue)
                  .attr('data-slider-max', maxValue)
                  .attr('data-slider-ticks', tickString)
                  .attr('data-slider-tick-labels', tickLabelString);

    $('#timeline').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        },
        ticks_snap_bounds: 30,
        ticks_tooltip: true,
        step: 1
    });
}
