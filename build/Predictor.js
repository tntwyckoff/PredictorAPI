"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predictor = void 0;
const console_1 = require("console");
const OccuranceModel_1 = require("./OccuranceModel");
class Predictor {
    constructor(inputString) {
        this.inputString = inputString;
        this.regex = /\W/;
        this.table = new Map();
        this.buildPredictionTable(this.inputString);
    }
    predictNext(keyword) {
        (0, console_1.debug)(`Analyzing ${keyword}...`);
        const occurances = this.getOccurances(keyword);
        const denom = occurances.map(m => m.count).reduce((a, b) => a + b);
        (0, console_1.debug)(`${denom} total occurances`);
        const result = {};
        occurances.forEach(o => {
            result[o.keyword] = o.count / denom;
        });
        return result;
    }
    buildPredictionTable(inputString) {
        const lWords = this.inputString.split(this.regex);
        for (let i = 0; i < lWords.length - 1; i++) {
            const word = lWords[i];
            const nextWord = lWords[i + 1];
            const occurances = this.getOccurances(word);
            (0, console_1.debug)(`Processing '${word}/${nextWord}'...'`);
            (0, console_1.debug)(`Count from Map entry: ${occurances.length}`);
            let nextOcc = occurances.find(entry => nextWord == entry.keyword);
            if (nextOcc) {
                nextOcc.count = nextOcc.count + 1;
                (0, console_1.debug)(`'${word}'${nextWord}' occurances incremented to ${nextOcc.count}`);
            }
            else {
                nextOcc = new OccuranceModel_1.OccuranceModel();
                nextOcc.count = 1;
                nextOcc.keyword = nextWord;
                occurances.push(nextOcc);
            }
            (0, console_1.debug)(`Keyword ${word} has ${nextOcc.count} occurance(s)`);
            this.table.set(word, occurances);
        }
    }
    getOccurances(w) {
        let target = this.table.get(w.toLowerCase());
        if (target) {
            (0, console_1.debug)(`'${w}' found in Map'`);
            return target;
        }
        (0, console_1.debug)(`Creating Map entry for '${w}'`);
        target = [];
        this.table.set(w.toLowerCase(), target);
        return target;
    }
}
exports.Predictor = Predictor;
