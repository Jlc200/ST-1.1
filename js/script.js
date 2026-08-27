// Funciones JavaScript para el eCommerce

// Wait for the DOM to be fully loaded
window.addEventListener("DOMContentLoaded", function () {
  // Get the modal element
  var usuarioModal = document.getElementById("usuarioModal");
  // Get the form element
  var formRegistro = document.getElementById("formRegistro");
  // Get the button element
  var eliminarUsuario = document.getElementById("eliminarUsuario");

  // Function to update modal content based on user registration
  function updateModalContent() {
    var nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado) {
      usuarioModal.querySelector(".modal-title").textContent = "Tus Datos";
      formRegistro.style.display = "none";
      document.getElementById("detallesUsuario").style.display = "block";
      document.getElementById("nombreUsuario").textContent = nombreGuardado;
    } else {
      usuarioModal.querySelector(".modal-title").textContent =
        "Registrar Usuario";
      formRegistro.style.display = "block";
      document.getElementById("detallesUsuario").style.display = "none";
    }
  }

  // Call updateModalContent initially to set the correct state
  updateModalContent();

  // Add an event listener for the 'show.bs.modal' event
  usuarioModal.addEventListener("show.bs.modal", function () {
    // Update modal content on each show
    updateModalContent();
  });

  // Add an event listener for the 'submit' event
  formRegistro.addEventListener("submit", function (event) {
    event.preventDefault();
    var nombre = document.getElementById("nombre").value;
    localStorage.setItem("nombreUsuario", nombre);
    // Update modal content after registration
    updateModalContent();
  });

  // Add an event listener for the 'click' event
  eliminarUsuario.addEventListener("click", function () {
    localStorage.removeItem("nombreUsuario");
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
  var nombreUsuario = localStorage.getItem("nombreUsuario");
  if (nombreUsuario) {
    document.getElementById("cliente").value = nombreUsuario;
  }
});

// carrito
let carrito = [];
let totalGeneral = 0;

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(producto) {
  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.id === producto.id);

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
    text: "El producto " + producto.marca + " se ha agregado correctamente.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Función para actualizar el contador del carrito
function actualizarCarrito() {
  const contadorCarrito = document.getElementById("carritoContador");
  contadorCarrito.textContent = carrito.length;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  // Limpiar el contenido del modal y mostrar mensaje de carrito vacío
  const modalBody = document.getElementById("carritoModalBody");
  modalBody.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
}

// Función para calcular el subtotal de un producto
function calcularSubtotalProducto(producto) {
  return producto.precio * producto.cantidad;
}

// Función para calcular el total general del carrito
function calcularTotalGeneral() {
  totalGeneral = carrito.reduce(
    (total, producto) => total + calcularSubtotalProducto(producto),
    0,
  );
  return totalGeneral;
}

// Función para mostrar el carrito en el modal
function mostrarCarritoModal() {
  const modalBody = document.getElementById("carritoModalBody");
  modalBody.innerHTML = ""; // Limpiar el contenido anterior del modal

  if (carrito.length === 0) {
    modalBody.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
    return;
  }

  // Mostrar los productos del carrito con opciones de edición y eliminar
  const table = document.createElement("table");
  table.classList.add("table", "form-group");
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

  const tbody = table.querySelector("tbody");

  carrito.forEach((producto) => {
    const row = document.createElement("tr");
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

  // Calcular y mostrar el subtotal general como el importe base sin IGV, el IGV como referencia y el total final
  const totalConIgv = calcularTotalGeneral();
  const subtotal = totalConIgv / 1.18;
  const igv = totalConIgv - subtotal;
  const total = totalConIgv;

  const divTotales = document.createElement("div");
  divTotales.innerHTML = `
        <p class="text-end">Subtotal: S/. ${subtotal.toFixed(2)}</p>
        <p class="text-end">IGV (18%): S/. ${igv.toFixed(2)}</p>
        <p class="text-end h4" id="ts">Total: S/. ${total.toFixed(2)}</p>
    `;

  modalBody.appendChild(table);
  modalBody.appendChild(divTotales);
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidadProducto(id, cantidad) {
  const producto = carrito.find((item) => item.id === id);

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
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
  // Actualizar el modal del carrito
  mostrarCarritoModal();
}

// Función para normalizar el texto (eliminar tildes y convertir a minúsculas)
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Función para enviar la lista de productos seleccionados a WhatsApp
function enviarListaWhatsApp() {
  let cliente = document.getElementById("cliente");

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
      },
    });

    Toast.fire({
      icon: "warning",
      title: "CARRITO VACÍO",
      text: "Tu carrito está vacío. Por favor, agrega productos.",
    });

    setTimeout(() => {
      window.location = "index.html";
    }, 3000);

    return; // Detener la ejecución de la función
  } else if (cliente.value === "") {
    cliente.focus();
    Swal.fire({
      title: "NOMBRE VACÍO",
      text: "Ingresa tu nombre en el campo requerido",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  } else {
    // Obtener la lista de productos del carrito
    const productos = carrito
      .map(
        (producto) =>
          `*Producto:* ${producto.marca}%0A*Cantidad:* ${producto.cantidad}%0A*Precio:* S/ ${producto.precio}%0A*Subtotal:* S/ ${(producto.precio * producto.cantidad).toFixed(2)}%0A`,
      )
      .join("%0A");
    const rCompra = carrito
      .map((producto) => `*${producto.cantidad} x ${producto.qr}`)
      .join("%0A");

    const totalConIgv = calcularTotalGeneral();
    const subtotal = totalConIgv / 1.18;
    const igv = totalConIgv - subtotal;
    const total = totalConIgv;

    const mensaje = `*COTIZACIÓN:* ${boletaContador} %0A----------------------------------------%0A*Cliente:* ${cliente.value}%0A----------------------------------------%0A${productos}----------------------------------------%0A*Subtotal:* S/ ${subtotal.toFixed(2)}%0A*IGV incluido:* S/ ${igv.toFixed(2)}%0A*Total a pagar:* S/ ${total.toFixed(2)}%0A----------------------------------------%0A${rCompra}`;

    const url = `https://wa.me/${telefonoWhatsApp}?text=${mensaje}`;
    window.open(url, "_blank");
    cliente.value = "";
    window.location.reload();

    // Limpiar el localStorage después de enviar el pedido
    localStorage.removeItem("carrito");

    // Vaciar el carrito
    vaciarCarrito();
  }
}

//Función para inicializar el catálogo de productos desde un arreglo
function inicializarCatalogoProductos(productos) {
  const contenedorProductos = document.getElementById("contenedor-productos");
  contenedorProductos.innerHTML = ""; // Limpiar el contenido anterior

  // Ordenar el arreglo de productos de forma aleatoria
  productos.sort(() => 0.5 - Math.random());

  productos.forEach((producto) => {
    const div = document.createElement("div");
    const precioFormateado = Number(producto.precio).toFixed(2);
    div.classList.add("producto", `category-${producto.categoria}`);
    // Verificar la disponibilidad del producto
    if (producto.disponible === "DISPONIBLE") {
      div.innerHTML = `
                <div class="face front" id="${producto.qr}">
                    <div class="producto-heading">
                      <span class="producto-badge">Disponible</span>
                      <h3 class="producto-title">${producto.marca}</h3>
                    </div>
                    <img class="cimg" src="${producto.imagen}" alt="${producto.marca}">
                    <div class="producto-info">
                      <span class="producto-precio">S/ ${precioFormateado}</span>
                      <button type="button" class="btn agregar-carrito producto-main-cart" data-id="${producto.id}">
                        <i class="fas fa-cart-plus" aria-hidden="true"></i> Agregar
                      </button>
                    </div>
                </div>
                <div class="face back">
                    <div>
                      <span class="producto-subtitle">Detalles</span>
                      <h4 class="name my-0 font-weight-bold">${producto.marca}</h4>
                      <ul class="list-unstyled mt-2 mb-3">
                          ${producto.detalles.map((ele) => `<li>${ele}</li>`).join("")}
                      </ul>
                    </div>
                    <div class="producto-actions">
                      <button type="button" class="btn w-100 ver-detalle" data-id="${producto.id}">
                        <i class="fas fa-expand-alt" aria-hidden="true"></i> Ver imagen en detalle
                      </button>
                      <button type="button" class="btn w-100 agregar-carrito" data-id="${producto.id}">
                        <i class="fas fa-cart-plus" aria-hidden="true"></i> Agregar al carrito
                      </button>
                    </div>
                </div>
            `;
    } else {
      // Si el producto está agotado, mostrar un mensaje de alerta
      div.innerHTML = `
                <div class="face front">
                    <div class="producto-heading">
                      <span class="producto-badge agotado">Agotado</span>
                      <h3 class="producto-title">${producto.marca}</h3>
                    </div>
                    <img class="img" src="${producto.imagen}" alt="${producto.marca}">
                    <div class="producto-info">
                      <span class="producto-precio">S/ ${precioFormateado}</span>
                      <button type="button" class="btn producto-main-cart" disabled>
                        <i class="fas fa-ban" aria-hidden="true"></i> Agotado
                      </button>
                    </div>
                </div>
                <div class="face back">
                    <div>
                      <span class="producto-subtitle">Detalles</span>
                      <h4 class="name my-0 font-weight-bold">${producto.marca}</h4>
                      <ul class="list-unstyled mt-2 mb-3">
                          ${producto.detalles.map((ele) => `<li>${ele}</li>`).join("")}
                      </ul>
                    </div>
                    <div class="producto-actions">
                      <button type="button" class="btn w-100 ver-detalle" data-id="${producto.id}">
                        <i class="fas fa-expand-alt" aria-hidden="true"></i> Ver imagen en detalle
                      </button>
                      <h5 class="text-warning fw-bold">${producto.disponible}</h5>
                    </div>
                </div>
            `;
    }

    contenedorProductos.appendChild(div);
  });

  // Agregar evento click a los botones "Comprar"
  const botonesComprar = document.querySelectorAll(".agregar-carrito");

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault(); // Evitar el comportamiento por defecto del enlace

      const idProducto = parseInt(boton.dataset.id);
      const producto = productos.find((item) => item.id === idProducto);

      // Agregar el producto al carrito solo si está disponible
      if (producto.disponible === "DISPONIBLE") {
        agregarProductoAlCarrito(producto);
      } else {
        // Mostrar una alerta si el producto está agotado
        Swal.fire({
          title: "Producto Agotado",
          text: "El producto " + producto.marca + " está agotado.",
          icon: "warning",
          showConfirmButton: true,
          timer: 2000,
        });
      }
    });
  });

  document.querySelectorAll(".ver-detalle").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      mostrarDetalleProducto(
        productos.find((item) => item.id === parseInt(boton.dataset.id)),
      );
    });
  });
}

