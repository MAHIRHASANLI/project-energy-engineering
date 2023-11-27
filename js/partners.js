$('.partnersSection').owlCarousel({
    nav: false, // Show next and prev buttons 
    smartSpeed: 10000,
    margin: 10,
    dotsSpeed: 2000,
    dragEndSpeed: 1000,
    singleItem: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    pagination: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    loop: true,

    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        }
    }
});
