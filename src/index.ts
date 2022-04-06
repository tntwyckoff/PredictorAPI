// todo: handle punctuation

import express, { Request, Response, Application } from 'express';
import { ApplicationStateModel } from './ApplicationStateModel';
import { ContentTypeMiddleware } from './middleware/contentTypeMiddleware';
import { LoggingMiddleware } from './middleware/loggingMiddleware';
import { SuppressExpressHeaderMiddleware } from './middleware/suppressExpressHeaderMiddleware';

const cors = require('cors');
const app: Application = express();
const PORT = process.env.PORT || 8080;
//const SourceString: string = "In all areometer work it is necessary to ascertain the temperature of the water sample under examination with great exactness, as the volume of the areometer as well as the specific gravity of the water varies with temperature.";
const SourceString: string = "yesterday morning when Gregor Samsa woke from troubled dreams he found himself transformed in his bed into a horrible vermin He lay on his armour-like back and if he lifted his head a little he could see his brown belly slightly domed and divided by arches into stiff sections The bedding was hardly able to cover it and seemed ready to slide off any moment His many legs pitifully thin compared with the size of the rest of him waved about helplessly as he looked Whats happened to me he thought It wasnt a dream His room a proper human room although a little too small lay peacefully between its four familiar walls A collection of textile samples lay spread out on the table Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice gilded frame It showed a lady fitted out with a fur hat and fur boa who sat upright raising a heavy fur muff that covered the whole of her lower arm towards the viewer Gregor then turned to look out the window at the dull weather";
const appState: ApplicationStateModel = new ApplicationStateModel();
appState.learningString = SourceString;

app.use(express.json());

app.use(LoggingMiddleware.handler);
app.use(ContentTypeMiddleware.handler);
app.use(SuppressExpressHeaderMiddleware.handler);
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
