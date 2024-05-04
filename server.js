// index.js or server.js (backend)
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A client connected');

    // Example: Subscribe to a chat channel
    socket.on('subscribeToChat', () => {
        socket.join('chat');
        console.log('Client subscribed to chat');
    });

    // Example: Publish message to the chat channel
    socket.on('publishToChat', (data) => {
        io.to('chat').emit('message', data);
        console.log('Message published to chat:', data);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
