import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';

import booksRoutes from './api/routes/books.routes';

const app: Application = express();

//Dotenv file location
dotenv.config();

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/books', booksRoutes);

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
