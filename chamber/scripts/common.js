/*--------------------------------------*/
/* FOOTER TIME */
function initializeFooter() {
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#lastModified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}
/*--------------------------------------*/
/* HAMBURGER MENU */
function initializeNavigation() {
    const navButton = document.querySelector("#nav-button");
    const navBar = document.querySelector("#nav-bar");

    if (!navButton || !navBar) return;

    navButton.addEventListener("click", () => {
        const isOpen = navButton.classList.toggle("show");

        navButton.setAttribute("aria-expanded", isOpen);
        navBar.classList.toggle("show");
    });
}
/*--------------------------------------*/
/* SHARED FEATURES */
export function initializeCommon() {
    initializeFooter();
    initializeNavigation();
}
/*--------------------------------------*/