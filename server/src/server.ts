import 'dotenv/config';

import fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';

import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';

const app = fastify();

app.register(cors, {
  /* todas as URLs de frontend poderão acessar nosso backend */
  origin: true,
});
app.register(jwt, {
  secret: 'spacetime',
});

app.register(authRoutes);
app.register(memoriesRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3333');
});
