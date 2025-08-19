// Cart functionality for Brew & Bean Coffee Shop
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    const cart = {
        items: [],
        total: 0,
        
        // Add item to cart
        addItem: function(name, price) {
            const existingItem = this.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            this.updateTotal();
            this.updateCartDisplay();
        },
        
        // Update total price
        updateTotal: function() {
            this.total = this.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
        },
        
        // Update cart display
        updateCartDisplay: function() {
            const cartItemsElement = document.getElementById('cart-items');
            const cartTotalElement = document.getElementById('cart-total');
            
            // Clear existing items
            cartItemsElement.innerHTML = '';
            
            // Add current items
            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.quantity} x ₹${item.price}</span>
                    <span>₹${item.quantity * item.price}</span>
                `;
                cartItemsElement.appendChild(itemElement);
            });
            
            // Update total
            cartTotalElement.textContent = `Total: ₹${this.total}`;
        }
    };

    // Add event listeners to all "Add to Order" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('₹', ''));
            
            cart.addItem(itemName, itemPrice);
            
            // Visual feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Order';
            }, 1000);
        });
    });
});