function mostrarDetalleProducto(producto) {
  if (!producto) return;

  const imagenDetalle = document.getElementById("detalleProductoImagen");
  document.getElementById("detalleProductoTitulo").textContent = producto.marca;
  document.getElementById("detalleProductoNombre").textContent = producto.marca;
  imagenDetalle.classList.remove("is-zoomed");
  imagenDetalle.src = producto.imagen;
  imagenDetalle.alt = producto.marca;
  document.getElementById("detalleProductoPrecio").textContent =
    `S/ ${Number(producto.precio).toFixed(2)}`;

  const disponibilidad = document.getElementById(
    "detalleProductoDisponibilidad",
  );
  disponibilidad.textContent =
    producto.disponible === "DISPONIBLE" ? "Disponible" : "Agotado";
  disponibilidad.classList.toggle(
    "agotado",
    producto.disponible !== "DISPONIBLE",
  );
  document.getElementById("detalleProductoLista").innerHTML = producto.detalles
    .map((detalle) => `<li>${detalle}</li>`)
    .join("");

  const botonCarrito = document.getElementById("detalleProductoCarrito");
  botonCarrito.disabled = producto.disponible !== "DISPONIBLE";
  botonCarrito.innerHTML =
    producto.disponible === "DISPONIBLE"
      ? '<i class="fas fa-cart-plus" aria-hidden="true"></i> Agregar al carrito'
      : "Producto agotado";
  botonCarrito.onclick = () => {
    if (producto.disponible === "DISPONIBLE")
      agregarProductoAlCarrito(producto);
  };

  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("detalleProductoModal"),
  ).show();
}

