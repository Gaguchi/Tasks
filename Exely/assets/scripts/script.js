document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const reserveButton = card.querySelector('.card__button');
        const paymentLink = card.querySelector('.card__overlay-content__overlay-link');

        if (reserveButton) {
            reserveButton.addEventListener('click', (event) => {
                event.stopPropagation(); 
                if (!card.classList.contains('card--reserved')) {
                    card.classList.add('card--selected');
                }
            });
        }

        if (paymentLink) {
            paymentLink.addEventListener('click', (event) => {
                event.stopPropagation(); 
            });
        }

        card.addEventListener('click', (event) => {
            if (!event.target.closest('.card__overlay-content__overlay-link')) {
                card.classList.remove('card--selected', 'card--reserved');
                const overlay = card.querySelector('.card__overlay');
                if (overlay) {
                    overlay.classList.add('hidden');
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('card--selected')) {
                card.classList.add('card--reserved');
                const overlay = card.querySelector('.card__overlay');
                if (overlay) {
                    overlay.classList.remove('hidden');
                    overlay.style.display = 'flex';
                }
            }
        });

        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.card__overlay');
            if (card.classList.contains('card--reserved') && (!overlay || overlay.classList.contains('hidden'))) {
                card.classList.remove('card--reserved');
            }
        });
    });
});