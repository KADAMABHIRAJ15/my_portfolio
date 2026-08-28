let  button = document.querySelector("#c-btn");
button.addEventListener("click",()=>{
    alert("Send Message Successfully...!");
})

function toggleMenu() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.getElementById("mobileMenu");

    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
}