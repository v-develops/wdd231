/*--------------------------------------*/
/* FOOTER TIME */
const currentYear = new Date().getFullYear();
document.querySelector("#current-year").textContent = currentYear;

document.getElementById("lastModified").textContent = document.lastModified;
/*--------------------------------------*/
/* HAMBURGUER MENU */
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
    navBar.classList.toggle('show');
});
/*--------------------------------------*/
/* LOAD BUSINESS MEMBERS */
const businessContainer = document.querySelector("#display-business");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load business members.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);
        businessContainer.innerHTML = "<p>Unable to load business members.</p>";
    }
}
/*--------------------------------------*/
/* DISPLAY BUSINESS CARDS */
function displayMembers(members) {
    businessContainer.innerHTML = "";

    members.forEach((member) => {
        const membership = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        const card = document.createElement("article");
        card.classList.add("business-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="225" height="150" loading="lazy">

            <h2 class="business-name">${member.name}</h2>

            <p class="business-description">${member.description}</p>

            <p class="business-address">${member.address}</p>

            <p class="business-phone">${member.phone}</p>

            <p class="business-website">
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    ${member.website.replace("https://", "")}
                </a>
            </p>

            <p class="business-membership">
                <strong>Membership:</strong> ${membership[member.membershipLevel]}
            </p>
        `;

        businessContainer.appendChild(card);
    });
}
/*--------------------------------------*/
/* START LOADING MEMBERS */
getMembers();
/*--------------------------------------*/
/* GRID AND LIST VIEW */
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
    businessContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    businessContainer.classList.add("list-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});
/*--------------------------------------*/