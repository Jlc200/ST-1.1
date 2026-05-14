// Funciones JavaScript para el eCommerce

// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function() {
    // Get the modal element
    var usuarioModal = document.getElementById('usuarioModal');
    // Get the form element
    var formRegistro = document.getElementById('formRegistro');
    // Get the button element
    var eliminarUsuario = document.getElementById('eliminarUsuario');

    // Function to update modal content based on user registration
    function updateModalContent() {
        var nombreGuardado = localStorage.getItem('nombreUsuario');
        if (nombreGuardado) {
            usuarioModal.querySelector('.modal-title').textContent = 'Tus Datos';
            formRegistro.style.display = 'none';
            document.getElementById('detallesUsuario').style.display = 'block';
            document.getElementById('nombreUsuario').textContent = nombreGuardado;
        } else {
            usuarioModal.querySelector('.modal-title').textContent = 'Registrar Usuario';
            formRegistro.style.display = 'block';
            document.getElementById('detallesUsuario').style.display = 'none';
        }
    }

    // Call updateModalContent initially to set the correct state
    updateModalContent();

    // Add an event listener for the 'show.bs.modal' event
    usuarioModal.addEventListener('show.bs.modal', function() {
        // Update modal content on each show
        updateModalContent();
    });

    // Add an event listener for the 'submit' event
    formRegistro.addEventListener('submit', function(event) {
        event.preventDefault();
        var nombre = document.getElementById('nombre').value;
        localStorage.setItem('nombreUsuario', nombre);
        // Update modal content after registration
        updateModalContent();
    });

    // Add an event listener for the 'click' event
    eliminarUsuario.addEventListener('click', function() {
        localStorage.removeItem('nombreUsuario');
        // usuarioModal.hide(); // Esto puede causar un error, ya que no es una función nativa del modal
        // Para cerrar el modal, puedes usar el método .hide() de Bootstrap:
        var modal = bootstrap.Modal.getInstance(usuarioModal); // Obtener la instancia del modal
        if (modal) {
            modal.hide(); // Cerrar el modal si la instancia existe
        }
        // Update modal content after logout
        updateModalContent();
    });

    // Rellenar el input cliente
    var nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        document.getElementById('cliente').value = nombreUsuario;
    }
});

