document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const carCards = document.querySelectorAll(".car-card");

    if (filterButtons.length === 0 || carCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // تبديل الأنماط النشطة وغير النشطة للأزرار
            filterButtons.forEach(btn => {
                btn.classList.remove("bg-primary", "text-white", "shadow-md");
                btn.classList.add("bg-white", "dark:bg-zinc-900", "text-heading", "dark:text-white", "border", "border-card-tint", "dark:border-zinc-800", "shadow-sm");
            });

            button.classList.remove("bg-white", "dark:bg-zinc-900", "text-heading", "dark:text-white", "border", "border-card-tint", "dark:border-zinc-800", "shadow-sm");
            button.classList.add("bg-primary", "text-white", "shadow-md");

            const filterValue = button.getAttribute("data-filter");

            // إظهار أو إخفاء البطاقات حسب الفئة
            carCards.forEach(card => {
                const categories = card.getAttribute("data-category") || "";

                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.style.display = "flex";
                    card.style.opacity = "0";
                    card.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        card.style.transition = "all 0.4s ease";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});