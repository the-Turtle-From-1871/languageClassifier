// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("myForm").addEventListener("submit", function(event) {
//         event.preventDefault(); // Prevent form submission

       
//         // Get form inputs
//         var name = document.getElementById("name").value;
//         var email = document.getElementById("email").value;
//         var phone = document.getElementById("phone").value;
//         var message = document.getElementById("message").value;
  
//         // Create data object
//         var data = {
//             name: name,
//             email: email,
//             phone: phone,
//             message: message
//         };
// }};

let mediaRecorder;
let recordedChunks = [];

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const audioElement = document.getElementById('audioElement');

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function(event) {
        recordedChunks.push(event.data);
    }

    mediaRecorder.onstop = function() {
        const blob = new Blob(recordedChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        audioElement.src = url;
    }

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopRecording() {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
}
