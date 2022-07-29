// console.log("Js is working")

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songDurationSec = document.getElementById('songDurationSec');
let songDurationSec1 = document.getElementById('songDurationSec1');
let songDurationMin = document.getElementById('songDurationMin');

let songs = [
    {songName: "Alan Walker - Alone", filePath: "/songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Alan Walker - Spectre", filePath: "/songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Elektronomia - Energy", filePath: "/songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Alan Walker - Fade", filePath: "/songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji - Heroes Tonight", filePath: "/songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Anikdote - Turn It Up", filePath: "/songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Culture Code - Make Me Move", filePath: "/songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Lost Sky - Fearless pt.II", filePath: "/songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Unknown Brain - Why Do I", filePath: "/songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Warriyo - Mortals", filePath: "/songs/10.mp3", coverPath: "covers/10.jpg"},
]

// console.log(songs.length);
// console.log(audioElement.currentTime)

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        // makeAllPlay1();
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        // makeAllPlay();
    }
});

audioElement.addEventListener('timeupdate', () => {
    // update musicbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    songDurationSec.innerHTML = Math.floor(audioElement.currentTime);
    songDurationMin.innerHTML = Math.floor(songDurationSec.innerHTML / 60);
    songDurationSec1.innerHTML = Math.floor(songDurationSec.innerHTML / 10);
    songDurationSec1.innerHTML = Math.floor(songDurationSec.innerHTML / 10) % 6;
    songDurationSec.innerHTML = songDurationSec.innerHTML % 10;
    // console.log(songDurationSec)
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-music');        
        element.classList.add('fa-circle-play');
    })
}
// const makeAllPlay1 = () => {
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
//         element.classList.remove('fa-circle-play');        
//         element.classList.add('fa-circle-pause');
//     })
// }

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        let songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-music')
        e.target.classList.remove('fa-circle-play')
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

document.getElementById('next').addEventListener('click', ()=> {

    songIndex +=1;

    if(songIndex > 9) {
        songIndex = 0;
    } 

    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    // console.log(songIndex)
});

document.getElementById('previous').addEventListener('click', ()=> {

   songIndex -= 1;

   if (songIndex < 0) {
        songIndex = 9;
   } 

   audioElement.src = `Songs/${songIndex+1}.mp3`;
   masterSongName.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   gif.style.opacity = 1;
   masterPlay.classList.remove('fa-circle-play');
   masterPlay.classList.add('fa-circle-pause');
//    console.log(songIndex)
})