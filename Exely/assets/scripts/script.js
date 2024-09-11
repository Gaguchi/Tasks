document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a.card-link');

    links.forEach(link => {
        link.addEventListener('click', () => {
            const card = link.closest('.card');
            card.classList.add('visited');
        });
    });
});