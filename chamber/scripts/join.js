/*--------------------------------------*/
/* IMPORT SHARED FEATURES */
import { initializeCommon } from "./common.js";

initializeCommon();
/*--------------------------------------*/
/* TIMESTAMP */
const timestampInfo = document.querySelector("#timestamp");

if (timestampInfo) {
    timestampInfo.value = new Date().toLocaleString();
}
/*--------------------------------------*/
/* OPEN MODALS */
const membershipLinks = document.querySelectorAll(".membership-card a");

membershipLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.getAttribute("href");
        const membershipModal = document.querySelector(modalId);

        if (membershipModal) {
            membershipModal.showModal();
        }
    });
});
/*--------------------------------------*/
/* CLOSE MODALS */
const membershipModals = document.querySelectorAll(".membership-modal");

membershipModals.forEach((modal) => {
    const closeButton = modal.querySelector(".modal-close");

    closeButton.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});
/*--------------------------------------*/