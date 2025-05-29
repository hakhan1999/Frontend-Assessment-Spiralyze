document.addEventListener('DOMContentLoaded', function () {
    initPopupVideo();
    initFormErrorFocus();
    initCountrySelectWithPlaceholderClass();
    initMobileMenu();
    initAddClassHeader();
});


// 1. Initialize popup video logic
function initPopupVideo() {
    const popup = document.querySelector('.popup-video');
    const body = document.body;
    const popupOpen = document.querySelector('.play-btn');
    const popupClose = document.querySelector('.close');
    const video = popup?.querySelector('video');

    if (popup && popupOpen && popupClose && video) {
        popupOpen.addEventListener('click', () => {
            body.classList.add('popupOpened');
            popup.classList.add('popupActive');
            video.currentTime = 0;
            video.play();
        });

        popupClose.addEventListener('click', () => {
            body.classList.remove('popupOpened');
            popup.classList.remove('popupActive');
            video.pause();
            video.currentTime = 0;
        });
    }
}

// 2. Focus on the first error input field on submit
function initFormErrorFocus() {
    const submitBtn = document.querySelector('.submit-btn button');
    submitBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        const errorInput = document.querySelector('.error-field input');
        if (errorInput) {
            errorInput.focus();
        }
    });
}

// 3. Enhanced country-select placeholder logic
function initCountrySelectWithPlaceholderClass() {
    const select = document.getElementById('country');
    if (!select) return;

    function togglePlaceholderClass() {
        const container = select.nextElementSibling;
        if (!container) return;
        if (select.value && select.value.length > 0) {
            container.classList.add('select2-has-value');
        } else {
            container.classList.remove('select2-has-value');
        }
    }

    togglePlaceholderClass();
    select.addEventListener('change', togglePlaceholderClass);
}

// 4. Open Mobile Menu on Hamburger Click 
function initMobileMenu() {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const menu = document.querySelector(".menu-container");

    const hamburgerIcon = "images/hamburger.svg";
    const closeIcon = "images/close.webp";

    toggle.addEventListener("click", () => {
        const isActive = menu.classList.contains("active");
        menu.classList.toggle("active");
        toggle.src = isActive ? hamburgerIcon : closeIcon;
    });
}

// 5. Add class on header after mobile hamburger clicked 
function initAddClassHeader() {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const header = document.querySelector('header')

    toggle.addEventListener('click', () => {
        header.classList.toggle('header-bg')
    })
}

// Select 2 and SLick Carousel 
document.addEventListener('DOMContentLoaded', () => {
    if (window.jQuery) {
        $('#country').select2({
            placeholder: "Country",
            width: 'resolve'
        });

        $('.carousel-wrapper').slick({
            dots: true,
            arrows: true,
            infinite: false,
            autoplay: true,
            speed: 1500,
            loop: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
});
