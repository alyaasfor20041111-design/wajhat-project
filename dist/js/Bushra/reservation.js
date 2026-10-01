const checkbox = document.getElementById('conditionsCheckbox');
const link = document.getElementById('confirmButton');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        // تفعيل الرابط وتغيير شكله ليصبح تفاعلياً
        link.classList.remove('pointer-events-none', 'bg-gray-400', 'cursor-not-allowed');
        link.classList.add('bg-primary', 'hover:bg-primary-hover', 'cursor-pointer');
    } else {
        // إعادة تعطيل الرابط والشكل الافتراضي
        link.classList.remove('bg-primary', 'hover:bg-primary-hover', 'cursor-pointer');
        link.classList.add('pointer-events-none', 'bg-gray-400', 'cursor-not-allowed');

    }
});


link.addEventListener("mouseenter", function () {
    if (!checkbox.checked) {
        alert("يرجى الموافقة على شروط الحجز قبل التأكيد");

    }
});