// carrito
let carrito = [];
let totalGeneral = 0;

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si el producto ya existe, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto es nuevo, agregarlo al carrito con cantidad 1
        producto.cantidad = 1;
        carrito.push(producto);
    }

    actualizarCarrito();

    // Actualizar el modal del carrito
    mostrarCarritoModal();

    Swal.fire({
        title: "Producto agregado!",
        text: 'El producto ' + producto.marca + ' se ha agregado correctamente.',
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
}

// Función para actualizar el contador del carrito
function actualizarCarrito() {
    const contadorCarrito = document.getElementById('carritoContador');
    contadorCarrito.textContent = carrito.length;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    // Limpiar el contenido del modal y mostrar mensaje de carrito vacío
    const modalBody = document.getElementById('carritoModalBody');
    modalBody.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
}

// Función para calcular el subtotal de un producto
function calcularSubtotalProducto(producto) {
    return producto.precio * producto.cantidad;
}

// Función para calcular el total general del carrito
function calcularTotalGeneral() {
    totalGeneral = carrito.reduce((total, producto) => total + calcularSubtotalProducto(producto), 0);
    return totalGeneral;
}

// Función para mostrar el carrito en el modal
function mostrarCarritoModal() {
    const modalBody = document.getElementById('carritoModalBody');
    modalBody.innerHTML = ''; // Limpiar el contenido anterior del modal

    if (carrito.length === 0) {
        modalBody.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        return;
    }

    // Mostrar los productos del carrito con opciones de edición y eliminar
    const table = document.createElement('table');
    table.classList.add('table', 'form-group');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');

    carrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.marca}" width="50"></td>
            <td>${producto.marca}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>
                <input type="number" class="form-control" value="${producto.cantidad}" min="1" onchange="actualizarCantidadProducto(${producto.id}, this.value)">
            </td>
            <td>${calcularSubtotalProducto(producto).toFixed(2)}</td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarProductoDelCarrito(${producto.id})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });

    // Calcular y mostrar el subtotal general, el IGV y el total
    const totalGeneral = calcularTotalGeneral();
    const igv = totalGeneral * 0.18;
    const total = totalGeneral - igv;

    const divTotales = document.createElement('div');
    divTotales.innerHTML = `
        <p class="text-end">Subtotal: S/. ${total.toFixed(2)}</p>
        <p class="text-end">IGV (18%): S/. ${igv.toFixed(2)}</p>
        <p class="text-end h4" id="ts">Total: S/. ${totalGeneral.toFixed(2)}</p>
    `;

    modalBody.appendChild(table);
    modalBody.appendChild(divTotales);
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidadProducto(id, cantidad) {
    const producto = carrito.find(item => item.id === id);

    if (producto) {
        // Validación de la cantidad
        if (cantidad < 1) {
            cantidad = 1; // Cantidad mínima de 1
            // alert("La cantidad mínima es 1.");
        }

        producto.cantidad = cantidad;

        // Actualizar el modal del carrito
        mostrarCarritoModal();

        // Actualizar el almacenamiento local
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    // Actualizar el modal del carrito
    mostrarCarritoModal();
}

// Función para normalizar el texto (eliminar tildes y convertir a minúsculas)
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función para enviar la lista de productos seleccionados a WhatsApp
function enviarListaWhatsApp() {
    let cliente = document.getElementById('cliente');

    if (carrito.length === 0) {
        // sweetslert
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: "warning",
            title: "CARRITO VACÍO",
            text: "Tu carrito está vacío. Por favor, agrega productos."
        });

        setTimeout(() => {
            window.location = "index.html";
        }, 3000);

        return; // Detener la ejecución de la función
    } else if (cliente.value === '') {
        cliente.focus();
        Swal.fire({
            title: "NOMBRE VACÍO",
            text: 'Ingresa tu nombre en el campo requerido',
            icon: "warning",
            showConfirmButton: false,
            timer: 2000
        });
        return;
    } else {

        // para obtener fecha y hora
        //%0A*Fecha:* ${new Date().toLocaleDateString()} %0A*Hora:* ${new Date().toLocaleTimeString()}
        // Obtener la lista de productos del carrito
        const productos = carrito.map(producto => `*Producto:* ${producto.marca}%0A*Cantidad:* ${producto.cantidad}%0A*Precio:* S/ ${producto.precio}%0A*Subtotal:* S/ ${(producto.precio * producto.cantidad).toFixed(2)}%0A`).join('%0A');
        let rCompra = carrito.map(producto => `*${producto.cantidad} -> : : ${producto.qr}`).join('%0A');

        // Formatear el mensaje para WhatsApp
        let t = a;
        let total = calcularTotalGeneral();
        let igv = total * 0.18;
        let subtotal = totalGeneral - igv;

        const mensaje = `*COTIZACIÓN:* ${boletaContador} %0A----------------------------------------%0A*Cliente:* ${cliente.value}%0A----------------------------------------%0A${productos}----------------------------------------%0A*Subtotal:* S/ ${subtotal.toFixed(2)}%0A*IGV:* S/ ${igv.toFixed(2)}%0A*Total a pagar: S/ ${total.toFixed(2)}*%0A----------------------------------------%0A${rCompra}`;

        // Abrir WhatsApp con el mensaje predefinido
        const url = `https://wa.me/${t}?text=${mensaje}`; // Reemplaza 51999999999 con el número de teléfono correcto
        window.open(url, '_blank');
        cliente.value = ''
        // window.location = "index.html"; // Esto recarga la página, puedes usar window.location.reload() si quieres recargar
        window.location.reload(); // Recarga la página

        // Limpiar el localStorage después de enviar el pedido
        localStorage.removeItem('carrito');

        // Vaciar el carrito
        vaciarCarrito();
    }
}

//Función para inicializar el catálogo de productos desde un arreglo
function inicializarCatalogoProductos(productos) {
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = ''; // Limpiar el contenido anterior

    // Ordenar el arreglo de productos de forma aleatoria
    productos.sort(() => 0.5 - Math.random());

    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto', `category-${producto.categoria}`);
        div.id
        // Verificar la disponibilidad del producto
        if (producto.disponible === "DISPONIBLE") {
            div.innerHTML = `
                <div class="face front" id="${producto.qr}">
                    <img class="cimg" src="${producto.imagen}" alt="${producto.marca}">
                    <h1>S/. <span>${producto.precio}</span></h1>
                </div>
                <div class="face back">
                    <h4 class="name my-0 font-weight-bold">${producto.marca}</h4>
                    <ul class="list-unstyled mt-3 mb-4">
                        ${producto.detalles.map((ele) => `<li>${ele}</li>`).join("")}
                    </ul>
                    <h5>${producto.disponible}</h5>
                    <h1 class="card-title pricing-card-title precio">S/. <span>${producto.precio}</span></h1>
                    <a href="#" class="btn btn-block btn-success agregar-carrito" data-id="${producto.id}">Comprar</a>
                </div>
            `;
        } else {
            // Si el producto está agotado, mostrar un mensaje de alerta
            div.innerHTML = `
                <div class="face front">
                    <img class="img" src="${producto.imagen}" alt="${producto.marca}">
                    <h1>S/. <span>${producto.precio}</span></h1>
                </div>
                <div class="face back">
                    <h4 class="name my-0 font-weight-bold">${producto.marca}</h4>
                    <ul class="list-unstyled mt-3 mb-4">
                        ${producto.detalles.map((ele) => `<li>${ele}</li>`).join("")}
                    </ul>
                    <h5>${producto.disponible}</h5>
                    <h1 class="card-title pricing-card-title precio">S/. <span>${producto.precio}</span></h1>
                    <button class="btn btn-block btn-secondary disabled" disabled>Agotado</button>
                </div>
            `;
        }

        contenedorProductos.appendChild(div);
    });

    // Agregar evento click a los botones "Comprar"
    const botonesComprar = document.querySelectorAll('.agregar-carrito');

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace

            const idProducto = parseInt(boton.dataset.id);
            const producto = productos.find(item => item.id === idProducto);

            // Agregar el producto al carrito solo si está disponible
            if (producto.disponible === "DISPONIBLE") {
                agregarProductoAlCarrito(producto);
            } else {
                // Mostrar una alerta si el producto está agotado
                Swal.fire({
                    title: "Producto Agotado",
                    text: 'El producto ' + producto.marca + ' está agotado.',
                    icon: "warning",
                    showConfirmButton: true,
                    timer: 2000
                });
            }
        });
    });
}

