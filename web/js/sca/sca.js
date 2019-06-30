$(function(){

    let wgmc = new Language("WGmc", "West Germanic");


    let w = new Word("DEM", [], {
        "NOM": new Word("NOM", [], {
            "M": new Word("M", [], {
        		"SG": new Word("A", []),
        		"PL": new Word("B", [])
        	}),
        	"F": new Word("F", [], {
        		"SG": new Word("C", []),
        		"PL": new Word("D", [])
        	})
        }),
        "ACC": new Word("ACC", [], {
            "M": new Word("M", [], {
        		"SG": new Word("E", []),
        		"PL": new Word("F", [])
        	}),
        	"F": new Word("F", [], {
        		"SG": new Word("G", []),
        		"PL": new Word("H", [])
        	})
        })

    });

    wgmc.dictionary.addWord(w);
    wgmc.dictionary.addWord(new Word("PROX.DEM", []));
    wgmc.dictionary.addWord(new Word("tribe", []));
    wgmc.dictionary.addWord(new Word("sea", []));


    let ing = new Language("Ing", "Ingvaeonic", wgmc, true);

    let thj = new Language("Thj", "Thjudesk", ing);
    let fri = new Language("Fri", "Frisian", ing, true);
    
    thj.dictionary.addWord(new Word("shallow", []));

    rootLanguage = wgmc;

    // $("#word-forms-container").html(w.tabulateForms());
});
