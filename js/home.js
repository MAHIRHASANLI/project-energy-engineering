const homeSectionSlider = document.getElementsByClassName('banner_section')

var swiper = new Swiper('.banner_section', {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});