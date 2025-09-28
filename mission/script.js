let selectorElement = document.querySelector('select');
let logo = document.querySelector('img');
let subtitle = document.getElementById('subtitle')
let body = document.body;

selectorElement.addEventListener('change', changeTheme);

function changeTheme() {
  let current = selectorElement.value;
  body.classList.remove('dark', 'light');
  body.classList.add(current)

  if (current == 'dark') {
    logo.src = './src/images/byui-logo-white.png'
    subtitle.style.color = '#00bfff'
  } else {
    logo.src = './src/images/byui-logo-blue.webp'
  }
}