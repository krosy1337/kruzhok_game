import Swiper from 'swiper'
import 'swiper/css'
import '../css/styles.scss'

const headerNav = document.querySelector('.header__nav')
const headerBurger = document.querySelector('.header__burger')
const selectionSlider = document.querySelector('.selection__slider')
const selectionBtn = document.querySelector('.selection__confirm-btn')
const selectionText = document.querySelector('.selection__confirm-text')

let isTransition = false

function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
}
function transitionEnd() {
    isTransition = false
    if (document.body.classList.contains('lock')) {
        document.body.style.paddingRight = ``
    }
    else {
        document.body.style.paddingRight = `${getScrollBarWidth()}px`
        document.body.classList.add('changed-color')
    }
    console.log(document.body.classList.contains('lock'))
    document.body.classList.toggle('lock')

    headerNav.removeEventListener('transitionend', transitionEnd)
}
function transitionStart() {
    isTransition = true
    if (document.body.classList.contains('lock')) {
        document.body.classList.remove('changed-color')
    }
    headerNav.removeEventListener('transitionstart', transitionStart)
}

const swiper = new Swiper(document.querySelector('.swiper'), {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: true,
    simulateTouch: true,
})

headerBurger.addEventListener('click', () => {
    if (isTransition) {
        return
    }
    headerBurger.classList.toggle('active')
    headerNav.classList.toggle('active')
    headerNav.addEventListener('transitionstart', transitionStart)
    headerNav.addEventListener('transitionend', transitionEnd)
})

selectionSlider.addEventListener('click', event => {
    const target = event.target

    if (target.classList.contains('selection__slider-slide')) {
        const selectionSlides = document.querySelectorAll('.selection__slider-slide')
        selectionSlides.forEach(slide => {
            if (slide.dataset.swiperSlideIndex === target.dataset.swiperSlideIndex) {
                slide.classList.add('active')
                selectionBtn.disabled = false
                selectionText.innerHTML = `Вы выбрали: ${slide.querySelector('.selection__slider-text').textContent}`
            } else {
                slide.classList.remove('active')
            }
        })
    }
})

