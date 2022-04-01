import { Predictor } from "./Predictor";

export class ApplicationStateModel {
    private _learningString: string = "";
    private _predictionModel?: Predictor;

    get learningString(): string {
        return this._learningString;
    }

    set learningString(val: string) {
        this._learningString = val;        
        this._predictionModel = undefined;
        console.debug(`Analyzing input string '${val}'...`)
        this._predictionModel = new Predictor(this.learningString);
    }

    get predictionModel(): Predictor | undefined {
        return this._predictionModel;
    }

    get isValid(): boolean {
        return undefined != this.learningString && undefined != this.predictionModel;
    }

}