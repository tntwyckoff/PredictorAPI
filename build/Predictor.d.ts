import { OccuranceModel } from "./OccuranceModel";
export declare class Predictor {
    private inputString;
    regex: RegExp;
    table: Map<string, OccuranceModel[]>;
    constructor(inputString: string);
    predictNext(keyword: string): any;
    private buildPredictionTable;
    getOccurances(w: string): OccuranceModel[];
}
//# sourceMappingURL=Predictor.d.ts.map