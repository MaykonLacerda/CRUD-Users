import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { router } from './routes';

import './database';

import './shared/container';
import { createConnection } from 'typeorm';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

export { app };