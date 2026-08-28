let currentSong=new Audio();
let song;
let currentfolder;
//function for convert sec to min
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder){
currentfolder = folder;
let songs =await fetch(`http://127.0.0.1:5500/${folder}/`);
let responce = await songs.text();
console.log(responce);
let div = document.createElement("div");
div.innerHTML=responce;
let as = div.getElementsByTagName("a");
song = []
for(let i = 0;i<as.length;i++){ 
    const element = as[i];
    if(element.href.endsWith(".mp3")){
        song.push(element.href.split(`http://localhost:5500/${folder}/`)[1]);
    }
}

let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
songUL.innerHTML=""
for (const item of song){
    songUL.innerHTML = songUL.innerHTML.replaceAll("%20"," ") + `<li>
                <img src="music.svg" alt="">
                <div class="inof">
                  <div>${item}</div>
                  <div>song artist</div>
                </div>
                <img class="invert" src="play.svg" atl="">
              </li>`;
}

//add event on each songs
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e)=>{
e.addEventListener("click",element=>{
console.log(e.querySelector(".inof").firstElementChild.innerHTML);
playmusic(e.querySelector(".inof").firstElementChild.innerHTML.trim());
});
});

return song;
}

const playmusic=(track,pause=false)=>{
  // let audio = new Audio("/songs/"+track)
  currentSong.src=`http://localhost:5500/${currentfolder}/`+track;
  if(!pause){
    currentSong.play();
  }
  play.src="pause.svg"
  document.querySelector(".songinfo").innerHTML=decodeURI(track);
  document.querySelector(".songtime").innerHTML="00:00/00:00";
}

async function displayalbums() {
let songs =await fetch(`http://127.0.0.1:5500/songs/`);
let responce = await songs.text();
console.log(responce);
let div = document.createElement("div");
div.innerHTML=responce;
let anchors = div.getElementsByTagName("a")
let cardContainer = document.querySelector(".cardContainer");
let array = Array.from(anchors)
for(let index=0;index < array.length;index++){
  const e = array[index];

  if(e.href.includes("/songs/")){
    let folder = e.href.split("/").slice(-1)[0];
    //get the metadata of folder
    let songs =await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
    let responce = await songs.json();
    console.log(responce)
    cardContainer.innerHTML = cardContainer.innerHTML+ `  <div  data-folder="${folder}" class="card">
              <div class="play">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <!-- Green circular background -->
                  <circle cx="24" cy="24" r="22" fill="#188d42" />
                  <!-- Black play icon -->
                  <path d="M18 14V34L34 24L18 14Z" fill="black" />
                </svg>
              </div>
              <img src="/songs/${folder}/s1.png" alt="s1" />
              <h2>${responce.title}</h2>
              <p>${responce.description}</p>
            </div>`
  }
}
//load the playlist when card click
Array.from(document.getElementsByClassName("card")).forEach((e)=>{
e.addEventListener("click",async(item)=>{
  song =await getSongs(`songs/${item.currentTarget.dataset.folder}`);
  playmusic(song[0]);
})
})
console.log(anchors);
}

async function main(){
//get list of songs
await getSongs("songs/cs");
playmusic(song[0],true);
console.log(song);

//display all the albums on the page
displayalbums();


//add event on buttons
play.addEventListener("click",()=>{
if(currentSong.paused){
  currentSong.play();
  play.src="pause.svg";
}else{
  currentSong.pause();
  play.src="play.svg";
}
});

//add event timeupdate
currentSong.addEventListener("timeupdate",()=>{
console.log(currentSong.currentTime,currentSong.duration);
document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%";
})

//add event on seekbar
document.querySelector(".seekbar").addEventListener("click",(e)=>{
let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 ;
document.querySelector(".circle").style.left=percent + "%";
currentSong.currentTime = (currentSong.duration) * percent / 100;
})

//add event on hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
document.querySelector(".left").style.left="0";
})

//add event on close 
document.querySelector(".close").addEventListener("click",()=>{
document.querySelector(".left").style.left="-110%"
});

//add event on previews and next
p.addEventListener("click",()=>{
console.log("clicked");
let index = song.indexOf(currentSong.src.split("/").slice(-1)[0])
  if((index-1) >= 0){
    playmusic(song[index-1])
  }
});

n.addEventListener("click",()=>{
  console.log("next");
  let index = song.indexOf(currentSong.src.split("/").slice(-1)[0])
  if((index+1) < song.length){
    playmusic(song[index+1])
  }
});

//add event on volume
document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
console.log(e,e.target,e.target.value);
currentSong.volume = parseInt(e.target.value)/100;
if(currentSong.volume > 0){
document.querySelector(".volume img").src=document.querySelector(".volume img").src.replace("mute.svg","volume.svg")
}
});

//add event on volume to mute
document.querySelector(".volume img").addEventListener("click",(e)=>{
  console.log(e.target);
  if(e.target.src.includes("volume.svg")){
    e.target.src=e.target.src.replace("volume.svg","mute.svg")
    currentSong.volume=0;
    document.querySelector(".volume").getElementsByTagName("input")[0].value=0;
  }
  else{
    e.target.src=e.target.src.replace("mute.svg","volume.svg")
    currentSong.volume=.10;
    document.querySelector(".volume").getElementsByTagName("input")[0].value=10;
  }
}) 
}

main();    
