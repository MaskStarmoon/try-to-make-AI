let posisiWarior = 50;
let coin = 0;
let health = 100;

function updateCoin() {
  document.getElementById("coin").innerText = coin;
}

function updateHealth() {
  const healthElement = document.getElementById("health");
  healthElement.style.width = health + "%";
  healthElement.classList.add("decreaseHealth");
  setTimeout(() => {
    healthElement.classList.remove("decreaseHealth");
  }, 1000);

  if (health <= 0) {
    setTimeout(() => {
      alert("Warrior kalah! Game over!");
      resetGame();
    }, 10); // Delay singkat untuk menghindari multiple alerts
  }
}

function resetGame() {
  health = 100;
  coin = 0;
  posisiWarior = 50;
  updateHealth();
  updateCoin();
  const warior = document.getElementById("warior");
  warior.style.marginLeft = posisiWarior + 'px';
  const enemy = document.getElementById("enemy");
  enemy.style.display = "block";
  enemy.style.right = "0";
  enemy.classList.remove("die");
  enemy.classList.add("walk");
}

function kiri() {
  posisiWarior -= 20;
  if (posisiWarior < 0) {
    posisiWarior = 0;
  }
  moveWarior();
}

function kanan() {
  posisiWarior += 20;
  if (posisiWarior > 600) {
    posisiWarior = 600;
  }
  moveWarior();
}

function moveWarior() {
  const warrior = document.getElementById('warior');
  warrior.style.marginLeft = posisiWarior + 'px';

  // Aktifkan animasi lari
  warrior.classList.add('run');

  // Hentikan animasi setelah 0.48 detik
  setTimeout(() => {
    warrior.classList.remove('run');
  }, 480);
}

function attack() {
  let warior = document.getElementById("warior");
  let enemy = document.getElementById("enemy");
  let wariorRect = warior.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();

  warior.classList.add("attack");

  if (wariorRect.right > enemyRect.left && wariorRect.left < enemyRect.right) {
    enemy.classList.add("die");
    setTimeout(() => {
      enemy.style.display = "none";
      coin += 10;
      updateCoin();
    }, 1000); // Delay untuk mengizinkan animasi "die" berjalan
  }

  setTimeout(() => warior.classList.remove("attack"), 700);
}

function respawnEnemy() {
  let enemy = document.getElementById("enemy");
  enemy.style.display = "block";
  enemy.style.right = "0";
  enemy.classList.remove("die");
  enemy.classList.add("walk");
}

setInterval(respawnEnemy, 5000); // Menghidupkan musuh kembali setiap 5 detik

var enemy = document.getElementById("enemy");
var enemyPosition = 700;
var enemySpeed = 5;
var hasCollided = false;

function moveEnemy() {
  enemyPosition -= enemySpeed;
  enemy.style.left = enemyPosition + "px";

  let warior = document.getElementById("warior");
  let wariorRect = warior.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();

  // Hanya kurangi health jika enemy tidak dalam status "die"
  if (!enemy.classList.contains("die") && !hasCollided && Math.abs(wariorRect.left - enemyRect.left) < 5) {
    health -= 25;
    hasCollided = true;
    updateHealth();
    setTimeout(() => {
      hasCollided = false;
    }, 1000); // Cegah pengurangan health berulang dalam waktu singkat
  }

  if (enemyPosition < -200) {
    enemyPosition = 700; // Reset posisi musuh ke kanan layar
  }
  requestAnimationFrame(moveEnemy);
}

// Panggil fungsi untuk memulai pergerakan musuh
moveEnemy();

document.addEventListener("DOMContentLoaded", function() {
  updateCoin();
  updateHealth();
});
