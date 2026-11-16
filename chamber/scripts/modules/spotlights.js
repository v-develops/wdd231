/*--------------------------------------*/
const spotlightsContainer = document.querySelector("#spotlights-container");
/*--------------------------------------*/
async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load business members.");
        }

        const members = await response.json();

        const eligibleMembers = members.filter((member) => {
            return Number(member.membershipLevel) === 2 ||
                   Number(member.membershipLevel) === 3;
        });

        const spotlightCount = Math.min(
            Math.random() < 0.5 ? 2 : 3,
            eligibleMembers.length
        );

        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];
        }

        const selectedMembers = shuffledMembers.slice(0, spotlightCount);

        displaySpotlights(selectedMembers);

    } 
    
    catch (error) {
        console.error("Error loading business spotlights:", error);

        spotlightsContainer.innerHTML =
            "<p>Unable to load business spotlights.</p>";
    }
}
/*--------------------------------------*/
function displaySpotlights(members) {
    spotlightsContainer.innerHTML = "";

    const membership = {
        2: "Silver",
        3: "Gold"
    };

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="225" height="150" loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.phone}</p>
            <p>${member.address}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </p>

            <p class="spotlight-membership">
                ${membership[member.membershipLevel]} Member
            </p>
        `;

        spotlightsContainer.appendChild(card);
    });
}
/*--------------------------------------*/
export function initializeSpotlights() {
    if (!spotlightsContainer) return;

    getSpotlights();
}
/*--------------------------------------*/