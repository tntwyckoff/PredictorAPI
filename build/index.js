"use strict";
// todo: handle punctuation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApplicationStateModel_1 = require("./ApplicationStateModel");
const loggingMiddleware_1 = require("./middleware/loggingMiddleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const SourceString = "One Two Two Four Four One Three One Four One Two Three One Two four Two four";
const appState = new ApplicationStateModel_1.ApplicationStateModel();
appState.learningString = SourceString;
console.debug(`process.env.foo: ${process.env.foo}`);
app.use(express_1.default.json());
app.use(loggingMiddleware_1.LoggingMiddleware.handler);
app.get('/:keyword', (req, res) => {
    var _a;
    res.send((_a = appState.predictionModel) === null || _a === void 0 ? void 0 : _a.predictNext(req.params["keyword"]));
});
app.post('/', (req, res) => {
    const localLearningString = req.body["sourceString"];
    if (!localLearningString) {
        res.sendStatus(400);
    }
    appState.learningString = localLearningString;
    res.sendStatus(200);
});
app.get('/', (req, res) => {
    res.send({
        "sourceString": appState.learningString
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
