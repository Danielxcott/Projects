let currentMusic = 0;

let music = document.querySelector("#audio");
let seekerBar = document.querySelector(".song-seeker")
let musicName = document.querySelector(".music-name")
let musicArtist = document.querySelector(".music-artist")
let disk = document.querySelector(".disk")
let currentTime = document.querySelector(".current-time")
let durationTime = document.querySelector(".duration-time")
let playBtn = document.querySelector(".play-button")
let backBtn = document.querySelector(".btn-backward")
let nextBtn = document.querySelector(".btn-forward")

playBtn.addEventListener('click',()=>{
    if(playBtn.className.includes('pause')){
        music.play()
    }else{
        music.pause()
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
})

//music setup

let setMusic =(i)=>{
    seekerBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    musicName.innerHTML = song.name;
    musicArtist.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`

    setTimeout(()=>{
    currentTime.innerHTML = '0:00';
    seekerBar.max = Number(music.duration);
    console.log(music.duration)
    durationTime.innerHTML = formatTime(music.duration);
    },300)
}
setMusic(0);

//formatting time in min and sec
let formatTime = (time) =>{
    let min = Math.floor(time / 60);
    // console.log(min)
//if time is divided by 60 and the answer is less than 10, min will show you like '02'
    if(min<10){
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
    if(sec < 10){
        sec =  `0${sec}`;
    }
    return `${min} : ${sec}`;
}

//seek bar
setInterval(() => {
    seekerBar.value = music.currentTime
// console.log(Number(music.currentTime))
    currentTime.innerHTML = formatTime(Number(music.currentTime))
    if(Math.floor(music.currentTime) == Math.floor(seekerBar.max)){
        nextBtn.click()
    }
}, 500);


seekerBar.addEventListener("change",()=>{
    music.currentTime = seekerBar.value;
})

let playMusic = ()=>{
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play')
}

//forward and backward button

nextBtn.addEventListener("click",function(){
    if(currentMusic >= songs.length-1){
        currentMusic = 0
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backBtn.addEventListener("click",function(){
    if(currentMusic <= 0){
        currentMusic = songs.length-1
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})