const imagenDetalle = document.getElementById("detalleProductoImagen");
const modalDetalle = document.getElementById("detalleProductoModal");

function alternarZoomImagen(event) {
  if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") {
    return;
  }

  if (event.type === "keydown") event.preventDefault();
  imagenDetalle.classList.toggle("is-zoomed");
  imagenDetalle.setAttribute(
    "aria-label",
    imagenDetalle.classList.contains("is-zoomed")
      ? "Reducir imagen del producto"
      : "Ampliar imagen del producto",
  );
}

imagenDetalle.addEventListener("click", alternarZoomImagen);
imagenDetalle.addEventListener("keydown", alternarZoomImagen);
modalDetalle.addEventListener("hidden.bs.modal", () => {
  imagenDetalle.classList.remove("is-zoomed");
});

// Inicializar catálogo de productos al cargar la página
window.addEventListener("load", () => {
  const heroBienvenida = document.getElementById("heroBienvenida");

  inicializarCatalogoProductos(stockProductos);

  if (heroBienvenida) {
    setTimeout(() => {
      heroBienvenida.classList.add("is-hidden");
    }, 10000);
  }

  // Cargar el carrito desde el local storage
  const carritoLocalStorage = localStorage.getItem("carrito");
  if (carritoLocalStorage) {
    carrito = JSON.parse(carritoLocalStorage);
    actualizarCarrito();
    mostrarCarritoModal();
  }
});

