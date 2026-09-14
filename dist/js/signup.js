
// Code Page signup.html

document.addEventListener("DOMContentLoaded", function () {

    // Get elements
    const form = document.getElementById("loginForm");

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const errorMsg = document.getElementById("errorMsg");


    // Show password
    window.togglePassword = function () {

        if (password.type === "password") {

            password.type = "text";

            document.getElementById("eyeIcon").classList.remove("fa-eye-slash");
            document.getElementById("eyeIcon").classList.add("fa-eye");

        } else {

            password.type = "password";

            document.getElementById("eyeIcon").classList.remove("fa-eye");
            document.getElementById("eyeIcon").classList.add("fa-eye-slash");
        }
    };


    // Show confirm password
    window.toggleConfirmPassword = function () {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            document.getElementById("eyeIconConfirm").classList.remove("fa-eye-slash");
            document.getElementById("eyeIconConfirm").classList.add("fa-eye");

        } else {

            confirmPassword.type = "password";

            document.getElementById("eyeIconConfirm").classList.remove("fa-eye");
            document.getElementById("eyeIconConfirm").classList.add("fa-eye-slash");
        }
    };


    // Hide error when typing
    firstName.addEventListener("input", function () {
        errorMsg.classList.add("hidden");
    });

    lastName.addEventListener("input", function () {
        errorMsg.classList.add("hidden");
    });

    phone.addEventListener("input", function () {
        errorMsg.classList.add("hidden");
    });

    email.addEventListener("input", function () {
        errorMsg.classList.add("hidden");
    });

    password.addEventListener("input", function () {
        errorMsg.classList.add("hidden");
    });

    confirmPassword.addEventListener("input", function () {
        errorMsg.classList.add("hidden");
    });


    // Check form
    form.addEventListener("submit", function (e) {

        e.preventDefault();


        // Check empty fields
        if (
            firstName.value.trim() === "" ||
            lastName.value.trim() === "" ||
            phone.value.trim() === "" ||
            email.value.trim() === "" ||
            password.value === "" ||
            confirmPassword.value === ""
        ) {

            errorMsg.textContent = "يجب إدخال جميع الحقول المطلوبة";

            errorMsg.classList.remove("hidden");

            return;
        }


        // Check password length
        if (password.value.length < 8) {

            errorMsg.textContent =
                "يجب أن تكون كلمة المرور 8 محارف على الأقل";

            errorMsg.classList.remove("hidden");

            return;
        }


        // Check password match
        if (password.value !== confirmPassword.value) {

            errorMsg.textContent =
                "كلمة المرور غير متطابقة";

            errorMsg.classList.remove("hidden");

            return;
        }


        // Hide error
        errorMsg.classList.add("hidden");


        // Go to location page
        window.location.href = "signup-location.html";

    });

});






// --------------------------------------- //





//Code  Page Confirm-Account.html

document.addEventListener("DOMContentLoaded", function () {

    // Get elements
    const form = document.getElementById("confirmForm");
    const inputs = document.querySelectorAll(".code-input");

    const errorMsg = document.getElementById("errorMsg");
    const successMessage = document.getElementById("successMessage");
    const successCard = document.getElementById("successCard");
    const successCircle = document.getElementById("successCircle");
    const successInner = document.getElementById("successInner");
    const successGlow = document.getElementById("successGlow");
    const checkMark = document.getElementById("checkMark");
    const checkPath = document.getElementById("checkPath");
    const resendCode = document.getElementById("resendCode");


    // Move to next input
    inputs.forEach(function (input, index) {

        input.addEventListener("input", function () {

            errorMsg.classList.add("hidden");

            input.value = input.value.replace(/\D/g, "");

            if (input.value !== "" && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }

        });


        // Go back with backspace
        input.addEventListener("keydown", function (e) {

            if (e.key === "Backspace" && input.value === "" && index > 0) {
                inputs[index - 1].focus();
            }

        });

    });


    // Paste code
    inputs[0].addEventListener("paste", function (e) {

        e.preventDefault();

        const pastedCode = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, inputs.length);

        pastedCode.split("").forEach(function (number, index) {
            inputs[index].value = number;
        });

        if (pastedCode.length > 0) {
            inputs[Math.min(pastedCode.length, inputs.length) - 1].focus();
        }

    });


    // Check form
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let code = "";

        inputs.forEach(function (input) {
            code += input.value;
        });


        // Check empty fields
        if (code.length !== inputs.length) {

            errorMsg.textContent = "يجب إدخال رمز التحقق كاملاً";

            errorMsg.classList.remove("hidden");

            return;
        }


        // Show success message
        successMessage.classList.remove("hidden");


        // Initial success card animation
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


        // Initial circle animation
        successCircle.style.transform = "scale(0.5)";
        successInner.style.transform = "scale(0)";
        successGlow.style.transform = "scale(0.5)";


        // Hide check before animation
        checkPath.style.strokeDashoffset = "100";


        // Circle appears
        setTimeout(() => {

            successCircle.style.transition =
                "transform 0.55s cubic-bezier(.16,1,.3,1)";

            successCircle.style.transform =
                "scale(1)";

        }, 180);


        // Green inner circle appears
        setTimeout(() => {

            successInner.style.transition =
                "transform 0.55s cubic-bezier(.16,1,.3,1.3)";

            successInner.style.transform =
                "scale(1)";

        }, 500);


        // Draw check mark
        setTimeout(() => {

            checkPath.style.transition =
                "stroke-dashoffset 0.65s ease";

            checkPath.style.strokeDashoffset = "0";

        }, 700);


        // Glow animation
        setTimeout(() => {

            successGlow.style.transition =
                "transform 0.8s ease, opacity 0.8s ease";

            successGlow.style.transform =
                "scale(1.45)";

            successGlow.style.opacity = "0";

        }, 350);


        // Go to home page
        setTimeout(function () {

            window.location.href = "../../index.html";

        }, 2000);

    });


    // Resend code
    resendCode.addEventListener("click", function () {

        errorMsg.classList.add("hidden");

        inputs.forEach(function (input) {
            input.value = "";
        });

        inputs[0].focus();

    });

});