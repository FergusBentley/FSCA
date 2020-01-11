$(function(){
    jQuery.get("languages/scaudsesk.lng", function(data) {
        let parsed = FSCAParser.parse(data);
        rootLanguage = parsed.root;
        init();
    });
});
