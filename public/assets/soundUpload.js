let mediaRecorder;
let audioChunks = [];
const audioElem = document.getElementById("audioPlayback");
const startRecordBtn = document.getElementById("startRecord");
const stopRecordBtn = document.getElementById("stopRecord");
const redoBtn = document.getElementById("redo");
const saveBtn = document.getElementById("save");


navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.onstart = function() {
            audioChunks = [];
            startRecordBtn.disabled = true;
            stopRecordBtn.disabled = false;
        };

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = function() {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioElem.src = audioUrl;
            redoBtn.disabled = false;
            saveBtn.disabled = false;
        };

        startRecordBtn.addEventListener("click", () => {
            mediaRecorder.start();
            setTimeout(() => {
                mediaRecorder.stop();
            }, 10000); // Automatically stop after 10 seconds
        });

        stopRecordBtn.addEventListener("click", () => {
            mediaRecorder.stop();
        });

        redoBtn.addEventListener("click", () => {
            audioElem.src = "";
            startRecordBtn.disabled = false;
            stopRecordBtn.disabled = true;
            redoBtn.disabled = true;
            saveBtn.disabled = true;
        });

        saveBtn.addEventListener("click", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append("audio", audioBlob);

            fetch("/upload", {
                method: "POST",
                body: formData
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    console.log('upload success')
                    const uploadedSoundUrl = data.filepath;
                    socket.emit('sendSound', currentRoomCode, uploadedSoundUrl);
                } else {
                    console.log('upload failed')
                }
            });
        });

    })
    .catch(error => console.log("Error accessing audio device.", error));