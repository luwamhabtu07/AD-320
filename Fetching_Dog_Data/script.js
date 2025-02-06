document.addEventListener("DOMContentLoaded", () => {
    fetchBreeds();
    fetchDogFacts();
    fetchDogGroups();
});

// Fetch and display dog breeds
function fetchBreeds() {
    fetch("https://dogapi.dog/api/v2/breeds")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(" Dog Breeds API Response:", data); // Debugging log
            displayBreeds(data.data);
        })
        .catch(error => {
            console.error(" Error fetching breeds:", error);
            document.getElementById("error-message").textContent = "Failed to load breeds.";
        });
}

//  Display list of breeds as clickable items
function displayBreeds(breeds) {
    const breedList = document.getElementById("breed-list");
    breedList.innerHTML = ""; // Clear existing content

    breeds.forEach(breed => {
        const li = document.createElement("li");
        li.textContent = breed.attributes.name;
        li.dataset.id = breed.id;

        //  Ensure clicking calls fetchBreedDetails()
        li.addEventListener("click", () => {
            console.log(`Fetching details for breed ID: ${breed.id}`); // Debug log
            fetchBreedDetails(breed.id);
        });

        breedList.appendChild(li);
    });
}

//  Fetch breed details when clicked
function fetchBreedDetails(breedId) {
    fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
        .then(response => response.json())
        .then(data => {
            console.log(" Breed Details API Response:", data); // Debugging log
            displayBreedDetails(data.data);
        })
        .catch(error => console.error(" Error fetching breed details:", error));
}

//  Display detailed breed information
function displayBreedDetails(breed) {
    const detailsDiv = document.getElementById("breed-details");

    if (!breed) {
        detailsDiv.innerHTML = `<p>No details found for this breed.</p>`;
        return;
    }

    detailsDiv.innerHTML = `
        <h3>${breed.attributes.name}</h3>
        <p><strong>Description:</strong> ${breed.attributes.description || "No description available."}</p>
        <p><strong>Life Span:</strong> ${breed.attributes.life_span || "Unknown"}</p>
    `;
}

//  Fetch and display dog facts
function fetchDogFacts() {
    fetch("https://dogapi.dog/api/v2/facts")
        .then(response => response.json())
        .then(data => {
            console.log("Dog Facts API Response:", data); // Debugging log
            const factsDiv = document.getElementById("dog-facts");
            factsDiv.innerHTML = data.data.map(fact => `<p>${fact.attributes.body}</p>`).join("");
        })
        .catch(error => console.error(" Error fetching dog facts:", error));
}

//  Fetch and display dog groups with manual descriptions
function fetchDogGroups() {
    fetch("https://dogapi.dog/api/v2/groups")
        .then(response => response.json())
        .then(data => {
            console.log(" Dog Groups API Response:", data); // Debugging log

            const groupsDiv = document.getElementById("dog-groups");
            groupsDiv.innerHTML = data.data.map(group => `
                <p><strong>${group.attributes.name}:</strong> 
                ${getManualDescription(group.attributes.name)}</p>
            `).join("");
        })
        .catch(error => console.error(" Error fetching dog groups:", error));
}

//  Manually add fallback descriptions
function getManualDescription(groupName) {
    const descriptions = {
        "Foundation Stock Service": "Breeds not yet fully recognized by the AKC.",
        "Herding Group": "Dogs bred to herd livestock, known for intelligence and trainability.",
        "Hound Group": "Dogs known for keen sense of smell and tracking abilities.",
        "Non-Sporting Group": "Diverse group of breeds with varied traits and functions.",
        "Sporting Group": "Breeds developed for hunting and retrieving game birds.",
        "Terrier Group": "Feisty, energetic breeds originally bred to hunt vermin.",
        "Toy Group": "Small companion breeds often kept as pets.",
        "Working Group": "Strong, intelligent dogs bred for tasks like guarding and rescue.",
        "Miscellaneous Class": "Breeds in development for full AKC recognition."
    };

    return descriptions[groupName] || "No description available.";
}
