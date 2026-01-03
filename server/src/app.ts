import { createServer } from 'http';
import express, { type Express, type Request, type Response } from 'express';
import { Server } from 'socket.io';
import { CLIENT_PORT, NODE_ENV, SECRET_COOKIE } from '#config/env.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from '#routes/index.routes.js';

const app: Express = express();

const server = createServer(app);

// Socket
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:${CLIENT_PORT}`],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: [`http://localhost:${CLIENT_PORT}`],
    credentials: true,
  })
);

app.use(helmet());
app.use(cookieParser(SECRET_COOKIE));

// App Routes
app.use('/', routes);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    url: req.url,
    status: 'OK',
    timestamp: new Date().toLocaleTimeString(),
    environment: NODE_ENV,
    uptime: Math.floor(process.uptime()),
  });
});

export { app, server, io };
