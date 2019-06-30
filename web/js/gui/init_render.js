let selectedLanguage, selectedWords;
let languageTemplate, wordTemplate;
let rootLanguage;

// Make tree expandable
function updateLanguages() {
    $("#languages").empty();

    $("#languages").html(rootLanguage.asTree());

    $('#languages span').click(function(){
        $(this).toggleClass("active");
    });

    $('#languages a').click(function(e) {
        e.preventDefault();
        window.location.hash = $(this).attr("href");
        updateSelectedLanguage();
        updateDictionary();
    });
}

function updateSelectedLanguage() {
    let name = window.location.hash.substring(1);
    console.log(name);
    if (rootLanguage.shortName == name) selectedLanguage = rootLanguage;
    else selectedLanguage = rootLanguage.findChild(name);
}

// Make dictionary words selectable
function updateDictionary() {

    $('#dictionary').empty();

    if (selectedLanguage != null) {
        let words = Object.values(selectedLanguage.dictionary.words);
        for (const word of words) {
            $('#dictionary').append($(`<li>${word.gloss}</li>`));
        }
    }

    $('#dictionary > li').append($("<span class='tickbox'>add</span>"));

    $('#dictionary > li').click(function(){
        let val = $(this).html().split("<")[0].trim();
        if ($(this).hasClass("selected") && selectedWords.length == 1) {
            $(this).removeClass("selected");
            if (selectedWords.includes(val))
                selectedWords.splice(selectedWords.indexOf(val), 1);
        }
        else {
            $('#dictionary > li').removeClass("selected");
            $(this).addClass("selected");
            selectedWords = [val];
        }
        console.log(selectedWords);
    });

    $('#dictionary > li > .tickbox').click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass("selected");
        let val = $(this).parent().html().split("<")[0].trim();
        if (selectedWords.includes(val))
            selectedWords.splice(selectedWords.indexOf(val), 1);
        else selectedWords.push(val);
        console.log(selectedWords);
    });
}

// Render the info of the selected language and words
function renderDetails() {
    $("#language-details").html(Mustache.render(languageTemplate, selectedLanguage));
    $("#word-details").html(Mustache.render(wordTemplate, selectedWords));
}


$(function(){
    window.location.hash = "";
    updateLanguages();
    updateDictionary();
    languageTemplate = $("#language-details").html();
    wordTemplate = $("#word-details").html();
});
