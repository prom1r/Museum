document.querySelector('#play').onclick = play;
document.querySelector('#pause').onclick = pause;
document.querySelector('#speed-up').onclick = speedUp;
document.querySelector('#speed-down').onclick = speedDown;
document.querySelector('#normal').onclick = speedNormal;
document.querySelector('#volume').oninput = videoVolume;

let video;
let display;
let progress;
video = document.querySelector('#video-player');
progress = document.querySelector('#progress');
video.ontimeupdate = progressUpdate;
progress.onclick = videoRewind;

function play() {
    video.play()
    video.playbackRate = 1
}

function pause() {
    video.pause()
}


function speedUp() {
    video.play()
    video.playbackRate = 2

}

function speedDown() {
    video.play()
    video.playbackRate = 0.5
}

function speedNormal() {
    video.play()
    video.playbackRate = 1
}

function videoVolume() {
    let v = this.value
    video.volume = v / 100
    if (video.volume == 0) {
        volumeOn.style.display = 'none'
        volumeOff.style.display = 'block'
    } else if (video.volume > 0) {
        volumeOn.style.display = 'block'
        volumeOff.style.display = 'none'
    }
}

function progressUpdate() {
    let d = video.duration
    let c = video.currentTime
    progress.value = 100 * c / d
        // document.querySelector('#out').innerHTML = video.currentTime
    if (progress.value == 100) {
        buttonPlay.style.display = 'block'
        buttonPause.style.display = 'none'
        buttonPlayCenter.style.display = 'block'
    }
}

function videoRewind() {
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = 100 * o / w;

    if (isPlaying) {
        video.pause();
        video.currentTime = video.duration * (o / w);
        video.play();
    } else {
        video.currentTime = video.duration * (o / w);
    }
}

const volumeEx = document.querySelector('.volume');

volumeEx.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
})

const buttonPlay = document.querySelector('.button-play');
const buttonPause = document.querySelector('.button-pause');

let isPlaying = false;
const setPlay = () => {
    isPlaying = true;
    buttonPlay.style.display = 'none';
    buttonPause.style.display = 'block';
    buttonPlayCenter.style.display = 'none';
}

const setPause = () => {
    isPlaying = false;
    buttonPlay.style.display = 'block';
    buttonPause.style.display = 'none';
    buttonPlayCenter.style.display = 'block';
}

buttonPlay.addEventListener('click', setPlay);
buttonPause.addEventListener('click', setPause);

const headVideo = document.querySelector('.head-video')
const buttonPlayCenter = document.querySelector('.central-button-play');
headVideo.addEventListener('click', function() {
    if (isPlaying) {
        setPause();
        pause();
    } else {
        setPlay();
        play();
    }
})

buttonPlayCenter.addEventListener('click', function() {
    buttonPlay.style.display = 'none';
    buttonPause.style.display = 'block';
    buttonPlayCenter.style.display = 'block';

    play();
})

const volumeOn = document.querySelector('.icon-volume');
volumeOn.addEventListener('click', function() {
    video.volume = 0
    volumeOn.style.display = 'none'
    volumeOff.style.display = 'block'
    volumeEx.value = 0
})
const volumeOff = document.querySelector('.icon-volume-mute');
volumeOff.addEventListener('click', function() {
    video.volume = 0.5
    volumeOn.style.display = 'block'
    volumeOff.style.display = 'none'
    volumeEx.value = 50
})


const fullScreen = document.querySelector('.full-screen ')
const fullScreenExit = document.querySelector('.full-screen-exit')
fullScreen.addEventListener('click', openFullscreen)

function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyM') {
        video.volume = 0
        volumeOn.style.display = 'none'
        volumeOff.style.display = 'block'
        volumeEx.value = 0
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyF') {
        openFullscreen()
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        pause()
        buttonPlay.style.display = 'block'
        buttonPause.style.display = 'none'
        buttonPlayCenter.style.display = 'block'
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key == '<' && (event.shiftKey)) {
        speedUp()
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key == '>' && (event.shiftKey)) {
        speedDown()
    }
});



/*  carusel */
let num = 0
const sliders = document.querySelectorAll('.slider__items iframe')
const leftButton = document.querySelector('.left-video')
const rightButton = document.querySelector('.right-video')
const videoPoster = document.querySelector('.poster-video')
const srcVideo = document.querySelector('.src-video')
const videoBtn = document.querySelectorAll('.btn-video')

let carousel;
document.addEventListener('DOMContentLoaded', function() {
    carousel = new ChiefSlider('.sliders', {
        loop: true
    });
});

const startSlide = (e) => {
    const btn = e.target;
    const index = [...videoBtn].indexOf(btn);

    if (index === num) {
        return;
    }

    const right = index > num;
    if (right) {
        const steps = index - num;
        for (let i = 0; i < steps; i++) {
            carousel._moveToNext();
            moveToNext();
        }
    } else {
        const steps = num - index;
        for (let i = 0; i < steps; i++) {
            carousel._moveToPrev();
            moveToPrev();
        }
    }
}

for (elem of videoBtn) {
    elem.addEventListener('click', startSlide);
}


const activeBtnVideo = (n) => {
    for (bt of videoBtn) {
        bt.classList.remove('active')
    }
    videoBtn[n].classList.add('active')

}

const moveToNext = () => {
    if (num == sliders.length - 1) {
        num = 0
    } else {
        num++
    }
    reloadVideo(num);
}

const moveToPrev = () => {
    if (num == 0) {
        num = sliders.length - 1
    } else {
        num--
    }
    reloadVideo(num);
}

rightButton.addEventListener('click', moveToNext)
leftButton.addEventListener('click', moveToPrev);

function reloadVideo(num) {
    video.pause();
    video.load();
    progress.value = 0;
    setPause();
    
    switch(num) {
        case 0:
            videoPoster.poster = 'assets/img/poster0.jpeg';
            srcVideo.src = 'assets/video/Welcome_to_the_Louvre.mp4';
            break;
        case 1:
            videoPoster.poster = 'assets/img/poster3.jpeg';
            srcVideo.src = 'assets/video/video3.mp4';
            break;
        case 2:
            videoPoster.poster = 'assets/img/poster1.jpeg';
            srcVideo.src = 'assets/video/video1.mp4';
            break;
        case 3:
            videoPoster.poster = 'assets/img/poster2.jpeg';
            srcVideo.src = 'assets/video/video2.mp4';
            break;
        case 4:
            videoPoster.poster = 'assets/img/poster4.jpeg';
            srcVideo.src = 'assets/video/video4.mp4';
            break;
    }

    activeBtnVideo(num);
}