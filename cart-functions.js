// cart-functions.js

// Function to get cart items from localStorage
function getCartItems() {
    const cartItems = localStorage.getItem('shoppingCart');
    return cartItems ? JSON.parse(cartItems) : [];
}

// Function to save cart items to localStorage
function saveCartItems(cartItems) {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    updateCartCount(); // Update the count whenever items are saved
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cart = getCartItems();
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        // Calculate total quantity of items in the cart
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = getCartItems();
    const existingItem = cart.find(item => item.id === productId);
    

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
        
    } else {
        // Find the product details from allProducts (defined in products-data.js)
        const productToAdd = allProducts.find(p => p.id === productId);
        if (productToAdd) {
            cart.push({
                id: productToAdd.id,
                name: productToAdd.name,
                price: productToAdd.price,
                image: productToAdd.image,
                quantity: 1
            });
        } else {
            console.error('Product not found for ID:', productId);
            alert('Could not add product to cart. Product details missing.');
            return;
        }
    }
    saveCartItems(cart);
    // Show a user-friendly message
    const productName = existingItem ? existingItem.name : (allProducts.find(p => p.id === productId)?.name || 'Item');
    alert($`{productName} has been added to your cart!`);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = getCartItems();
    const productName = cart.find(item => item.id === productId)?.name || 'Item';
    cart = cart.filter(item => item.id !== productId); // Remove the item
    saveCartItems(cart);
    alert($`{productName} has been removed from your cart.`);
}

// Function to change quantity (e.g., from cart page)
function changeQuantity(productId, newQuantity) {
    const cart = getCartItems();
    const item = cart.find(i => i.id === productId);

    if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
            removeFromCart(productId); // Remove if quantity goes to 0 or less
        } else {
            saveCartItems(cart);
        }
    }
}

// Initialize cart count on page load for any page that includes this script
document.addEventListener('DOMContentLoaded', updateCartCount);