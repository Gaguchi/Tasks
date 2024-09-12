document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a.card-link');

    links.forEach(link => {
        link.addEventListener('click', () => {
            const card = link.closest('.card');
            card.classList.add('visited');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const reserveButtons = document.querySelectorAll('.btn-primary');

    reserveButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            card.classList.add('selected');
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('reserved')) {
                card.classList.remove('reserved');
                card.classList.remove('selected');
                const overlay = card.querySelector('.overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            } else if (!card.classList.contains('selected')) {
                card.classList.remove('reserved');
                const overlay = card.querySelector('.overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('selected')) {
                card.classList.add('reserved');
                const overlay = card.querySelector('.overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            }
        });
    });
});