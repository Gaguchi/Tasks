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
        const reserveButton = card.querySelector('.card__button');
        const paymentLink = card.querySelector('.card__overlay-content a');

        // Reserve button click event
        if (reserveButton) {
            reserveButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the card click event from firing
                if (!card.classList.contains('card--reserved')) {
                    card.classList.add('card--selected');
                }
            });
        }

        // Payment link click event
        if (paymentLink) {
            paymentLink.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the card click event from firing
            });
        }

        // Card click event for cancellation
        card.addEventListener('click', (event) => {
            // Check if the click is not on the payment link
            if (!event.target.closest('.card__overlay-content a')) {
                card.classList.remove('card--selected', 'card--reserved');
                const overlay = card.querySelector('.card__overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        });

        // Mouse leave event to apply reservation
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('card--selected')) {
                card.classList.add('card--reserved');
                const overlay = card.querySelector('.card__overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            }
        });

        // Mouse enter event to remove reserved state only if overlay is not visible
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.card__overlay');
            if (card.classList.contains('card--reserved') && (!overlay || overlay.style.display === 'none')) {
                card.classList.remove('card--reserved');
            }
        });
    });
});