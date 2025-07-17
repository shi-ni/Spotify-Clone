console.log('Spotify app');
// audioElement.play();

// declaring variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let progressBar = document.getElementById('progressBar');
let masterPlay = document.getElementById('masterPLay');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songListplay = document.getElementsByClassName("songListplay");
let songItemplay = document.getElementsByClassName('songItemplay');
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');
let songNametag = document.getElementById('songNametag');

//let miniPlay = document.getElementById('miniPlay');

let songs = [
    {songName:"Into your arms", filePath:"songs/1.mp3", coverPath:"covers/bg1.jpg"},
    {songName:"Warriyo mortals", filePath:"songs/2.mp3", coverPath:"covers/bg2.png"},
]


//logic ig :|
songItem.forEach((element, index)=> {
    // console.log(element, index);
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[index].songName;
});

// play/stop music
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// Events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeUpdate');
    // Seek bar update:
    seekBar = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    // console.log(seekBar)
    progressBar.value = seekBar;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllplays = ()=>{
    Array.from(songItemplay).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}

Array.from(songItemplay).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(f.target);// to get the clicked element
        makeAllplays();
        gif.style.opacity = 1
        songIndex =  parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        
        audioElement.src = `songs/${songIndex+1}.mp3`
        songNametag.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
  })
})

forward.addEventListener('click', ()=>{
    if(songIndex >= 2){
        songIndex = 0
    }
    else{
        songIndex+=1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play()
    songNametag.innerText = songs[songIndex].songName
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

backward.addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex-=1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play()
    songNametag.innerText = songs[songIndex].songName
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

