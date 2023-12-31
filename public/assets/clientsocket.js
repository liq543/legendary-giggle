const socket = io.connect(window.location.origin);
let currentRoomCode = null;
const messageElement = document.createElement("p");
const loaderContainer = document.querySelector(".loader-container");
const mainContainer = document.querySelector(".main-container");
const sounderView = document.getElementById('sounderView');
const guesserView = document.getElementById('guesserView');
messageElement.id = "roomCodeMessage"; // Assign an id for future reference

function displayRoomCodeMessage(roomCode) {
    // Check for and remove the existing message element if it exists
    const existingMessage = document.getElementById("roomCodeMessage");
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create a new message element
    messageElement.textContent = `Room created ${roomCode} Please join it now to play`;

    // append to main-container
    mainContainer.appendChild(messageElement);
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
    socket.emit('startNewRound', roomCode);
}
function pressedSave(roomCode) {
    console.log('user pressed save LOCAL TEST - Before Timeout');
    setTimeout(() => {
        console.log('Inside setTimeout - About to run worstcoder');
        worstcoder(roomCode);
    }, 2000);
}

function worstcoder(roomCode) {
    console.log('Inside worstcoder - Emitting pressedSave event');
    socket.emit('pressedSave', roomCode);
}

//assign was assin?? i assumed it was error 
socket.on('assignRole', (role) => {
    console.log('Role assigned:', role);
    sessionStorage.setItem('userRole', role);
});

// Listeners
socket.on('roomCreated', (roomCode) => {
    console.log('Room Created:', roomCode);
    currentRoomCode = roomCode; // Store the room code in the global variable
    displayRoomCodeMessage(roomCode); // Display the message on the page
});

socket.on('roundUpdate', (roundNumber, randomWord) => {
    console.log('Round number:', roundNumber, 'Word for this round:', randomWord.word);

    const gameImage = document.getElementById('gameImage');
    gameImage.src = randomWord.image;

    const gameWorldElement = document.getElementById('gameWord');
    gameWorldElement.textContent = randomWord.word;

    currentWord = randomWord.word;
});

document.getElementById('playSound').addEventListener('click', function() {
    const audioPlayback = document.getElementById('audioPlayback');
    audioPlayback.play();
});

document.getElementById('submitGuess').addEventListener('click', function() {
    const userGuess = document.getElementById('userGuess').value;
    if (userGuess === currentWord) {
        guesserScore++;
        document.getElementById('guesserScore').textContent = guesserScore;
        alert("Correct guess!");
    } else {
        alert("Wrong guess. Try again!");
    }
});

socket.on('joinedRoom', (roomCode) => {
    console.log('Joined Room:', roomCode);
    mainContainer.style.display = "none";
    loaderContainer.style.display = "flex";
});

socket.on('playersReady', () => {
    console.log('Both players are ready!');
    loaderContainer.style.display = "none";
    socket.emit('startNewRound', currentRoomCode)
    if (sessionStorage.getItem('userRole') === 'host') {
        sounderView.style.display = "block";
        guesserView.style.display = "none";
    } else if (sessionStorage.getItem('userRole') === 'guest') {
        sounderView.style.display = "none";
        guesserView.style.display = "block";
    }
});

socket.on('otherUserPressed', () => {
    console.log('The other user pressed the button!');
    // Handle the other user's action
});

socket.on('error', (message) => {
    console.error(message);
    // Handle the error
});

socket.on('soundUploaded', (filePath) => {
    console.log('Sound file uploaded at:', filePath);
    const audioSource = document.getElementById('audioSource');
    audioSource.src = filePath;

    // Force the audio element to load the new source.
    const audioPlayback = document.getElementById('audioPlayback');
    audioPlayback.load();
});