let selectorElement = document.querySelector('select');
let logo = document.querySelector('img');
let body = document.body;

selectorElement.addEventListener('change', changeTheme);

function changeTheme() {
  let current = selectorElement.value;
  body.classList.remove('dark', 'light');
  body.classList.add(current)

  if (current == 'dark') {
    logo.src = './src/images/byui-logo-white.png'
  } else {
    logo.src = './src/images/byui-logo-blue.webp'
  }
}