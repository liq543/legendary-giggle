const socket = io.connect(window.location.origin);
let currentRoomCode = null;
function displayRoomCodeMessage(roomCode) {
    // Check for and remove the existing message element if it exists
    const existingMessage = document.getElementById("roomCodeMessage");
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create a new message element and append it to the body
    const messageElement = document.createElement("p");
    messageElement.id = "roomCodeMessage"; // Assign an id for future reference
    messageElement.textContent = `Room created ${roomCode}. Please join it now to play`;
    document.body.appendChild(messageElement);
}
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
    currentRoomCode = roomCode; // Store the room code in the global variable
    displayRoomCodeMessage(roomCode); // Display the message on the page
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
