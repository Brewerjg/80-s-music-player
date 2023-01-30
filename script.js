const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'whitebat-5',
        displayName: 'New Beginnings',
        artist: 'WhiteBat Audio',
    },
    {
        name: 'whitebat-1',
        displayName: 'Vapor',
        artist: 'WhiteBat Audio',
    },
    {
        name: 'whitebat-2',
        displayName: 'The Saga',
        artist: 'WhiteBat Audio',
    },
    {
        name: 'whitebat-3',
        displayName: 'Hackers',
        artist: 'WhiteBat Audio',
    },
    {
        name: 'whitebat-4',
        displayName: 'Miami Sky',
        artist: 'WhiteBat Audio',
    }
]

// check if playing
let isplaying = false


// play
function playsong(){
    isplaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pausesong(){
    isplaying = false
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// event listner
playBtn.addEventListener('click', () => (isplaying ? pausesong() : playsong()) );

// update DOM
function loadsong (song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// prev song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadsong(songs[songIndex]);
    playsong();
}

// next song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1){
        songIndex = 0;
    }
    loadsong(songs[songIndex]);
    playsong();
}

// load select first
loadsong(songs[songIndex])

// update progress bar
function updateProgressBar(e){
    if(isplaying){
        const { duration, currentTime } = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // delay to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// event listners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);