// Inicializar catálogo de productos al cargar la página
window.addEventListener('load', () => {
    inicializarCatalogoProductos(stockProductos);

    // Cargar el carrito desde el local storage
    const carritoLocalStorage = localStorage.getItem('carrito');
    if (carritoLocalStorage) {
        carrito = JSON.parse(carritoLocalStorage);
        actualizarCarrito();
        mostrarCarritoModal();
    }
});

//Filtro de Productos
const campoBusqueda = document.getElementById('filterInput');

//Nueva función para realizar la búsqueda
function realizarBusqueda() {
    const busqueda = campoBusqueda.value.toLowerCase();
    filtrarProductos(busqueda);
}

// Escuchar el evento 'keydown' en el campo de búsqueda
campoBusqueda.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar que el form se envíe
        realizarBusqueda(); // Llamar a la función de búsqueda
    }
});

// Función para filtrar productos
function filtrarProductos(filtro) {
    const productos = document.querySelectorAll('.producto');
    const palabrasClave = filtro.split(/\s+/).filter(Boolean); // Divide la búsqueda en palabras clave
    const resultados = [];

    productos.forEach(producto => {
        // Normalizar el nombre del producto
        const nombreProducto = normalizarTexto(producto.querySelector('.name').textContent);
        let coincidencias = 0;

        palabrasClave.forEach(palabra => {
            // Normalizar la palabra clave de búsqueda
            const palabraNormalizada = normalizarTexto(palabra);
            if (nombreProducto.includes(palabraNormalizada)) {
                coincidencias++; // Incrementa el conteo de coincidencias por palabra clave
            }
        });

        if (coincidencias > 0) {
            resultados.push({ producto: producto, coincidencias: coincidencias }); // Guarda el producto y el número de coincidencias
        }
    });

    // Ordena los resultados por número de coincidencias (mayor a menor)
    resultados.sort((a, b) => b.coincidencias - a.coincidencias);

    // Muestra los resultados ordenados
    productos.forEach(producto => {
        producto.style.display = 'none'; // Oculta todos los productos inicialmente
    });

    resultados.forEach(resultado => {
        resultado.producto.style.display = 'block'; // Muestra los productos que coinciden
    });
}

// Función para filtrar productos por categoría
function filtrarCategoria(enlace) {
    const categoria = enlace.dataset.filter;
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        if (categoria === 'all' || producto.classList.contains(`category-${categoria}`)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

let boletaContador = Math.random().toString(4).substring(2, 10).toUpperCase();
a = 467387941338/09;

 // carrusel
document.addEventListener('DOMContentLoaded', function () {
    const cardCarousel = document.getElementById('cardCarousel');
    const carouselInner = cardCarousel.querySelector('.carousel-inner');
    
  function createCardHtml(card) {
         return `
             <div class="card">
                 <img src="${card.img}" class="card-img-top" alt="${card.title}">
         `;
     }
    function generateCarouselItems() {
        carouselInner.innerHTML = ''; // Limpiar carrusel existente
        let itemsPerSlide;

        if (window.innerWidth < 768) {
            itemsPerSlide = 1;
        } else if (window.innerWidth < 992) {
            itemsPerSlide = 2;
        } else { 
            itemsPerSlide = 3;
        }

        for (let i = 0; i < allCardsData.length; i++) {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (i === 0) {
                carouselItem.classList.add('active');
            }

            const row = document.createElement('div');
            row.classList.add('row', 'justify-content-center');

            for (let j = 0; j < itemsPerSlide; j++) {
                const cardIndex = (i + j) % allCardsData.length;
                const currentCardData = allCardsData[cardIndex];

                const col = document.createElement('div');
                col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-3');
                
                if (j >= 1 && window.innerWidth < 768) { 
                    col.classList.add('d-none');
                } else if (j >= 2 && window.innerWidth < 992) {
                    col.classList.add('d-none');
                }

                col.innerHTML = createCardHtml(currentCardData);
                row.appendChild(col);
            }
            carouselItem.appendChild(row);
            carouselInner.appendChild(carouselItem);
        }

        const bsCarousel = bootstrap.Carousel.getInstance(cardCarousel);
        if (bsCarousel) {
            bsCarousel.dispose(); 
        }
        new bootstrap.Carousel(cardCarousel); 
    }

    generateCarouselItems();

    window.addEventListener('resize', generateCarouselItems);

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(generateCarouselItems, 200);
    });

});
