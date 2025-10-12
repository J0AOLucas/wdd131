
const gallery = document.querySelector('.images-group');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

const menuButton = document.querySelector('h2');
const mobileMenu = document.getElementById('mobile-menu');

gallery.addEventListener('click', openModal);

function openModal(e) {
    console.log(e.target);
    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    
    modalImage.src = src;
    modalImage.alt = alt;

    modal.showModal();
    
}
closeButton.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});


menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});
          