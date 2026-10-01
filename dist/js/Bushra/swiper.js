
// blog-swiper start
const blogSwiper = new Swiper('.blog-swiper', {
    // Optional parameters
    autoHeight: false, 
    direction: 'horizontal',
    loop: true,
    responsive: true,

    // If we need pagination
    pagination: {
        el: '.blog-swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.blog-swiper-scrollbar',
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

// blog-swiper end

// similar-cars-swiper start
const similarCarsSwiper = new Swiper('.similar-cars-swiper', {
    // Optional parameters
    autoHeight: false, 
    direction: 'horizontal',
    loop: true,
    responsive: true,

    // If we need pagination
    pagination: {
        el: '.similar-cars-swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.similar-cars-swiper-scrollbar',
    },

    breakpoints: {
        276: {
            slidesPerView: 1,
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

// similar-cars-swiper end