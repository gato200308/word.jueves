// Función para cargar los personajes al iniciar la página
async function loadCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    displayCharacters(data.results);
}

// Función para buscar personajes
async function searchCharacters() {
    const characterName = document.getElementById('search-field').value;
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
    const data = await response.json();
    displayCharacters(data.results);
}

// Función para mostrar los personajes en el grid
function displayCharacters(characters) {
    const characterContainer = document.getElementById('character-container');
    characterContainer.innerHTML = '';

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'col-md-4 mb-4';
        characterDiv.innerHTML = `
            <div class="character-card">
                <img src="${character.image}" alt="${character.name}">
                <h3 onclick="changeNameColor(this)">${character.name}</h3>
                <a class="details-link" onclick="showCharacterDetails('${escapeHtml(character.name)}', '${escapeHtml(character.image)}', '${escapeHtml(character.location.name)}', '${escapeHtml(character.origin.name)}')">View Details</a>
            </div>
        `;
        characterContainer.appendChild(characterDiv);
    });
}

// Función para cambiar el color del nombre del personaje a negro
function changeNameColor(element) {
    element.style.color = '#000000'; // Cambia el color a negro
}

// Función para mostrar detalles del personaje en un modal
function showCharacterDetails(name, image, location, origin) {
    document.getElementById('characterModalLabel').innerText = name;
    document.getElementById('characterImage').src = image;
    document.getElementById('characterLocation').innerText = `Location: ${location}`;
    document.getElementById('characterOrigin').innerText = `Origin: ${origin}`;
    new bootstrap.Modal(document.getElementById('characterModal')).show();
}

// Función para escapar caracteres HTML
function escapeHtml(str) {
    return str.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

// Cargar los personajes al cargar la página
window.onload = loadCharacters;
