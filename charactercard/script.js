document.addEventListener('DOMContentLoaded', () => {
  var levelText = document.getElementById("level");
  var healthText = document.getElementById("health");
  let level = parseInt(levelText.textContent)
  let health = parseInt(healthText.textContent)
  let attackButton = document.getElementById("attack");
  let levelUp = document.getElementById("levelUp");
  
  function Attack() {
    healthText.textContent = health - 20
    // I can remove this one
    health -= 20
  }


  attackButton.addEventListener('click', Attack)
})