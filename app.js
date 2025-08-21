import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socketController from './controllers/socketController.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => socketController(socket, io));

server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor en puerto ${process.env.PORT || 3000}`);
});
