let storedSvgContent = ''; 

function renderSVG(svgContent) {
    document.getElementById('car-container').innerHTML = svgContent;
    
    const parts = ['bonnet', 'door_front', 'door_back', 'trunk', 'wheels'];

    parts.forEach(part => {
        document.getElementById(part).addEventListener('click', handlePartClick);
    });
}

fetch('car.svg')
    .then(response => response.text())
    .then(svgContent => {
        storedSvgContent = svgContent; 
        Ecwid.Cart.get(function(cart) {
            checkCarAssembled(cart);
        });
    });

const config = {
    storeId: '107999866',
    products: {
        bonnet: '692143956',
        door_front: '692138992',
        door_back: '692143957',
        trunk: '692150075',
        wheels: '692141992'
    }
};

function checkCarAssembled(cart) {
    const requiredParts = {
        bonnet: false,
        door_front: false,
        door_back: false,
        trunk: false,
        wheels: false
    };

    cart.items.forEach(item => {
        const productId = item.product.id;
        for (const part in requiredParts) {
            if (productId === parseInt(config.products[part])) {
                requiredParts[part] = true;
            }
        }
    });

    const isAssembled = Object.values(requiredParts).every(Boolean);
    if (isAssembled) {
        document.getElementById('car-container').innerHTML = '<h1>вы собрали автомобиль</h1>';
    } else {
        renderSVG(storedSvgContent); 
    }
    return isAssembled;
}

function isProductInCart(cart, productId) {
    return cart.items.some(item => item.product.id === productId);
}

function handlePartClick(event) {
    const clickedId = event.currentTarget.id;
    const productId = parseInt(config.products[clickedId]);
    
    Ecwid.Cart.get(function(cart) {
        if (isProductInCart(cart, productId)) {
            console.log('товар уже добавлен в корзину');
            checkCarAssembled(cart);
            return;
        }
        
        const product = {
            id: productId,
            quantity: 1,
            callback: function(success, product, cart) {
                if (success) {
                    checkCarAssembled(cart);
                } else {
                    console.log(`произошла ошибка при добавлении товара ${product.name} в корзину`);
                }
            }
        };
        
        Ecwid.Cart.addProduct(product);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('ecwid-popup-closeButton')) {
        Ecwid.Cart.get(function(cart) {
            checkCarAssembled(cart);
        });
    }
});