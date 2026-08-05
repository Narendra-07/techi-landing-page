const hamburger = document.querySelector(".hamburger") as HTMLButtonElement;
const mobileMenu = document.querySelector(".mobile-menu") as HTMLElement;
const closeBtn = document.querySelector(".close-menu") as HTMLButtonElement;
const overlay = document.querySelector(".overlay") as HTMLElement;

if (hamburger && mobileMenu && closeBtn && overlay) {

    const openMenu = () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", openMenu);

    closeBtn.addEventListener("click", closeMenu);

    overlay.addEventListener("click", closeMenu);

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

}
