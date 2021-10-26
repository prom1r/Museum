const btnLeft = document.querySelector('.arrow-left ')
const btnRight = document.querySelector('.arrow-right')
const slides = document.querySelectorAll('.slide')
const btns = document.querySelectorAll('.btn')
const numberImg = document.getElementById('number-img-check')


let index = 0

function changesNumber(num) {
    if (index == 0) {
        numberImg.value = "01"
    } else if (index == 1) {
        numberImg.value = "02"
    } else if (index == 2) {
        numberImg.value = "03"
    } else if (index == 3) {
        numberImg.value = "04"
    } else if (index == 4) {
        numberImg.value = "05"
    }
}


const activeSlide = (n) => {
    for (slide of slides) {
        slide.classList.remove('active')
    }
    slides[n].classList.add('active')

}

const activeBtn = (n) => {
    for (bt of btns) {
        bt.classList.remove('active')
    }
    btns[n].classList.add('active')

}

const nextSlide = () => {
    if (index == slides.length - 1) {
        index = 0
        activeSlide(index)
        activeBtn(index)
    } else {
        index++
        activeSlide(index)
        activeBtn(index)
    }
    changesNumber(index)
}
const prevSlide = () => {
    if (index == 0) {
        index = slides.length - 1
        activeSlide(index)
        activeBtn(index)
    } else {
        index--
        activeSlide(index)
        activeBtn(index)
    }
    changesNumber(index)
}
btns.forEach((item, indexDot) => {
    item.addEventListener('click', function() {
        index = indexDot;
        activeSlide(index)
        activeBtn(index)
        changesNumber(index)
    })
})
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)