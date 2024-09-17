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

    cards.forEach(card => {
        const link = card.querySelector('.card__link');
        const reserveButton = card.querySelector('.card__button');
        const overlay = card.querySelector('.card__overlay');

        if (link) {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                card.classList.add('card--visited');
            });
        }

        if (reserveButton) {
            reserveButton.addEventListener('click', () => {
                card.classList.add('card--selected', 'card--reserved');
            });
        }

        card.addEventListener('click', (event) => {
            if (event.target === card || event.target.classList.contains('card__content')) {
                if (card.classList.contains('card--reserved')) {
                    card.classList.remove('card--reserved', 'card--selected');
                } else if (!card.classList.contains('card--selected')) {
                    card.classList.remove('card--reserved');
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('card--selected')) {
                card.classList.add('card--reserved');
            }
        });
    });
});