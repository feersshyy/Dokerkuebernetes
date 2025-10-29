// Funcionalidad del carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    const cart = {
        items: [],
        total: 0,
        
        addItem: function(product) {
            const existingItem = this.items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    image: product.image,
                    quantity: 1
                });
            }
            
            this.updateCart();
        },
        
        removeItem: function(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.updateCart();
        },
        
        updateQuantity: function(id, change) {
            const item = this.items.find(item => item.id === id);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    this.removeItem(id);
                } else {
                    this.updateCart();
                }
            }
        },
        
        calculateTotal: function() {
            this.total = this.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
        },
        
        updateCart: function() {
            this.calculateTotal();
            this.renderCartItems();
            this.updateCartCount();
            this.updateCartTotal();
        },
        
        renderCartItems: function() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            
            if (this.items.length === 0) {
                emptyCartMessage.style.display = 'block';
                cartItemsContainer.innerHTML = '';
                cartItemsContainer.appendChild(emptyCartMessage);
                return;
            }
            
            emptyCartMessage.style.display = 'none';
            
            let cartHTML = '';
            
            this.items.forEach(item => {
                cartHTML += `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${item.price.toFixed(2)}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                </div>
                                <button class="remove-item" data-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = cartHTML;
            
            // Añadir event listeners a los botones de cantidad y eliminar
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    cart.updateQuantity(id, -1);
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    cart.updateQuantity(id, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    cart.removeItem(id);
                });
            });
        },
        
        updateCartCount: function() {
            const cartCount = document.querySelector('.cart-count');
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        },
        
        updateCartTotal: function() {
            const cartTotal = document.querySelector('.cart-total-amount');
            cartTotal.textContent = this.total.toFixed(2);
        }
    };
    
    // Abrir y cerrar carrito
    const openCartButton = document.getElementById('open-cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    openCartButton.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCartButton.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Añadir productos al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price'),
                image: this.getAttribute('data-image')
            };
            
            cart.addItem(product);
            
            // Efecto visual
            this.textContent = '¡Añadido!';
            this.style.backgroundColor = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = 'Añadir al Carrito';
                this.style.backgroundColor = 'var(--accent)';
            }, 1500);
        });
    });
    
    // Wishlist
    const wishlistButtons = document.querySelectorAll('.wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--secondary)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = 'var(--gray)';
            }
        });
    });
    
    // Menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.right = '15px';
            nav.style.background = 'var(--primary)';
            nav.style.padding = '20px';
            nav.style.borderRadius = '8px';
            nav.style.boxShadow = 'var(--shadow)';
        }
    });
    
    // Inicializar carrito
    cart.updateCart();
});