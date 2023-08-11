const socket = io.connect('legendary-giggle-4c67ca9ca408.herokuapp.com');

// Function to create a room
function createRoom() {
    socket.emit('createRoom');
}

// Function to join a room
function joinRoom(roomCode) {
    socket.emit('joinRoom', roomCode);
}

// Function to notify other user
function pressButton(roomCode) {
    socket.emit('pressButton', roomCode);
}

// Listeners
socket.on('roomCreated', (roomCode) => {
    console.log('Room Created:', roomCode);
    // Update your UI accordingly
});

socket.on('joinedRoom', (roomCode) => {
    console.log('Joined Room:', roomCode);
    // Update your UI accordingly
});

socket.on('playersReady', () => {
    console.log('Both players are ready!');
    // Display the 'OK' button
});

socket.on('otherUserPressed', () => {
    console.log('The other user pressed the button!');
    // Handle the other user's action
});

socket.on('error', (message) => {
    console.error(message);
    // Handle the error
});
