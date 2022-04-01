"use strict";
// todo: handle punctuation
// todo: keep a source string in memory somewhereand allow a POST to change it
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggingMiddleware_1 = require("./middleware/loggingMiddleware");
const Predictor_1 = require("./Predictor");
const app = (0, express_1.default)();
const PORT = 8080;
const SourceString = "One Two Two Four Four One Three One Four One Two Three One Two four Two four";
const pre = new Predictor_1.Predictor(SourceString);
app.use(express_1.default.json());
app.use(loggingMiddleware_1.LoggingMiddleware.handler);
app.get('/:keyword', (req, res) => {
    res.send(pre.predictNext(req.params["keyword"]));
});
app.get('/', (req, res) => {
    res.send({
        "sourceString": SourceString
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
