const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log('Received message:', message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  socket.on('like', (messageId) => {
    console.log('Received like for message ID:', messageId);
    // Broadcast the like event to all connected clients
    io.emit(`likeCountUpdate_${messageId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
