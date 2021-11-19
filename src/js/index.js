import Swiper from 'swiper'
import './header'
import 'swiper/css'
import '../css/styles.scss'


const selectionSlider = document.querySelector('.selection__slider')
const selectionBtn = document.querySelector('.selection__confirm-btn')
const selectionText = document.querySelector('.selection__confirm-text')


const swiper = new Swiper(document.querySelector('.swiper'), {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: true,
    simulateTouch: true,
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

selectionBtn.addEventListener('click', () => {
    if (!selectionBtn.disabled) {
        window.location.href = "/polls.html";
    }
})

