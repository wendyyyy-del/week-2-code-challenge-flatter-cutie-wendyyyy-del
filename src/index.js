
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");

    
    fetch("https://flater-cutie-backend-repo.vercel.app/characters")
        .then(response => response.json())
        .then(characters => {
            
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.marginRight = "18px";
                span.style.cursor = "pointer";
                span.style.color = "#007BFF"; 
                span.style.fontWeight = "bold";

                span.addEventListener("click", () => {
                    displayCharacterDetails(character);
                    highlightSelectedCharacter(span); 
                });

                characterBar.appendChild(span);
            });
        })
        .catch(error => console.error("Error fetching characters:", error));

    function displayCharacterDetails(character) {
        detailedInfo.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}" style="width: 200px; height: auto; border-radius: 10px;">
            <p>Votes: <span id="vote-count">${character.votes}</span></p>
            <button id="vote-button">Vote</button>
            <button id="reset-votes">Reset Votes</button> <!-- New feature -->
        `;

       
        document.getElementById("vote-button").addEventListener("click", () => {
            const voteCount = document.getElementById("vote-count");
            voteCount.textContent = parseInt(voteCount.textContent) + 1;
        });

        document.getElementById("reset-votes").addEventListener("click", () => {
            const voteCount = document.getElementById("vote-count");
            voteCount.textContent = 0;
        });
    }

   
    function highlightSelectedCharacter(selectedSpan) {
        
        const spans = characterBar.querySelectorAll("span");
        spans.forEach(span => {
            span.style.color = "#007BFF"; 
            span.style.fontWeight = "bold";
        });

       
        selectedSpan.style.color = "#FF5733"; 
        selectedSpan.style.fontWeight = "bolder";
    }
});