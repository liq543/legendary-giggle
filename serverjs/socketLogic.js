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
            // If this socket was previously the host of another room, delete that room
            for (let existingRoomCode in rooms) {
                if (rooms[existingRoomCode].host === socket.id) {
                    delete rooms[existingRoomCode];
                    // Optional: Emit to the previous room that the host has left
                    io.to(existingRoomCode).emit('hostLeft');
                    break; // Assuming a socket can only be a host of one room at a time
                }
            }
        
            const roomCode = Math.random().toString(36).substring(7).toUpperCase(); // Generate random room code
            rooms[roomCode] = { host: socket.id, guest: null };
            socket.emit('roomCreated', roomCode); // Notify the host about the room creation
        });

        socket.on('joinRoom', (roomCode) => {
            if (rooms[roomCode]) {
                if (rooms[roomCode].host === socket.id) {
                    // The host is joining the room they created
                    socket.join(roomCode);
                    socket.emit('joinedRoom', roomCode);
                } else if (!rooms[roomCode].guest) {
                    // A guest is joining the room
                    rooms[roomCode].guest = socket.id;
                    socket.join(roomCode);
                    socket.emit('joinedRoom', roomCode);
                    io.to(roomCode).emit('playersReady');
                } else {
                    socket.emit('error', 'Room is full.');
                }
            } else {
                socket.emit('error', 'Invalid room code.');
            }
        });

        socket.on('pressButton', (roomCode) => {
            socket.to(roomCode).emit('otherUserPressed');
            console.log(`sending ${roomCode} to other user`); // Corrected string interpolation
        });
    });

}

module.exports = {
    initializeSocket
};
