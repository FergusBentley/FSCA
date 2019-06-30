class Word {

    constructor(gloss, syllables, forms) {
        this.gloss = gloss;
        this.syllables = syllables;
        this.forms = forms || {};
    }

    enumerateForms(p) {
        let path = p || [];
        let fs = {};
        if (Object.keys(this.forms).length > 0) {
            for (var key in this.forms) {
                if (this.forms.hasOwnProperty(key)) {
                    let np = path.concat([key]);
                    Object.assign(fs, this.forms[key].enumerateForms(np));
                }
            }
        }
        else {
            fs[path] = this;
        }
        return fs;
    }

    tabulateForms() {
        let res = "<table class=\"word-forms\">";
        let ef = this.enumerateForms();
        let points = Object.keys(ef).map(s => s.split(","));

        // Dimensions
        let d = Math.max(...points.map(a => a.length));
        let dV = Math.ceil(d / 2.0);
        let dH = Math.floor(d / 2.0);
        // console.log(d + ", " + dV + ", " + dH);

        // Header labels
        let l = [];
        for (let i = 0; i < Object.keys(ef).length; i++) {
            let p = points[i];
            for (let j = 0; j < d; j++) {
                if (l[j] == undefined) l[j] = [];
                if (!l[j].includes(p[j])) {
                    l[j].push(p[j]);
                }
            }
        }
        let lH = l.slice(0, dH);
        let lV = l.slice(dH, l.length);
        // console.log(l + " | " + lV + " | " + lH);

        // Build table
        let cols = 1;
        lH.forEach(function(e) {
            cols *= e.length;
        });
        res += `
            <tr>
                <th rowspan="${ dH + 1 }" colspan="${dV}"></th>
                <th scope="col" colspan="${cols}">${this.gloss}</th>
            </tr>
        `;

        for (let r = 0; r < dH; r++) {
            res += `<tr>`;
            let colspan = 1;
            lH.forEach(function(e, i) {
                if (i > r)
                    colspan *= e.length;
            });
            let repetitions = cols / colspan / lH[r].length;
            for (let n = 0; n < repetitions; n++) {
                for (let c = 0; c < lH[r].length; c++) {
                    res += `<th scope="col" colspan="${colspan}">${lH[r][c]}</th>`;
                }
            }
            res += `</tr>`;
        }

        let rows = 1;
        lV.forEach(function(e) {
            rows *= e.length;
        });
        for (let r = 0; r < rows; r++) {
            res += `<tr>`

            for (let n = 0; n < dV; n++) {
                let rowspan = 1;
                lV.forEach(function(e, i) {
                    if (i > n)
                        rowspan *= e.length;
                });
                if (r % rowspan == 0) {
                    let c = Math.floor(r / rowspan) % lV[n].length;
                    res += `<th scope="row" rowspan="${rowspan}">${lV[n][c]}</th>`;
                }
            }

            for(let c = 0; c < cols; c++) {
                let i = r * cols + c;
                let w = Object.values(ef)[i].gloss;
                res += `<td>${w}</td>`;
            }
            res += `</tr>`
        }

        return res + "</table>";
    }

}
