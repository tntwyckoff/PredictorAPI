import express, { Request, Response, Application }  from 'express';
import { LoggingMiddleware } from './middleware/loggingMiddleware';
import { Predictor } from './Predictor';

const app:Application = express();
// const PORT = process.env.PORT || 8080;
const PORT = 8080;
// const SourceString:string = "One;     Two, Three: () Four One !!! Three ?<> One Four";
const SourceString:string = "One Two Three Four One Three One Four One Two Three One Two Three";
const pre = new Predictor(SourceString);

app.use(express.json());
app.use(LoggingMiddleware.handler);

app.get('/:keyword', (req:Request, res:Response) => {
    res.send(pre.predictNext(req.params["keyword"]));
  })

  app.get('/', (req:Request, res:Response) => {
    res.send({
        "sourceString": SourceString
      });
  })
    
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
