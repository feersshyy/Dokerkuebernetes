// Funcionalidad para las recomendaciones en index.html
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar si estamos en index.html y existe la sección de recomendaciones
    const recomendacionesSection = document.getElementById('recomendaciones');
    
    if (recomendacionesSection) {
        // Datos de modelos por marca
        const modelosPorMarca = {
            toyota: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Yaris', 'Prius'],
            honda: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot'],
            nissan: ['Sentra', 'Versa', 'March', 'X-Trail', 'Kicks'],
            ford: ['Fiesta', 'Focus', 'Mustang', 'Explorer', 'Ranger'],
            chevrolet: ['Aveo', 'Spark', 'Cruze', 'Malibu', 'Equinox'],
            volkswagen: ['Jetta', 'Golf', 'Vento', 'Tiguan', 'Passat']
        };

        // Elementos del DOM
        const marcaSelect = document.getElementById('marca');
        const modeloSelect = document.getElementById('modelo');
        const anoSelect = document.getElementById('ano');
        const buscarBtn = document.getElementById('buscar-recomendaciones');
        const addButtons = document.querySelectorAll('.btn-add');
        const kitButtons = document.querySelectorAll('.btn-kit');

        // Event listener para cambio de marca
        if (marcaSelect) {
            marcaSelect.addEventListener('change', function() {
                const marca = this.value;
                
                // Limpiar y deshabilitar modelo y año
                modeloSelect.innerHTML = '<option value="">Primero selecciona marca</option>';
                modeloSelect.disabled = true;
                anoSelect.innerHTML = '<option value="">Primero selecciona modelo</option>';
                anoSelect.disabled = true;
                
                if (marca && modelosPorMarca[marca]) {
                    modeloSelect.disabled = false;
                    modeloSelect.innerHTML = '<option value="">Selecciona modelo</option>';
                    
                    // Llenar modelos
                    modelosPorMarca[marca].forEach(modelo => {
                        const option = document.createElement('option');
                        option.value = modelo.toLowerCase();
                        option.textContent = modelo;
                        modeloSelect.appendChild(option);
                    });
                }
            });
        }

        // Event listener para los botones de añadir al carrito
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const productCard = this.closest('.producto-recomendado');
                const productName = productCard.querySelector('h5').textContent;
                const productPrice = productCard.querySelector('.producto-precio').textContent.replace('$', '');
                
                // Añadir al carrito
                if (typeof cart !== 'undefined') {
                    cart.addItem({
                        id: productId,
                        name: productName,
                        price: parseFloat(productPrice),
                        image: `https://via.placeholder.com/250x200?text=${encodeURIComponent(productName)}`
                    });
                }
                
                // Efecto visual
                this.innerHTML = '✓';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = '+';
                    this.style.background = 'var(--success)';
                }, 1500);
            });
        });

        // Event listeners para kits
        kitButtons.forEach(button => {
            button.addEventListener('click', function() {
                const kitCard = this.closest('.kit-card');
                const kitName = kitCard.querySelector('h4').textContent;
                const kitPrice = kitCard.querySelector('.precio-oferta').textContent.replace('$', '');
                
                // Añadir kit al carrito
                if (typeof cart !== 'undefined') {
                    cart.addItem({
                        id: 'kit-' + Date.now(),
                        name: kitName,
                        price: parseFloat(kitPrice),
                        image: 'https://via.placeholder.com/250x200?text=Kit'
                    });
                }
                
                // Efecto visual
                this.innerHTML = '✓ Kit Añadido';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = 'Añadir Kit al Carrito';
                    this.style.background = 'var(--secondary)';
                }, 2000);
            });
        });
    }
});