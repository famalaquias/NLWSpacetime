import 'dotenv/config';

import fastify from 'fastify';
import { resolve } from 'node:path';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';

import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';
import { uploadRoutes } from './routes/upload';

const app = fastify();

app.register(multipart);
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
});

app.register(cors, {
  /* todas as URLs de frontend poderão acessar nosso backend */
  origin: true,
});
app.register(jwt, {
  secret: 'spacetime',
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app.listen({
  port: 3334,
  host: '0.0.0.0',
}).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3334');
});
