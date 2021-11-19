const headerNav = document.querySelector('.header__nav')
const headerBurger = document.querySelector('.header__burger')

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

headerBurger.addEventListener('click', () => {
    if (isTransition) {
        return
    }
    headerBurger.classList.toggle('active')
    headerNav.classList.toggle('active')
    headerNav.addEventListener('transitionstart', transitionStart)
    headerNav.addEventListener('transitionend', transitionEnd)
})