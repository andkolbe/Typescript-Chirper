import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import apiRouter from './routes'; // points to the index.ts file in the routes directory

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api', apiRouter);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html'))) // this puts the server and the website on the same location

const port = process.env.PORT || 3000; // variable?
app.listen(port, () => console.log(`Server listening on port: ${port}`));
