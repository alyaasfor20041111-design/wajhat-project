let map;
let marker;
let selectedLatLng = null;
let activeModalId = null; // متغير يحفظ رقم المودال النشط حالياً (1 أو 2 أو غيره)

// قمنا بإضافة بارامتر (modalNum) لمعرفة أي زر قام بفتح الخريطة
function initMap(modalNum) {
    activeModalId = modalNum; // تثبيت رقم المودال النشط

    // استهداف المودال بناءً على رقمه تلقائياً
    const modal = document.getElementById('location-modal-' + modalNum);
    if (modal) {
        modal.classList.remove('hidden');
        modal.removeAttribute('aria-hidden');
    }

    if (typeof L === 'undefined') {
        return;
    }

    // إذا كانت الخريطة مبنية مسبقاً، لا نبنيها مجدداً بل ننقلها للحاوية (div) الجديدة
    if (map) {
        // سحر الخرائط: نقل حاوية الخريطة برمجياً إلى المودال الحالي الذي تم فتحه
        const mapContainer = document.getElementById('map-container');
        document.getElementById('map-parent-' + modalNum).appendChild(mapContainer);
        
        // مسح الدبوس القديم إذا قام بالفتح دون اختيار لتجنب التضارب
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
        selectedLatLng = null;

        setTimeout(() => { map.invalidateSize(); }, 300);
        return;
    }

    // بناء حاوية الخريطة لأول مرة داخل العنصر المشترك والتركيز على دمشق
    map = L.map('map-container').setView([33.5074, 36.3240], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    setTimeout(() => { map.invalidateSize(); }, 300);

    // حدث النقر الحصري والمشترك
    map.on('click', function(e) {
        selectedLatLng = e.latlng;
        
        var customTailwindIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='flex flex-col items-center justify-center'>" +
                    "<div class='w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-lg border border-white relative'>" +
                      "<div class='w-2 h-2 bg-white rounded-full'></div>" +
                      "<div class='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-600'></div>" +
                    "</div>" +
                  "</div>",
            iconSize: [30,42],
            iconAnchor: [14, 34]
        });

        if (marker) {
            marker.setLatLng(selectedLatLng);
            marker.setIcon(customTailwindIcon);
        } else {
            marker = L.marker(selectedLatLng, { icon: customTailwindIcon }).addTo(map);
        }

        // استهداف حقل الإدخال النصي للمودال النشط حالياً
        const inputField = document.getElementById('manual-address-input-' + activeModalId);
        if (inputField) {
            inputField.value = "⏳ جاري قراءة اسم الحي من القمر الصناعي...";
        }
        
        document.getElementById('coords-preview-' + activeModalId).innerText = `📍 الإحداثيات: ${selectedLatLng.lat.toFixed(4)}, ${selectedLatLng.lng.toFixed(4)}`;
        
        executeSecureArabicGeocode(selectedLatLng.lat, selectedLatLng.lng);
    });
}

function executeSecureArabicGeocode(latitude, longitude) {
    var scheme = "https://";
    var host = "nominatim.openstreetmap.org";
    var path = "/reverse";
    var args = "?format=jsonv2&lat=" + latitude + "&lon=" + longitude + "&accept-language=ar";

    var absoluteUrl = scheme + host + path + args;

    fetch(absoluteUrl, {
        headers: {
            'Accept-Language': 'ar',
            'User-Agent': 'CarRentalAgentSystem/5.0'
        }
    })
    .then(function (res) {
        if (!res.ok) throw new Error('تعذر الاتصال');
        return res.json();
    })
    .then(function (result) {
        if (result && result.address) {
            var a = result.address;

            var areaName = a.suburb || a.neighbourhood || a.quarter || a.residential || a.city_district || a.amenity || a.road || "";
            var cityName = a.city || a.town || a.village || a.state || "";

            var finalArabicText = "";
            if (areaName) {
                finalArabicText = areaName;
            } else if (cityName) {
                finalArabicText = "موقع محدد، " + cityName;
            } else {
                finalArabicText = "موقع محدد على الخريطة";
            }

            if (areaName && cityName && !areaName.includes(cityName)) {
                finalArabicText = areaName + "، " + cityName;
            }

            // حقن القيمة في الحقل التابع للمودال المفتوح حالياً
            var inputField = document.getElementById('manual-address-input-' + activeModalId);
            if (inputField) {
                inputField.value = finalArabicText;
            }
        }
    })
    .catch(function (err) {
        console.warn("تم التحول للموقع الاحتياطي:", err.message);
        var inputField = document.getElementById('manual-address-input-' + activeModalId);
        if (inputField) {
            inputField.value = "موقع محدد على الخريطة";
        }
    });
}

function confirmLocation() {
    if (!selectedLatLng) {
        alert("الرجاء النقر على الخريطة أولاً لتحديد الموقع!");
        return;
    }

    const finalAddress = document.getElementById('manual-address-input-' + activeModalId).value.trim();
    
    // تحديد عنصر العرض في الصفحة الرئيسية بناءً على المودال النشط
    // المودال 1 يغذي receipt-selected-location والـ 2 يغذي return-selected-location
    const targetDivId = (activeModalId === 1) ? 'receipt-selected-location' : 'return-selected-location';
    const targetDiv = document.getElementById(targetDivId);

    if (targetDiv) {
        targetDiv.innerText = finalAddress || "تم تحديد الموقع من الخريطة";
        targetDiv.classList.remove('text-gray-400');
        targetDiv.classList.add('text-heading', 'font-semibold');
        targetDiv.focus();
    } else {
        document.activeElement.blur();
    }

    closeModal();
}

function closeModal() {
    const modal = document.getElementById('location-modal-' + activeModalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }

    const officialCloseBtn = document.querySelector('[data-modal-hide="location-modal-' + activeModalId + '"]') ||
        document.querySelector('#location-modal-' + activeModalId + ' [data-modal-toggle="location-modal-' + activeModalId + '"]');
    if (officialCloseBtn) {
        officialCloseBtn.click();
    }

    const allBackdrops = document.querySelectorAll('div[fixed], .modal-backdrop, [id*="backdrop"], [class*="backdrop"], [bg-opacity]');
    allBackdrops.forEach(function (backdrop) {
        if (backdrop.id !== 'location-modal-' + activeModalId) {
            backdrop.remove();
        }
    });

    document.body.style.overflow = 'auto';
    document.body.style.pointerEvents = 'auto';
    document.body.classList.remove('overflow-hidden');
}
