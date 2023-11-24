$('.partnersSection').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        },
        1400: {
            items: 5
        }
    }
})

$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [500000000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})