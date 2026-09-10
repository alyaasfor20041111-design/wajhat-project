document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // فتح القائمة
    function openSidebar() {
        if (!mobileSidebar || !sidebarOverlay) return;

        mobileSidebar.classList.remove('translate-x-full');

        sidebarOverlay.classList.remove(
            'opacity-0',
            'pointer-events-none'
        );

        sidebarOverlay.classList.add('opacity-100');

        document.body.style.overflow = 'hidden';
    }

    // إغلاق القائمة
    function closeSidebar() {
        if (!mobileSidebar || !sidebarOverlay) return;

        mobileSidebar.classList.add('translate-x-full');

        sidebarOverlay.classList.remove('opacity-100');

        sidebarOverlay.classList.add(
            'opacity-0',
            'pointer-events-none'
        );

        document.body.style.overflow = '';
    }

    // زر فتح القائمة
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openSidebar);
    }

    // زر X للإغلاق
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', closeSidebar);
    }

    // الضغط على الخلفية لإغلاق القائمة
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // إغلاق القائمة عند الضغط على رابط
    const sidebarLinks = mobileSidebar?.querySelectorAll('a');

    if (sidebarLinks) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // إغلاق القائمة عند الضغط على زر Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });
});