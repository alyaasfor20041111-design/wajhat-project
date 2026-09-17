document.addEventListener("DOMContentLoaded", function () {
  const profileButton = document.getElementById("profile-menu-button");
  const profileDropdown = document.getElementById("profile-dropdown");

  if (profileButton && profileDropdown) {
    profileButton.addEventListener("click", function (event) {
      event.stopPropagation();
      const isHidden = profileDropdown.classList.contains("hidden");

      if (isHidden) {
        profileDropdown.classList.remove("hidden");
        setTimeout(() => {
          profileDropdown.classList.remove("opacity-0", "scale-95");
          profileDropdown.classList.add("opacity-100", "scale-100");
        }, 10);
      } else {
        profileDropdown.classList.remove("opacity-100", "scale-100");
        profileDropdown.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
          profileDropdown.classList.add("hidden");
        }, 200);
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !profileButton.contains(event.target) &&
        !profileDropdown.contains(event.target)
      ) {
        profileDropdown.classList.remove("opacity-100", "scale-100");
        profileDropdown.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
          profileDropdown.classList.add("hidden");
        }, 200);
      }
    });
  }
});
