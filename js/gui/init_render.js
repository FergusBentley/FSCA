let selectedLanguage = undefined,
    selectedWords = [];
let languageTemplate, wordTemplate;
let rootLanguage;

// Update the languages pane and related elements
function updateLanguages() {
    $("#languages").empty();

    // Display langage tree
    if (rootLanguage != undefined)
        $("#languages").html(rootLanguage.asTree());

    // Make the languaes expandable
    $('#languages .group > span').click(function(e){
        e.stopPropagation();
        if ($(this).attr("data-target") == undefined)
            $(this).parent().toggleClass("active");
        else
            $(this).parent().addClass("active");
    });

    $('#languages .group > .checkbox').click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass("active");
    });

    // If a language has data attached to it, make it selectable
    $('#languages .language, #languages .group > span[data-target]').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.hash = "#" + $(this).attr("data-target");
        $(".language, .group > span[data-target]").removeClass("selected");
        $(this).addClass("selected");
        updateSelectedLanguage();
        updateDictionary();
    });
}

// Set the selected language and display its details
function updateSelectedLanguage() {
    $("#language-details").hide();
    if (rootLanguage != undefined) {
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
            $("#language-details").show();
        }
    }
}

// Render words in the current language in the Dictionary pane
function updateDictionary() {

    $('#dictionary').empty();

    // If a language is selected, display all of its words
    if (selectedLanguage != null) {
        let words = Object.values(selectedLanguage.dictionary.words);
        for (const word of words) {
            let entry = $(`<li>${word.gloss}</li>`);
            if (selectedWords.includes(word.gloss)) entry.addClass("selected");
            $('#dictionary').append(entry);
        }
    }

    // Make words selectable
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

// Show the details of selected words
function renderWordDetails() {
    $("#words-details").empty();
    if (selectedWords.length > 0) {
        let words = selectedWords.map(w => selectedLanguage.dictionary.search(w));
        let wordsHash = {
            words: words.map(w => ({
                gloss: w.gloss,
                etymology: w.etymology,
                pronunciation: "/" + w.render() + "/",
                definition: w.definition,
                has_forms: w.forms != undefined && Object.keys(w.forms).length !== 0,
                forms: w.tabulateForms()
            }))
        };
        $("#words-details").append($(Mustache.render(wordTemplate, wordsHash)));
    }
}


function init() {
    window.location.hash = "";
    updateLanguages();
    updateDictionary();
    languageTemplate = $("#language-details").html();
    wordTemplate = $("#words-details").html();
    updateSelectedLanguage();
    renderWordDetails();
}
