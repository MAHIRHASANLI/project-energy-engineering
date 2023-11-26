$('.partnersSection').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})

$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [500000000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})