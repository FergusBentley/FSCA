// Make tree expandable
function initTree() {
    $('.tree span').click(function(){
        $(this).toggleClass("active");
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
    languageTemplate = $("#language-details").html();
    wordTemplate = $("#word-details").html();
});
