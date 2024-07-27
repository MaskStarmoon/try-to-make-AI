let health = 100;
let coins = 0;
let exp = 0;
let healthInterval;
let expInterval;
let selectedPlant = null;
let buyingPlant = false; // Flag untuk menandakan sedang dalam proses pembelian tanaman
let placingPlant = false; // Flag untuk menandakan sedang dalam proses penempatan tanaman

function startGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = ''; // Bersihkan area permainan
    resetSelection();
    health = 100;
    coins = 0;
    exp = 0;
    updateHealth();
    updateCoins();
    updateExp();

    if (healthInterval) clearInterval(healthInterval);
    healthInterval = setInterval(decreaseHealth, 60000);

    if (expInterval) clearInterval(expInterval);
    expInterval = setInterval(increaseExp, 1000);
}

function decreaseHealth() {
    health -= 10;
    if (health < 0) health = 0;
    updateHealth();
}

function increaseExp() {
    exp += 1;
    if (exp > 100) exp = 100;
    updateExp();
}

function updateHealth() {
    const healthElement = document.getElementById('health');
    healthElement.style.width = health + '%';
    if (health <= 0) {
        alert('Game Over! Nyawa habis.');
        clearInterval(healthInterval);
        clearInterval(expInterval);
    }
}

function updateCoins() {
    const coinCounter = document.getElementById('coinCounter');
    coinCounter.textContent = 'Coins: ' + coins;
}

function selectPlant(plantBox) {
    resetSelection();
    if (!buyingPlant && !placingPlant) {
        if (coins >= plantBox.dataset.price) {
            plantBox.classList.add('active');
            selectedPlant = plantBox;
        } else {
            alert('Koin tidak mencukupi!');
        }
    }
}

function resetSelection() {
    const plantBoxes = document.querySelectorAll('.plantBox');
    plantBoxes.forEach(box => box.classList.remove('active'));
    selectedPlant = null;
}

function placePlant(event) {
    if (selectedPlant && !buyingPlant && placingPlant) {
        const gameArea = document.getElementById('gameArea');

        // Mendapatkan posisi relatif terhadap gameArea
        const rect = gameArea.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        const plant = document.createElement('div');
        plant.className = 'plant';
        plant.style.top = offsetY - 25 + 'px';
        plant.style.left = offsetX - 25 + 'px';
        plant.style.backgroundImage = `url(${selectedPlant.querySelector('img').src})`;
        plant.style.backgroundSize = 'cover';

        gameArea.appendChild(plant);

        coins -= parseInt(selectedPlant.dataset.price);
        updateCoins();

        placingPlant = false; // Menyelesaikan proses penempatan tanaman
        resetSelection(); // Reset pilihan tanaman
    }
}

// Event listener untuk menambah koin setiap kali tab di layar
document.addEventListener('click', function() {
    if (!buyingPlant && !placingPlant) {
        coins++;
        updateCoins();
    }
});

// Event listener untuk menempatkan tanaman di gameArea
const gameArea = document.getElementById('gameArea');
gameArea.addEventListener('click', function(event) {
    if (placingPlant) {
        placePlant(event);
    }
});
