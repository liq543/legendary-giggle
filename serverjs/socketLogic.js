const socketIo = require('socket.io');
const Word = require('../models/Word');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
let io;

async function getRandomWord(excludedWords) {
    let randomWord = await Word.findOne({
        where: {
            id: {
                [Op.notIn]: excludedWords // Op.notIn ensures the id is not in the excluded list
            }
        },
        order: sequelize.literal('RAND()') // Order by random to get a random word
    });
    
    return randomWord;
}

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    const rooms = {};

    io.on('connection', (socket) => {
        console.log('User connected to socket: ', socket.id);
        
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
            rooms[roomCode] = { host: null, guest: null, round: 0, selectedWords: [] }; // Do not set the host when the room is created
            socket.emit('roomCreated', roomCode); // Notify the user about the room creation
        });
        
        socket.on('joinRoom', (roomCode) => {
            console.log(`User with socket ID ${socket.id} attempting to join room: ${roomCode}`);
            if (rooms[roomCode]) {
                if (!rooms[roomCode].host) {
                    // First person to join gets the host role
                    rooms[roomCode].host = socket.id;
                    socket.join(roomCode);
                    socket.emit('joinedRoom', roomCode);
                    socket.emit('assignRole', 'host');
                    console.log(`User with socket ID ${socket.id} assigned as host for room: ${roomCode}`);
                } else if (!rooms[roomCode].guest) {
                    // Second person to join gets the guest role
                    rooms[roomCode].guest = socket.id;
                    socket.join(roomCode);
                    socket.emit('joinedRoom', roomCode);
                    io.to(roomCode).emit('playersReady');
                    socket.emit('assignRole', 'guest');
                    console.log(`User with socket ID ${socket.id} assigned as guest for room: ${roomCode}`);
                } else {
                    console.log(`User with socket ID ${socket.id} attempted to join room: ${roomCode}, but it's full.`);
                    socket.emit('error', 'Room is full.');
                }
            } else {
                console.log(`User with socket ID ${socket.id} attempted to join with an invalid room code: ${roomCode}`);
                socket.emit('error', 'Invalid room code.');
            }
        });
        socket.on('pressButton', (roomCode) => {
            socket.to(roomCode).emit('otherUserPressed');
            console.log(`sending ${roomCode} to other user`); // Corrected string interpolation
        });
        socket.on('startNewRound', async (roomCode) => {
            if (rooms[roomCode]) {
                rooms[roomCode].round++;
                let randomWord = await getRandomWord(rooms[roomCode].selectedWords);
                console.log('received word from server', randomWord);

                if (randomWord) {
                    rooms[roomCode].selectedWords.push(randomWord.id);
                    io.to(roomCode).emit('roundUpdate', rooms[roomCode].round, randomWord);
                } else {
                    // Handle if no words left or something idk
                    console.log('idk how u triggered this but u did')
                }
            }
        });
    });
}
module.exports = {
    initializeSocket
};
