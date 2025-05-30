document.addEventListener('DOMContentLoaded', function () {
    initPopupVideo();
    initFormErrorFocus();
    initCountrySelectWithPlaceholderClass();
    initMobileMenu();
    initAddClassHeader();
    initCarousel();
    initCustomSelect();
    initFormValidaton();
    initLabelStickToTop();
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

// 6. Testimonials Carousel 
function initCarousel() {
    const wrapper = document.querySelector(".carousel-wrapper");
    if (!wrapper) return;

    const items = document.querySelectorAll(".item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dots = document.querySelectorAll(".carousel-dots .dot");

    let currentIndex = 0;
    const totalItems = items.length;

    const track = document.createElement("div");
    track.classList.add("carousel-track");
    wrapper.appendChild(track);

    items.forEach(item => track.appendChild(item));

    track.style.display = "flex";
    track.style.transition = "transform 1s ease-out";
    items.forEach(item => {
        item.style.minWidth = "100%";
        item.style.boxSizing = "border-box";
    });

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = parseInt(dot.dataset.index);
            updateCarousel();
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);

    updateCarousel();
}

// 7. Custom Select 
function initCustomSelect() {
    const select = document.querySelector(".custom-select");
    const selected = select.querySelector(".select-selected");
    const items = select.querySelector(".select-items");
    const input = select.querySelector("input");

    selected.addEventListener("click", () => {
        items.classList.toggle("select-hide");
        selected.classList.toggle("select-arrow-active");
    });

    items.querySelectorAll("div").forEach(option => {
        option.addEventListener("click", () => {
            selected.textContent = option.textContent;
            selected.style.color = "white";
            input.value = option.dataset.value;
            items.classList.add("select-hide");
            selected.classList.remove("select-arrow-active");
        });
    });

    document.addEventListener("click", function (e) {
        if (!select.contains(e.target)) {
            items.classList.add("select-hide");
            selected.classList.remove("select-arrow-active");
        }
    });
}

// 8. Form Validation 
function initFormValidaton() {
    const fields = document.querySelectorAll('.field');
    fields.forEach(field => {
        const input = field.querySelector('input');
        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                field.classList.remove('error-field');
            }
        });
    });
    document.querySelector('.submit-btn').addEventListener('click', function (e) {
        e.preventDefault();
        let allFilled = true;

        fields.forEach(field => {
            const input = field.querySelector('input');
            if (!input.value.trim()) {
                field.classList.add('error-field');
                allFilled = false;
            }
        });

        if (allFilled) {
            window.location.href = 'thank-you.html';
        }
    });
}

// 9. Make label stick on top after filling the field 
function initLabelStickToTop() {
    document.querySelectorAll('.field input').forEach(input => {
        const field = input.closest('.field');

        const updateClass = () => {
            if (input.value.trim() !== '') {
                field.classList.add('has-text');
            } else {
                field.classList.remove('has-text');
            }
        };

        updateClass();

        input.addEventListener('input', updateClass);
    });

}