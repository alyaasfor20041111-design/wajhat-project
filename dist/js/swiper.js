
// swiper start
const swiper = new Swiper('.swiper', {
    // Optional parameters
    autoHeight: false, 
    direction: 'horizontal',
    loop: true,
    responsive: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },

    breakpoints: {
        276: {
            slidesPerView: 2,
            spaceBetween: 10
            
        },
        570: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10
        },
    },
});

// swiper end