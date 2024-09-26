import express, { Express } from 'express';
import beeperRouter from './routes/beeperRouter';
import "dotenv/config";

const app:Express = express();
app.use(express.json());

app.use('/api/beepers', beeperRouter);

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}...`);
});
