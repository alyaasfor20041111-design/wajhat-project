
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("admin-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    const mobileToggle = document.getElementById("admin-sidebar-toggle");
    const mobileClose = document.getElementById("sidebar-close-mobile");
    const collapseBtn = document.getElementById("sidebar-collapse-btn");
    const collapseIcon = document.getElementById("collapse-icon");
    const sidebarTexts = document.querySelectorAll(".sidebar-text");

    // دالة فتح وإغلاق القائمة في الموبايل
    function toggleMobileMenu() {
        if (!sidebar) return;
        // التحقق مما إذا كانت القائمة مخفية (تمتلك translate-x-full)
        const isClosed = sidebar.classList.contains("translate-x-full");

        if (isClosed) {
            // فتح القائمة
            sidebar.classList.remove("translate-x-full");
            if (backdrop) backdrop.classList.remove("hidden");
        } else {
            // إغلاق القائمة
            sidebar.classList.add("translate-x-full");
            if (backdrop) backdrop.classList.add("hidden");
        }
    }

    // ربط الأحداث بأزرار الموبايل
    if (mobileToggle) {
        mobileToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener("click", toggleMobileMenu);
    }

    if (backdrop) {
        backdrop.addEventListener("click", toggleMobileMenu);
    }

    // دالة تصغير/تكبير القائمة للشاشات الكبيرة (Desktop)
    if (collapseBtn) {
        collapseBtn.addEventListener("click", function () {
            const isCollapsed = sidebar.getAttribute("data-collapsed") === "true";

            if (isCollapsed) {
                sidebar.classList.remove("w-20");
                sidebar.classList.add("w-64");
                sidebar.setAttribute("data-collapsed", "false");
                if (collapseIcon) collapseIcon.style.transform = "rotate(0deg)";
                sidebarTexts.forEach(el => el.classList.remove("hidden"));
            } else {
                sidebar.classList.remove("w-64");
                sidebar.classList.add("w-20");
                sidebar.setAttribute("data-collapsed", "true");
                if (collapseIcon) collapseIcon.style.transform = "rotate(180deg)";
                sidebarTexts.forEach(el => el.classList.add("hidden"));
            }
        });
    }
});

