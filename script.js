let isRunning = false;
let interval;
let startTime;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
        document.getElementById("lapReset").textContent = "Reset";
        isRunning = false;
    } else {
        if (laps.length === 0) {
            startTime = Date.now();
        } else {
            const lastLapTime = laps[laps.length - 1].time;
            startTime += Date.now() - lastLapTime;
        }
        interval = setInterval(updateDisplay, 10);
        document.getElementById("startStop").textContent = "Stop";
        document.getElementById("lapReset").textContent = "Lap";
        isRunning = true;
    }
}

function lapReset() {
    if (isRunning) {
        const currentTime = Date.now();
        const lapTime = currentTime;
        laps.push({ time: lapTime, lap: formatTime(currentTime - startTime) });
        const lapElement = document.createElement("li");
        lapElement.textContent = `Lap ${laps.length}: ${formatTime(currentTime - startTime)}`;
        document.getElementById("laps").appendChild(lapElement);
    } else {
        clearInterval(interval);
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        document.getElementById("milliseconds").textContent = "00";
        document.getElementById("laps").innerHTML = "";
        laps = [];
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    document.getElementById("minutes").textContent = pad(Math.floor(elapsedTime / 60000));
    document.getElementById("seconds").textContent = pad(Math.floor((elapsedTime % 60000) / 1000));
    document.getElementById("milliseconds").textContent = pad(Math.floor((elapsedTime % 1000) / 10));
}

function formatTime(time) {
    const minutes = pad(Math.floor(time / 60000));
    const seconds = pad(Math.floor((time % 60000) / 1000));
    const milliseconds = pad(Math.floor((time % 1000) / 10));
    return `${minutes}:${seconds}.${milliseconds}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}
// ...

function clearLaps() {
    clearInterval(interval);
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("milliseconds").textContent = "00";
    
    // Clear the laps array and the laps displayed on the page
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

// ...
