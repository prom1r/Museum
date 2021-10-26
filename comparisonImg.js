const bottomImg = document.getElementById('img-bottom');
const topImg = document.getElementById('img-top');
const topImgContainer = document.getElementById('img-top-container');

let bottomLoaded = false;
let topLoaded = true;

const startComparisonImg = () => {
    if (!bottomLoaded && !topLoaded) {
        return;
    }

    const slider = document.getElementById('slider');
    const offsetLeft = bottomImg.getBoundingClientRect().left;
    const maxWidth = topImgContainer.offsetWidth;
    
    const setSliderPosition = left => {
        topImgContainer.style.width = `${left}px`;
        slider.style.left = left < 0 ? '0px' : `${left - 20}px`;
    }
    
    setSliderPosition(maxWidth);
    
    slider.addEventListener('drag', event => {
        if (event.x === 0 && event.y === 0) {
            return;
        }
    
        let dragXContainer = event.x - offsetLeft;
        if (dragXContainer < 0) {
            dragXContainer = 0;
        } else if (dragXContainer > maxWidth) {
            dragXContainer = maxWidth;
        }
    
        setSliderPosition(dragXContainer);
    });
}

bottomImg.addEventListener('load', () => {
    bottomLoaded = true;
    startComparisonImg();
})

topImg.addEventListener('load', () => {
    topLoaded = true;
    startComparisonImg();
})

