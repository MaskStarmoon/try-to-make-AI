document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
      jump();
  }
});

function jump() {
  let dino = document.getElementById("dino");
  if (!dino.classList.contains("jump")) {
      dino.classList.add("jump");

      setTimeout(function() {
          dino.classList.remove("jump");
      }, 300);
  }
}

let checkCollision = setInterval(function() {
  let dino = document.getElementById("dino");
  let box = document.getElementById("box");

  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let boxLeft = parseInt(window.getComputedStyle(box).getPropertyValue("left"));

  if (boxLeft < 100 && boxLeft > 50 && dinoTop >= 150) {
      alert("Game Over!");
      document.location.reload();
  }
}, 10);
