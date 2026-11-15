const contactForm = document.querySelector("#contactForm");
console.log(contactForm)

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector(".c").value.trim();

    const email = contactForm.querySelector(".c").value.trim();

    const message = contactForm.querySelector("#c-t").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields!");
        return;
    }

    alert("Message submitted successfully!");
    console.log(`Name : ${name}`)
    console.log(`Email : ${email}`)
    console.log(`Message : ${message}`)

    contactForm.reset();
});


const hamburger = document.querySelector(".hamburger");
const menu = document.getElementById("mobileMenu");

function openMenu() {
    hamburger.classList.add("active");
    menu.classList.add("active");

    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation menu");

    document.body.style.overflow = "hidden";
}

function closeMenu() {
    hamburger.classList.remove("active");
    menu.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");

    document.body.style.overflow = "";
}

// Toggle Menu
function toggleMenu() {
    const isOpen = menu.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}


// 1. Close menu after clicking navigation links

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// 2. Close menu when clicking outside

document.addEventListener("click", (event) => {
    if (
        menu.classList.contains("active") &&
        !menu.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {
        closeMenu();
    }
});


// 3. Close menu using Escape key

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("active")) {
        closeMenu();
        hamburger.focus();
    }
});


// 4. Close menu when screen changes to desktop

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});


// 5. Close menu when page becomes hidden

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        closeMenu();
    }
});