//Filtro de Productos
const campoBusqueda = document.getElementById("filterInput");
const campoBusquedaMobile = document.getElementById("filterInputMobile");

function sincronizarBuscadores(campoOrigen) {
  if (!campoBusqueda || !campoBusquedaMobile || !campoOrigen) return;

  const valor = campoOrigen.value;

  if (campoOrigen === campoBusqueda) {
    campoBusquedaMobile.value = valor;
  } else if (campoOrigen === campoBusquedaMobile) {
    campoBusqueda.value = valor;
  }
}

//Nueva función para realizar la búsqueda
function realizarBusqueda(origen = "desktop") {
  const inputActivo =
    origen === "mobile" && campoBusquedaMobile
      ? campoBusquedaMobile
      : campoBusqueda;
  const busqueda = (inputActivo?.value || "").trim().toLowerCase();

  if (campoBusqueda) campoBusqueda.value = busqueda;
  if (campoBusquedaMobile) campoBusquedaMobile.value = busqueda;

  if (!busqueda) {
    mostrarTodosProductos();
    return;
  }
  filtrarProductos(busqueda);
}

// Escuchar el evento 'keydown' en ambos buscadores
[campoBusqueda, campoBusquedaMobile].forEach((campo) => {
  if (!campo) return;
  campo.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      realizarBusqueda(campo.id === "filterInputMobile" ? "mobile" : "desktop");
    }
  });
  campo.addEventListener("input", (event) =>
    sincronizarBuscadores(event.target),
  );
});

// Función para mostrar todos los productos
function mostrarTodosProductos() {
  const productos = document.querySelectorAll(".producto");
  productos.forEach((producto) => {
    producto.style.display = "block";
  });
}

