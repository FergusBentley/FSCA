let selectedLanguage = undefined,
    selectedWords = [];
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
    if (rootLanguage.shortName == name) selectedLanguage = rootLanguage;
    else selectedLanguage = rootLanguage.findChild(name);
    if (selectedLanguage != undefined) {
        $("#language-details").show();
        languageHash = {
            name: selectedLanguage.longName,
            code: selectedLanguage.shortName,
            ancestors: selectedLanguage.getAncestors(),
            children: selectedLanguage.children
        };
        $("#language-details").html(Mustache.render(languageTemplate, languageHash));
        selectedWords = selectedWords.filter(w => selectedLanguage.dictionary.contains(w))
        renderWordDetails();
    }
    else $("#language-details").hide();
}

// Make dictionary words selectable
function updateDictionary() {

    $('#dictionary').empty();

    if (selectedLanguage != null) {
        let words = Object.values(selectedLanguage.dictionary.words);
        for (const word of words) {
            let entry = $(`<li>${word.gloss}</li>`);
            if (selectedWords.includes(word.gloss)) entry.addClass("selected");
            $('#dictionary').append(entry);
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
        renderWordDetails();
    });

    $('#dictionary > li > .tickbox').click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass("selected");
        let val = $(this).parent().html().split("<")[0].trim();
        if (selectedWords.includes(val))
            selectedWords.splice(selectedWords.indexOf(val), 1);
        else selectedWords.push(val);
        renderWordDetails();
    });
}

function renderWordDetails() {
    $("#words-details").empty();
    if (selectedWords.length > 0) {
        let words = selectedWords.map(w => selectedLanguage.dictionary.search(w));
        let wordsHash = {
            words: words.map(w => ({
                gloss: w.gloss,
                etymology: w.etymology,
                definition: w.definition,
                has_forms: w.forms != undefined,
                forms: w.tabulateForms()
            }))
        };
        $("#words-details").append($(Mustache.render(wordTemplate, wordsHash)));
    }
}


$(function(){
    window.location.hash = "";
    updateLanguages();
    updateDictionary();
    languageTemplate = $("#language-details").html();
    wordTemplate = $("#words-details").html();
    updateSelectedLanguage();
    renderWordDetails();
});
