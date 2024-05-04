const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let messages = []; // Array to store messages

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A client connected');

    // Subscribe to the chat channel
    socket.on('subscribeToChat', () => {
        socket.join('chat');
        console.log('Client subscribed to chat');
    });

    // Publish message to the chat channel
    socket.on('publishToChat', (data) => {
        messages.push(data); // Add new message to the array
        io.to('chat').emit('message', data);
        console.log('Message published to chat:', data);
    });

    // Handle like
    socket.on('like', (likedMessageId) => {
        const likedMessage = messages.find(message => message.id === likedMessageId);
        if (likedMessage) {
            likedMessage.likes++;
            io.to('chat').emit('likeCountUpdate', likedMessage); // Emit like count update event
            console.log('Message liked:', likedMessage);
        }
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
