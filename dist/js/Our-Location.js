// Branch Swiper //

document.addEventListener("DOMContentLoaded", function () {


    const branchesSwiper = new Swiper(
        ".branches-swiper",
        {

            direction: "horizontal",

            slidesPerView: 1,

            spaceBetween: 28,

            centeredSlides: true,

            loop: true,

            speed: 650,

            grabCursor: true,

            watchSlidesProgress: true,


            navigation: {

                nextEl: ".branch-next",

                prevEl: ".branch-prev"

            },


            pagination: {

                el: ".branches-pagination",

                clickable: true

            },


            breakpoints: {

                768: {

                    slidesPerView: 3,

                    spaceBetween: 60

                },

                1024: {

                    slidesPerView: 3,

                    spaceBetween: 80

                },

                1280: {

                    slidesPerView: 3,

                    spaceBetween: 36
                }

            }

        }

    );



});



//  Map //

function showBranchMap(branchName, branchAddress) {




    document.getElementById(
        "map-branch-name"
    ).textContent = branchName;


    /* تحديث العنوان */

    document.getElementById(
        "map-branch-address"
    ).textContent = branchAddress;


    /* تحويل العنوان إلى رابط Google Maps */

    const mapUrl =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(branchAddress) +
        "&output=embed";


    /* تغيير الخريطة */

    document.getElementById(
        "branch-map"
    ).src = mapUrl;


    /* النزول للخريطة */

    document.getElementById(
        "map-section"
    ).scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}



//    Filter Cars //

function filterCars(branch) {



    const buttons =
        document.querySelectorAll(".filter-btn");




    buttons.forEach(function (btn) {

        btn.classList.remove(
            "active"
        );

    });


    const activeButton =
        document.getElementById(
            "btn-" + branch
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }




    const cards =
        document.querySelectorAll(".car-card");


    cards.forEach(function (card) {


        const cardBranch =
            card.getAttribute(
                "data-branch"
            );




        if (branch === "all") {

            card.style.display =
                "block";

        }



        else if (
            cardBranch === branch
        ) {

            card.style.display =
                "block";

        }



        else {

            card.style.display =
                "none";

        }

    });

}



// ---------------------------------------- //




