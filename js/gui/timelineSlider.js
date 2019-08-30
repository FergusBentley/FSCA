// Setup timeline slider
$(function(){

    updateTimelineSlider();

    $('#timeline').bind('slide', function(evt){
        let tickDict = JSON.parse($('#timeline').attr('data-slider-tick-dict'));
        $('#timeline-value').html(tickDict[evt.value]);
    });
});

function updateTimelineSlider() {
    // Will be fetched based on the selected language
    let values = [-500, -300, -50, 0, 100, 350, 500, 800, 1100];

    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    let diff = maxValue - minValue;

    // Scale tick positions & label
    let ticks = [], tickLabels = [];
    for (var i = 0; i < values.length; i++) {
        ticks[i] = Math.round(((values[i] - minValue) / diff) * 100);
        tickLabels[i] = Math.abs(values[i]) + (values[i] < 0 ? " BCE" : (values[i] === 0 ? "" : " CE"));
    }

    // Format tick/label pairs as a JSON object
    // Allows lookup of labels based on value
    let tickDictString = "{";
    for (let i = 0; i < values.length; i++) {
        tickDictString += `"${ ticks[i] }": "${ tickLabels[i] }"`;
        if (i < values.length - 1) tickDictString += ", ";
    }
    tickDictString += "}";
    // Store object in timeline element
    $('#timeline').attr('data-slider-tick-dict', tickDictString);

    $('#timeline').slider({
        id: "timelineSlider",
        min: minValue,
        max: maxValue,
        ticks: ticks,
        step: 1,
        value: 100,
        ticks_snap_bounds: 100,
        formatter: function(value) {
            return "" + Math.abs(value) + (value < 0 ? " BCE" : (values[i] === 0 ? "" : " CE"))
        },
    });


    $('#timeline-value').html(tickLabels[tickLabels.length - 1]);
}
