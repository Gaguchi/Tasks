function renderSVG(svgContent) {
    document.getElementById('car-container').innerHTML = svgContent;
    
    document.getElementById('bonnet').addEventListener('click', handlePartClick);
    document.getElementById('door_front').addEventListener('click', handlePartClick);
    document.getElementById('door_back').addEventListener('click', handlePartClick);
    document.getElementById('trunk').addEventListener('click', handlePartClick);
    document.getElementById('wheels').addEventListener('click', handlePartClick);
}

fetch('car.svg')
    .then(response => response.text())
    .then(svgContent => {
        Ecwid.Cart.get(function(cart) {
            if(checkCarAssembled(cart)) {
                document.getElementById('car-container').innerHTML = '<h1>Car assembled!</h1>';
            } else {
                renderSVG(svgContent);
            }
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
    let hasBonnet = false;
    let hasDoorFront = false;
    let hasDoorBack = false;
    let hasTrunk = false;
    let hasWheels = false;

    for(let i = 0; i < cart.items.length; i++) {
        const productId = cart.items[i].product.id;
        
        if(productId === parseInt(config.products.bonnet)) hasBonnet = true;
        if(productId === parseInt(config.products.door_front)) hasDoorFront = true;
        if(productId === parseInt(config.products.door_back)) hasDoorBack = true;
        if(productId === parseInt(config.products.trunk)) hasTrunk = true;
        if(productId === parseInt(config.products.wheels)) hasWheels = true;
    }

    const isAssembled = hasBonnet && hasDoorFront && hasDoorBack && hasTrunk && hasWheels;
    if(isAssembled) {
        document.getElementById('car-container').innerHTML = '<h1>вы собрали автомобиль</h1>';
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