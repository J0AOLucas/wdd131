document.addEventListener('DOMContentLoaded', () => {
  var levelText = document.getElementById("level");
  var healthText = document.getElementById("health");
  let level = parseInt(levelText.textContent);
  let health = parseInt(healthText.textContent);
  let attackButton = document.getElementById("attack");
  let levelUpButton = document.getElementById("levelUp");
  
  function Attack() {
    health -= 20;
    healthText.textContent = health;

    if(health <= 0)
    {
      setTimeout(() => {
        alert("Character Died!");
      }, 2);
    }
  }

  function LevelUp() {
    level += 1;
    levelText.textContent = level;
  }

  attackButton.addEventListener('click', Attack);
  levelUpButton.addEventListener('click', LevelUp);
})