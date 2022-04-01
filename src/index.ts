// todo: handle punctuation
// todo: keep a source string in memory somewhereand allow a POST to change it

import express, { Request, Response, Application }  from 'express';
import { ApplicationStateModel } from './ApplicationStateModel';
import { LoggingMiddleware } from './middleware/loggingMiddleware';
import { Predictor } from './Predictor';

const app:Application = express();
const PORT = 8080;
const SourceString:string = "One Two Two Four Four One Three One Four One Two Three One Two four Two four";
const appState:ApplicationStateModel = new ApplicationStateModel();
appState.learningString = SourceString;

app.use(express.json());
app.use(LoggingMiddleware.handler);

app.get('/:keyword', (req:Request, res:Response) => {
    res.send(appState.predictionModel?.predictNext(req.params["keyword"]));
  })

//   app.get('/', (req:Request, res:Response) => {
//     res.send({
//         "sourceString": appState.learningString
//       });
//   })
    
app.post('/', (req:Request, res:Response) => {
    const localLearningString = req.body["sourceString"];

    if(!localLearningString) {
        res.sendStatus(400);
    }

    appState.learningString = localLearningString;
    res.sendStatus(200);
  })

  app.get('/', (req:Request, res:Response) => {
    res.send({
        "sourceString": appState.learningString
      });
  })
    
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
