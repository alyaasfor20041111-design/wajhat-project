
    document.addEventListener("DOMContentLoaded", function () {
        const testimonials = [
            {
                text: "المنصة جعلت رحلتي سهلة وممتعة للغاية، السيارة كانت نظيفة تماماً، العملية سلسة، وخدمة العملاء كانت استثنائية بكل ما تحمله الكلمة من معنى.",
                name: "سارة جونسون",
                role: "عميلة دائمة",
                avatar: "./dist/assets/images/featuress/feature1.jpg",
                carImg: "./dist/assets/images/featuress/feature1.jpg"
            },
            {
                text: "تجربة استئجار السيارة عبر المنصة كانت الأفضل على الإطلاق، إجراءات التسليم والاستلام كانت في أسرع وقت وبدون أي تعقيد.",
                name: "محمد الأحمد",
                role: "رجل أعمال",
                avatar: "./dist/assets/images/featuress/feature2.jpg",
                carImg: "./dist/assets/images/featuress/feature2.jpg"
            },
            {
                text: "أسعار تنافسية للغاية وسيارات حديثة وممتازة، أنصح الجميع بالتعامل معهم لضمان رحلة مريحة وآمنة.",
                name: "خالد العمري",
                role: "محب للسفر",
                avatar: "./dist/assets/images/featuress/feature3.jpg",
                carImg: "./dist/assets/images/featuress/feature3.jpg"
            },
            {
                text: "خدمة العملاء متواجدة على مدار الساعة للرد على أي استفسار، وتسهيل كل خطوات الحجز والدفع بكل أمان.",
                name: "ريم الشمري",
                role: "مصممة حرة",
                avatar: "./dist/assets/images/featuress/feature4.jpg",
                carImg: "./dist/assets/images/featuress/feature4.jpg"
            }
        ];

        let currentIndex = 0;
        const textEl = document.getElementById("testimonial-text");
        const nameEl = document.getElementById("testimonial-name");
        const roleEl = document.getElementById("testimonial-role");
        const avatarEl = document.getElementById("testimonial-img");
        const carImgEl = document.getElementById("testimonial-car-img");
        const dotsContainer = document.getElementById("testimonial-dots");
        
        if (!textEl || !dotsContainer) return;

        const dots = dotsContainer.querySelectorAll("span");

        function updateTestimonial(index) {
            textEl.style.opacity = 0;
            nameEl.style.opacity = 0;
            avatarEl.style.opacity = 0;
            carImgEl.style.opacity = 0;

            setTimeout(() => {
                textEl.textContent = `"${testimonials[index].text}"`;
                nameEl.textContent = testimonials[index].name;
                roleEl.textContent = testimonials[index].role;
                avatarEl.src = testimonials[index].avatar;
                carImgEl.src = testimonials[index].carImg;

                textEl.style.opacity = 1;
                nameEl.style.opacity = 1;
                avatarEl.style.opacity = 1;
                carImgEl.style.opacity = 1;
            }, 200);

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove("w-2", "bg-white/40");
                    dot.classList.add("w-6", "bg-white");
                } else {
                    dot.classList.remove("w-6", "bg-white");
                    dot.classList.add("w-2", "bg-white/40");
                }
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener("click", function () {
                currentIndex = parseInt(this.getAttribute("data-index"));
                updateTestimonial(currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial(currentIndex);
        }, 5000);
    });