// Función para filtrar productos
function filtrarProductos(filtro) {
  const productos = document.querySelectorAll(".producto");
  const palabrasClave = filtro.split(/\s+/).filter(Boolean); // Divide la búsqueda en palabras clave
  const resultados = [];

  if (palabrasClave.length === 0) {
    mostrarTodosProductos();
    return;
  }

  productos.forEach((producto) => {
    // Normalizar el nombre del producto
    const nombreProducto = normalizarTexto(
      producto.querySelector(".name").textContent,
    );
    let coincidencias = 0;

    palabrasClave.forEach((palabra) => {
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
  productos.forEach((producto) => {
    producto.style.display = "none"; // Oculta todos los productos inicialmente
  });

  resultados.forEach((resultado) => {
    resultado.producto.style.display = "block"; // Muestra los productos que coinciden
  });
}

// Función para filtrar productos por categoría
function filtrarCategoria(enlace) {
  const categoria = enlace.dataset.filter;
  const productos = document.querySelectorAll(".producto");

  document.querySelectorAll(".op").forEach((item) => {
    item.classList.toggle("active", item === enlace);
  });

  productos.forEach((producto) => {
    if (
      categoria === "all" ||
      producto.classList.contains(`category-${categoria}`)
    ) {
      producto.style.display = "block";
    } else {
      producto.style.display = "none";
    }
  });
}

// funcion para renderizar los filtros de categoría
function renderCategoryFilters() {
  const filtersContainer = document.getElementById("filtrosCategorias");

  if (!filtersContainer) return;

  filtersContainer.innerHTML = categoryFiltersData
    .map((categoria, index) => {
      const isActive = index === 0;
      return `
        <button
          type="button"
          class="op ${isActive ? "active" : ""}"
          data-filter="${categoria.filter}"
          aria-current="${isActive ? "page" : "false"}"
        >
          <div class="mt-2">
            <img height="50" src="${categoria.image}" alt="${categoria.name}">
          </div>
          <span class="nav-link txt fv">${categoria.name}</span>
        </button>
      `;
    })
    .join("");

  filtersContainer.querySelectorAll(".op").forEach((item) => {
    item.addEventListener("click", () => filtrarCategoria(item));
  });
}

document.addEventListener("DOMContentLoaded", renderCategoryFilters);

// Función para generar el string del QR
function generarQRString() {
  const cliente = document.getElementById("cliente").value.trim();
  const monto = document.getElementById("montoEfectivo").value || "";

  if (carrito.length === 0) {
    Swal.fire({
      title: "CARRITO VACÍO",
      text: "Tu carrito está vacío. Por favor, agrega productos.",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
    return null;
  }

  // Construir la cadena de productos
  const productosQR = carrito
    .map((producto) => `${producto.cantidad}*${producto.qr}`)
    .join(",");

  // Formato: QS1|nombre|monto|cantidad*qr,cantidad*qr,...
  const nombreCliente = cliente || "PUBLICO GENERAL";
  let qrString = `QS1|${nombreCliente}|${monto}|${productosQR}`;

  return qrString;
}

// Función para generar y mostrar el QR
function generarQR() {
  const qrString = generarQRString();

  if (!qrString) {
    return;
  }

  // Limpiar el contenedor anterior
  const qrContainer = document.getElementById("qrCodeContainer");
  qrContainer.innerHTML = "";

  // Generar el código QR
  new QRCode(qrContainer, {
    text: qrString,
    width: 300,
    height: 300,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Mostrar información
  const cliente =
    document.getElementById("cliente").value.trim() || "PUBLICO GENERAL";
  document.getElementById("qrInfo").textContent =
    `Cliente: ${cliente} | Monto: ${document.getElementById("montoEfectivo").value || "N/A"}`;

  const carritoModalElement = document.getElementById("carritoModal");
  const carritoModal =
    bootstrap.Modal.getInstance(carritoModalElement) ||
    new bootstrap.Modal(carritoModalElement);

  if (carritoModal) {
    carritoModal.hide();
  }

  const qrModalElement = document.getElementById("qrModal");
  const qrModal =
    bootstrap.Modal.getInstance(qrModalElement) ||
    new bootstrap.Modal(qrModalElement);
  qrModal.show();
}

// Función para descargar el QR
function descargarQR() {
  const qrContainer = document.getElementById("qrCodeContainer");
  const canvas = qrContainer.querySelector("canvas");

  if (canvas) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `pedido_${document.getElementById("cliente").value}_${new Date().getTime()}.png`;
    link.click();
  }
}

const boletaContador = Math.random()
  .toString(36)
  .substring(2, 10)
  .toUpperCase();
const telefonoWhatsApp = "51931993482";

// carrusel
document.addEventListener("DOMContentLoaded", function () {
  const cardCarousel = document.getElementById("cardCarousel");
  const carouselInner = cardCarousel.querySelector(".carousel-inner");

  function createCardHtml(card) {
    return `
             <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                 <img src="${card.img}" class="card-img-top" alt="${card.title}">
                 <div class="card-body">
                     <h5 class="card-title mb-2">${card.title}</h5>
                     <p class="card-text text-muted">${card.text}</p>
                 </div>
             </div>
         `;
  }
  function generateCarouselItems() {
    carouselInner.innerHTML = ""; // Limpiar carrusel existente
    let itemsPerSlide;

    if (window.innerWidth < 768) {
      itemsPerSlide = 1;
    } else if (window.innerWidth < 992) {
      itemsPerSlide = 2;
    } else {
      itemsPerSlide = 3;
    }

    for (let i = 0; i < allCardsData.length; i++) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (i === 0) {
        carouselItem.classList.add("active");
      }

      const row = document.createElement("div");
      row.classList.add("row", "justify-content-center");

      for (let j = 0; j < itemsPerSlide; j++) {
        const cardIndex = (i + j) % allCardsData.length;
        const currentCardData = allCardsData[cardIndex];

        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");

        if (j >= 1 && window.innerWidth < 768) {
          col.classList.add("d-none");
        } else if (j >= 2 && window.innerWidth < 992) {
          col.classList.add("d-none");
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

  window.addEventListener("resize", generateCarouselItems);

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(generateCarouselItems, 200);
  });
});
function aplicarConfiguracionNegocio() {
  document.documentElement.style.setProperty(
    "--header-color",
    businessConfig.headerColor,
  );
  document.documentElement.style.setProperty(
    "--action-color",
    businessConfig.headerColor,
  );

  document.title = businessConfig.name;

  document.querySelectorAll("[data-business-name]").forEach((elemento) => {
    elemento.textContent = businessConfig.name;
  });

  document.querySelectorAll("[data-business-logo]").forEach((elemento) => {
    elemento.src = businessConfig.logo;
    elemento.alt = `Logotipo de ${businessConfig.name}`;
  });

  const favicon = document.getElementById("businessFavicon");
  if (favicon) favicon.href = businessConfig.logo;
}

document.addEventListener("DOMContentLoaded", aplicarConfiguracionNegocio);
