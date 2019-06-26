// Make tree expandable
function initTree() {
    $('.tree span').click(function(){
        $(this).toggleClass("active");
    });
}

// Make dictionary words selectable
function initDictionary() {

    $('#dictionary > li').append($("<span class='tickbox'>add</span>"));

    $('#dictionary > li').click(function(){
        if ($(this).hasClass("selected")) $(this).removeClass("selected");
        else {
            $('#dictionary > li').removeClass("selected");
            $(this).addClass("selected");
        }
    });

    $('#dictionary > li > .tickbox').click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass("selected");
    });
}

// Render the info of the selected language and words
let languageTemplate, wordTemplate;
function renderDetails(selectedLanguage, selectedWords) {
    $("#language-details").html(Mustache.render(languageTemplate, selectedLanguage));
    $("#word-details").html(Mustache.render(wordTemplate, selectedWords));
}


$(function(){
    initTree();
    initDictionary();
    languageTemplate = $("#language-details").html();
    wordTemplate = $("#word-details").html();
});
