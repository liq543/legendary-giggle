const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    const rooms = {};

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('createRoom', () => {
            const roomCode = Math.random().toString(36).substring(7).toUpperCase(); // Generate random room code
            rooms[roomCode] = { host: socket.id, guest: null };
            socket.join(roomCode);
            socket.emit('roomCreated', roomCode);
        });

        socket.on('joinRoom', (roomCode) => {
            if (rooms[roomCode] && !rooms[roomCode].guest) {
                rooms[roomCode].guest = socket.id;
                socket.join(roomCode);
                socket.emit('joinedRoom', roomCode);
                io.to(roomCode).emit('playersReady');
            } else {
                socket.emit('error', 'Invalid room code or room is full.');
            }
        });

        socket.on('pressButton', (roomCode) => {
            socket.to(roomCode).emit('otherUserPressed');
        });
    });
}

module.exports = {
    initializeSocket
};
