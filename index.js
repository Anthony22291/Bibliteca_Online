// Array para almacenar los productos en el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('contador-productos');

// Función para añadir al carrito
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const bookTitle = e.target.dataset.title;
        const bookPrice = parseFloat(e.target.dataset.price);
        const bookAuthor = e.target.dataset.author;

        // Verificar si el libro ya está en el carrito
        const existingBook = cart.find(book => book.title === bookTitle);

        if (existingBook) {
            // Si el libro ya está en el carrito, aumentar la cantidad
            existingBook.quantity += 1;
        } else {
            // Si no está en el carrito, añadirlo
            cart.push({ title: bookTitle, price: bookPrice, author: bookAuthor, quantity: 1 });
        }

        // Guardar el carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizar el contador en la UI
        cartCount.textContent = cart.length;
    });
});

// Función para eliminar un libro del carrito
function removeFromCart(index) {
    const book = cart[index];

    // Si la cantidad es mayor a 1, solo reducirla
    if (book.quantity > 1) {
        book.quantity -= 1;
    } else {
        // Si la cantidad es 1, eliminar el libro
        cart.splice(index, 1);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar el carrito en la interfaz
    updateCart();
}

// Función para actualizar el carrito en la página
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('total-price');

    // Limpiar el carrito actual en la interfaz
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    // Recorrer el carrito y mostrar los productos
    cart.forEach((book, index) => {
        totalPrice += book.price * book.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div class="row">
                    <div class="col-md-8">
                        <p><strong>${book.title}</strong><br>Autor: ${book.author}</p>
                        <p>Cantidad: ${book.quantity}</p>
                    </div>
                    <div class="col-md-2">
                        <p>Precio: $${book.price}</p>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Mostrar el total del carrito
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// Función que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Si hay datos en el carrito, cargarlos
    if (cart.length > 0) {
        updateCart();
    }
    function finalizarReserva() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega libros antes de finalizar.');
            return;
        }
    
        const summaryContainer = document.getElementById('purchase-summary');
        const summaryItems = document.getElementById('summary-items');
        const summaryTotal = document.getElementById('summary-total');
    
        // Limpiar contenido previo
        summaryItems.innerHTML = '';
        let total = 0;
    
        // Generar el resumen
        cart.forEach((book, index) => {
            total += book.price * book.quantity;
            summaryItems.innerHTML += `
                <p>${index + 1}. <strong>${book.title}</strong> - ${book.quantity} x $${book.price} = $${(book.quantity * book.price).toFixed(2)}</p>
            `;
        });
    
        summaryTotal.textContent = `Total: $${total.toFixed(2)}`;
    
        // Mostrar el resumen
        summaryContainer.style.display = 'block';
    
        // Opcional: limpiar el carrito después de finalizar
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
    }
    
     // Cambiar color de fondo al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

    
});
