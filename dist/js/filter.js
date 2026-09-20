// Cars Filter logic Start

// --- 1. عناصر الشاشة الكبيرة (Desktop) ---
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const brandFilter = document.getElementById('brandFilter');
const yearFilter = document.getElementById('yearFilter');
const fuelFilter = document.getElementById('fuelFilter');
const transmissionFilter = document.getElementById('transmissionFilter');
const seatsFilter = document.getElementById('seatsFilter');

// --- 2. عناصر شاشة الموبايل (داخل الـ Drawer) ---
// تأكد أن هذه الـ IDs تطابق تماماً عناصر الإدخال (Inputs) داخل الـ Drawer لديك
const mobilePriceRange = document.getElementById('mobilePriceRange');
const mobilePriceValue = document.getElementById('mobilePriceValue'); // إن وجد لعرض رقم السعر
const mobileBrandFilter = document.getElementById('mobileBrandFilter');
const mobileYearFilter = document.getElementById('mobileYearFilter');
const mobileFuelFilter = document.getElementById('mobileFuelFilter');
const mobileTransmissionFilter = document.getElementById('mobileTransmissionFilter');
const mobileSeatsFilter = document.getElementById('mobileSeatsFilter');

// زر التطبيق وزر الإغلاق للـ Drawer
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const manualCloseBtn = document.getElementById('manualCloseBtn'); // زر X أو زر إغلاق الـ Drawer لإغلاقه برمجياً

const carCards = document.querySelectorAll('.car-card');
const noResults = document.getElementById('noResults');
const categoryTitleDiv = document.getElementById('category-title-div');


let currentCategory = 'all';

// دالة فحص ما إذا كان المستخدم يتصفح من الموبايل (الـ Drawer ظاهر)
function isMobileView() {
    // نعتمد على الفحص برؤية زر الفتح أو الـ Drawer نفسه (مثال: إذا كان شاشة الموبايل أقل من 768px)
    return window.innerWidth < 768;
}

function filterCarsExecutive() {
    // تحديد مصدر القيم بناءً على الشاشة الحالية (موبايل أم كمبيوتر)
    const isMobile = isMobileView();

    const maxPrice = Number(isMobile && mobilePriceRange ? mobilePriceRange.value : priceRange.value);
    const selectedBrand = isMobile && mobileBrandFilter ? mobileBrandFilter.value : brandFilter.value;
    const selectedYear = isMobile && mobileYearFilter ? mobileYearFilter.value : yearFilter.value;
    const selectedFuel = isMobile && mobileFuelFilter ? mobileFuelFilter.value : fuelFilter.value;
    const selectedTransmission = isMobile && mobileTransmissionFilter ? mobileTransmissionFilter.value : transmissionFilter.value;
    const selectedSeats = isMobile && mobileSeatsFilter ? mobileSeatsFilter.value : seatsFilter.value;

    // تحديث نص السعر المعروض
    if (isMobile && mobilePriceValue) {
        mobilePriceValue.textContent = maxPrice;
    } else if (priceValue) {
        priceValue.textContent = maxPrice;
    }

    let visibleCount = 0;

    carCards.forEach(card => {
        const carCategory = card.getAttribute('data-category');
        const carPrice = Number(card.getAttribute('data-price'));
        const carBrand = card.getAttribute('data-brand');
        const carYear = card.getAttribute('data-year');
        const carFuel = card.getAttribute('data-fuel');
        const carTransmission = card.getAttribute('data-transmission');
        const carSeats = card.getAttribute('data-seats');

        const matchesCategory = (currentCategory === 'all' || carCategory === currentCategory);
        const matchesPrice = (carPrice <= maxPrice);
        const matchesBrand = (selectedBrand === 'all' || carBrand === selectedBrand);
        const matchesYear = (selectedYear === 'all' || carYear === selectedYear);
        const matchesFuel = (selectedFuel === 'all' || carFuel === selectedFuel);
        const matchesTransmission = (selectedTransmission === 'all' || carTransmission === selectedTransmission);
        const matchesSeats = (selectedSeats === 'all' || carSeats === selectedSeats);

        if (matchesCategory && matchesPrice && matchesBrand && matchesYear && matchesFuel && matchesTransmission && matchesSeats) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (visibleCount === 0) {
        if (noResults) noResults.classList.remove('hidden');
        if (categoryTitleDiv) {
            categoryTitleDiv.classList.remove('flex');
            categoryTitleDiv.classList.add('hidden');
        } 
            
    } else {
        if (noResults) noResults.classList.add('hidden');
        if (categoryTitleDiv) {
            categoryTitleDiv.classList.remove('hidden');
             categoryTitleDiv.classList.add('flex');
        }
    }

    // document.getElementById('visibleCount').innerText = visibleCount;
}

function filterCars(category) {
    currentCategory = category;

    updateCategoryButtonsStyle();
    showCategoryTitle(category);

    filterCarsExecutive();
}

// --- أحداث الشاشة الكبيرة (تحديث لحظي كالعادة) ---
if (priceRange) priceRange.addEventListener('input', filterCarsExecutive);
if (brandFilter) brandFilter.addEventListener('change', filterCarsExecutive);
if (yearFilter) yearFilter.addEventListener('change', filterCarsExecutive);
if (fuelFilter) fuelFilter.addEventListener('change', filterCarsExecutive);
if (transmissionFilter) transmissionFilter.addEventListener('change', filterCarsExecutive);
if (seatsFilter) seatsFilter.addEventListener('change', filterCarsExecutive);

// --- أحداث شاشة الموبايل (الـ Drawer) ---
// إذا قام بتعديل شريط السعر في الموبايل، نحدث الرقم فقط بدون فلترة فورية لتجنب البطء
if (mobilePriceRange && mobilePriceValue) {
    mobilePriceRange.addEventListener('input', () => {
        mobilePriceValue.textContent = mobilePriceRange.value;
    });
}

// تشغيل الفلترة وإغلاق الـ Drawer عند الضغط على الزر فقط
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        // 1. تشغيل الفلترة بناءً على قيم الـ Drawer
        filterCarsExecutive();

        // 2. إغلاق الـ Drawer يدوياً برمجياً عبر محاكاة الضغط على زر الإغلاق (X) الخاص بـ Flowbite/Tailwind
        if (manualCloseBtn) {
            manualCloseBtn.click();
        }
    });
}

