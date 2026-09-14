//Code Page Login.html

// hidden and display password

function togglePassword() {

    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.type === "password") {

        password.type = "text";

        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    } else {

        password.type = "password";

        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");

    }

}


// Login Success Message

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const errorMsg = document.getElementById("errorMsg");

    const successMessage = document.getElementById("successMessage");
    const successCard = document.getElementById("successCard");

    const successCircle = document.getElementById("successCircle");
    const successInner = document.getElementById("successInner");
    const successGlow = document.getElementById("successGlow");

    const checkMark = document.querySelector("#checkMark path");

    const goHome = document.getElementById("goHome");
    const arrowIcon = document.getElementById("arrowIcon");


    // Check input data

    form.addEventListener("submit", function (e) {

        // منع إرسال الفورم مباشرة
        e.preventDefault();


        const email = emailInput.value.trim();
        const password = passwordInput.value;


        // إخفاء الرسالة السابقة

        errorMsg.classList.add("hidden");
        errorMsg.textContent = "";


        // التحقق من الحقول الفارغة

        if (email === "" || password === "") {

            errorMsg.textContent = "يرجى تعبئة الحقول المطلوبة";

            errorMsg.classList.remove("hidden");

            return;

        }


        // التحقق من طول كلمة المرور

        if (password.length < 8) {

            errorMsg.textContent =
                "يجب أن تكون كلمة المرور 8 محارف على الأقل";

            errorMsg.classList.remove("hidden");

            return;

        }


        // إذا كل شيء صحيح تظهر رسالة النجاح

        successMessage.classList.remove("hidden");


        // Animation Success Card

        successCard.style.opacity = "0";

        successCard.style.transform =
            "translateY(35px) scale(0.90)";


        setTimeout(() => {

            successCard.style.transition =
                "all 0.65s cubic-bezier(.16,1,.3,1)";

            successCard.style.opacity = "1";

            successCard.style.transform =
                "translateY(0) scale(1)";

        }, 50);


        // Initial animation

        successCircle.style.transform = "scale(0.5)";

        successInner.style.transform = "scale(0)";

        successGlow.style.transform = "scale(0.5)";

        checkMark.style.strokeDashoffset = "45";


        // Circle animation

        setTimeout(() => {

            successCircle.style.transition =
                "transform 0.55s cubic-bezier(.16,1,.3,1)";

            successCircle.style.transform =
                "scale(1)";

        }, 180);


        // Green circle animation

        setTimeout(() => {

            successInner.style.transition =
                "transform 0.55s cubic-bezier(.16,1,.3,1.3)";

            successInner.style.transform =
                "scale(1)";

        }, 300);


        // Check mark animation

        setTimeout(() => {

            checkMark.style.transition =
                "stroke-dashoffset 0.65s ease";

            checkMark.style.strokeDashoffset = "0";

        }, 550);


        // Glow animation

        setTimeout(() => {

            successGlow.style.transition =
                "transform 0.8s ease, opacity 0.8s ease";

            successGlow.style.transform =
                "scale(1.45)";

            successGlow.style.opacity = "0";

        }, 350);


        // Arrow animation

        setTimeout(() => {

            setInterval(() => {arrowIcon.style.transform =
                    "translateX(-6px)";

                setTimeout(() => {

                    arrowIcon.style.transform =
                        "translateX(0)";

                }, 350);

            }, 1300);

        }, 1000);

    });


    // Go to home page

    goHome.addEventListener("click", function () {

        goHome.style.transform = "scale(0.88)";

        setTimeout(() => {

            window.location.href = "../../index.html";

        }, 180);

    });

});



// ------------------------------------- //




//Code Page Forgit-Password.html


const change_passBtn = document.getElementById("change_passBtn");


change_passBtn.addEventListener("click", function () {
    change_passMenu.classList.toggle("hidden");
});




document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "Forget-Password.html";
});



 




