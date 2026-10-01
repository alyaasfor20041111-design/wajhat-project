// تحديد الاتجاه بناءً على عرض الشاشة
const isMobile = window.innerWidth <= 768;

// animation start

ScrollReveal().reveal('.left-origin', {
    delay: '200',
    duration: '600',
    distance: '50px',
    origin: isMobile ? 'bottom' : 'left',
    easing: 'ease-in-out'
});


ScrollReveal().reveal('.right-origin', {
    delay: '200',
    duration: '600',
    distance: '50px',
    origin: isMobile ? 'bottom' : 'right',
    easing: 'ease-in-out'
});

ScrollReveal().reveal('.bottom-origin', {
    delay: '200',
    duration: '600',
    distance: '50px',
    origin: 'bottom',
    easing: 'ease-in-out'
});

ScrollReveal().reveal('.top-origin', {
    delay: '200',
    duration: '600',
    distance: '50px',
    origin: 'top',
    easing: 'ease-in-out'
});
// animation end

