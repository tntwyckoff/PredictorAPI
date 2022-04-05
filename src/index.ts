// todo: handle punctuation

import express, { Request, Response, Application } from 'express';
import { ApplicationStateModel } from './ApplicationStateModel';
import { ContentTypeMiddleware } from './middleware/contentTypeMiddleware';
import { LoggingMiddleware } from './middleware/loggingMiddleware';
import { SuppressExpressHeaderMiddleware } from './middleware/suppressExpressHeaderMiddleware';

const cors = require('cors');
const app: Application = express();
const PORT = process.env.PORT || 8080;
const SourceString: string = "One Two Two Four Four One Three One Four One Two Three One Two four Two four";
const appState: ApplicationStateModel = new ApplicationStateModel();
appState.learningString = SourceString;

app.use(express.json());

app.use(LoggingMiddleware.handler);
app.use(ContentTypeMiddleware.handler);
app.use(SuppressExpressHeaderMiddleware.handler);
// app.use(cors({
//     origin: 'http://localhost:4200'
// }));
// app.use(cors({
//     origin: 'http://localhost:8080'
// }));
app.use(cors());

app.get('/:keyword', (req: Request, res: Response) => {
    res.send(appState.predictionModel?.predictNext(req.params["keyword"]));
});

app.post('/', (req: Request, res: Response) => {
    const localLearningString = req.body["sourceString"];

    if (!localLearningString) {
        res.sendStatus(400);
    }

    appState.learningString = localLearningString;
    res.sendStatus(200);
});

app.get('/', (req: Request, res: Response) => {
    res.send({
        "sourceString": appState.learningString
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
