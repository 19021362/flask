//========================================================================
// Drag and drop audio handling
//========================================================================

var genderFileSelect = document.getElementById("genderInputFile");
var emotionFileSelect = document.getElementById("emotionInputFile");

// Add event listeners
genderFileSelect.addEventListener("change", fileSelectHandler, false);
emotionFileSelect.addEventListener("change", fileSelectHandler, false);

function fileDragHover(e) {
    // prevent default behaviour
    e.preventDefault();
    e.stopPropagation();

}

function fileSelectHandler(e) {
    // handle file selecting
    var files = e.target.files || e.dataTransfer.files;
    fileDragHover(e);
    for (var i = 0, f; (f = files[i]); i++) {
        previewFile(f);
    }
}

//========================================================================
// Web page elements for functions to use
//========================================================================

var audioPreview = document.getElementById("audio-preview");
var audioDisplay = document.getElementById("audio-display");
var uploadCaption = document.getElementById("upload-caption");
var predResult = document.getElementById("pred-result");
var loader = document.getElementById("loader");

//========================================================================
// Main button events
//========================================================================

function genderSubmitAudio() {
    // action for the submit button
    console.log("gender submit");

    if (!audioDisplay.src || !audioDisplay.src.startsWith("data")) {
        window.alert("Please select an audio before submit.");
        return;
    }

    loader.classList.remove("hidden");
    audioDisplay.classList.add("loading");

    // call the predict function of the backend
    genderPredictAudio(audioDisplay.src);
}

function emotionSubmitAudio() {
    // action for the submit button
    console.log("emotion submit");

    if (!audioDisplay.src || !audioDisplay.src.startsWith("data")) {
        window.alert("Please select an audio before submit.");
        return;
    }

    loader.classList.remove("hidden");
    audioDisplay.classList.add("loading");

    // call the predict function of the backend
    emotionPredictAudio(audioDisplay.src);
}


function previewFile(file) {
    // show the preview of the audio
    console.log(file.name);
    var fileName = encodeURI(file.name);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        audioPreview.src = URL.createObjectURL(file);

        show(audioPreview);
        hide(uploadCaption);

        // reset
        predResult.innerHTML = "";
        audioDisplay.classList.remove("loading");

        displayAudio(reader.result, "audio-display");
    };
}

//========================================================================
// Helper functions
//========================================================================

function genderPredictAudio(audio) {
    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(audio)
    })
        .then(resp => {
            if (resp.ok)
                resp.json().then(data => {
                    displayResult(data);
                });
        })
        .catch(err => {
            console.log("An error occured", err.message);
            window.alert("Oops! Something went wrong.");
        });
}

function emotionPredictAudio(audio) {
    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(audio)
    })
        .then(resp => {
            if (resp.ok)
                resp.json().then(data => {
                    displayResult(data);
                });
        })
        .catch(err => {
            console.log("An error occured", err.message);
            window.alert("Oops! Something went wrong.");
        });
}

function displayAudio(audio, id) {
    // display audio on given id <img> element
    let display = document.getElementById(id);
    display.src = audio;
    show(display);
}

function displayResult(data) {
    // display the result
    // audioDisplay.classList.remove("loading");
    hide(loader);
    predResult.innerHTML = data.result;
    show(predResult);
}

function hide(el) {
    // hide an element
    el.classList.add("hidden");
}

function show(el) {
    // show an element
    el.classList.remove("hidden");
}