import { debug } from "console";
import { OccuranceModel } from "./OccuranceModel";

export class Predictor {
    regex = /\W/;
    table: Map<string, OccuranceModel[]> = new Map<string, OccuranceModel[]>();

    constructor(private inputString: string) {
        this.buildPredictionTable(this.inputString);
    }

    predictNext(keyword: string): any {
        debug(`Analyzing ${keyword}...`);

        const occurances = this.getOccurances(keyword);
        const denom = occurances.map(m => m.count).reduce((a, b) => a + b);

        debug(`${denom} total occurances`);

        const result:any = {};

        occurances.forEach(o => {
            result[o.keyword] = o.count / denom;            
        });

        return result;
    }

    private buildPredictionTable(inputString: string) {
        const lWords = this.inputString.split(this.regex);
        
        for (let i = 0; i < lWords.length - 1; i++) {
            const word = lWords[i];
            const nextWord = lWords[i + 1];
            const occurances = this.getOccurances(word);

            debug(`Processing '${word}/${nextWord}'...'`);
            debug(`Count from Map entry: ${occurances.length}`);

            let nextOcc = occurances.find(entry => nextWord == entry.keyword);

            if(nextOcc) {
                nextOcc.count = nextOcc.count + 1;
                debug(`'${word}'${nextWord}' occurances incremented to ${nextOcc.count}`);
            } else {
                nextOcc = new OccuranceModel();
                nextOcc.count = 1;
                nextOcc.keyword = nextWord;
                occurances.push(nextOcc);
            }

            debug(`Keyword ${word} has ${nextOcc.count} occurance(s)`);
            this.table.set(word, occurances);
        }
    } 
    
    getOccurances(w: string): OccuranceModel[] {
        let target = this.table.get(w.toLowerCase());

        if(target) {
            debug(`'${w}' found in Map'`);
            return target;
        }

        debug(`Creating Map entry for '${w}'`);

        target = [];
        this.table.set(w.toLowerCase(), target);

        return target;
    }
}