function updateCategoryButtonsStyle() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
    });
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.remove('bg-white', 'text-gray-700');
        window.event.currentTarget.classList.add('bg-primary', 'text-white');
    }
}

// function to show titles in arabic
function showCategoryTitle(category) {
    const categoryTitle = document.getElementById('category-title');
    if (!categoryTitle) return;

    const arabicTitles = {
        'all': 'الكل',
        'suv': 'سيارات SUV',
        'sedan': 'سيارات Sedan',
        'crossover': 'سيارات كروس أوفر',
        'electric': 'سيارات كهربائية',
        'luxury': 'سيارات فاخرة'
    };
    categoryTitle.innerText = arabicTitles[category] || category;
}

// Cars Filter Logic End


// Cars Filter Layout Start
document.querySelectorAll('.custom-select-container').forEach(container => {
    const btn = container.querySelector('.custom-select-btn');
    const dropdown = container.querySelector('.custom-dropdown');
    const valueText = container.querySelector('.selected-value');
    const arrow = container.querySelector('.select-arrow');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const options = container.querySelectorAll('.option-item');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        document.querySelectorAll('.custom-dropdown').forEach(drop => {
            if (drop !== dropdown) drop.classList.add('hidden');
        });
        document.querySelectorAll('.select-arrow').forEach(arr => {
            if (arr !== arrow) arr.classList.remove('rotate-180');
        });

        const isOpen = !dropdown.classList.contains('hidden');
        if (isOpen) {
            dropdown.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        } else {
            dropdown.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            // 1. تحديث النص المكتوب والقيمة المخفية للفلتر الحالي
            valueText.innerText = option.innerText;
            hiddenInput.value = option.getAttribute('data-value');

            // 2. تحديث الكلاسات داخل القائمة الحالية فقط (إزالة الأحمر من القديم وإضافته للجديد)
            options.forEach(opt => {
                opt.classList.remove('bg-primary', 'text-white', 'font-medium');
                opt.classList.add('text-heading', 'hover:bg-primary-hover', 'hover:text-white');
            });

            option.classList.add('bg-primary', 'text-white', 'font-medium');
            option.classList.remove('text-heading', 'hover:bg-primary-hover', 'hover:text-white');

            // 3. إغلاق القائمة وتفعيل حدث التغيير
            dropdown.classList.add('hidden');
            arrow.classList.remove('rotate-180');
            hiddenInput.dispatchEvent(new Event('change'));
        });
    });
});

// إغلاق جميع القوائم المفتوحة تلقائياً عند الضغط في أي مكان خارجها
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-dropdown').forEach(drop => drop.classList.add('hidden'));
    document.querySelectorAll('.select-arrow').forEach(arr => arr.classList.remove('rotate-180'));
});

// Cars Filter Layout End