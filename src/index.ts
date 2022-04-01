import express, { Request, Response, Application }  from 'express';

const app:Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Server side hello!');
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
