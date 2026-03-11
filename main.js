// ===============================
// CONSTANTE DEL SISTEMA
// ===============================

// clave que usaremos para guardar los productos en localStorage
const STORAGE_KEY = "productos";


// ===============================
// ARRAY PRINCIPAL
// ===============================

let productos = [];


// ===============================
// FUNCION CONSTRUCTORA
// ===============================

function Producto(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
}


// ===============================
// CARGAR PRODUCTOS DEL STORAGE
// ===============================

function cargarProductos() {

    let datosGuardados = localStorage.getItem(STORAGE_KEY);

    if (datosGuardados) {
        productos = JSON.parse(datosGuardados);
    }

}


// ===============================
// GUARDAR PRODUCTOS EN STORAGE
// ===============================

function guardarProductos() {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));

}


// ===============================
// MOSTRAR PRODUCTOS EN EL DOM
// ===============================

function mostrarProductos() {

    let lista = document.getElementById("listaProductos");

    // limpiamos la lista antes de volver a dibujarla
    lista.innerHTML = "";

    // función de orden superior
    productos.forEach(function(producto) {

        let li = document.createElement("li");

        li.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        <button class="editar" data-id="${producto.id}">Editar</button>
        `;

        lista.appendChild(li);

    });

}


// ===============================
// AGREGAR PRODUCTO
// ===============================

function agregarProducto() {

    let nombreInput = document.getElementById("nombre");
    let precioInput = document.getElementById("precio");

    let nombre = nombreInput.value;
    let precio = precioInput.value;

    // creamos nuevo producto usando la función constructora
    let nuevoProducto = new Producto(
        Date.now(),
        nombre,
        precio
    );

    productos.push(nuevoProducto);

    guardarProductos();
    mostrarProductos();

    // limpiamos inputs
    nombreInput.value = "";
    precioInput.value = "";

}


// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarProducto(id) {

    // función de orden superior
    productos = productos.filter(function(producto) {
        return producto.id != id;
    });

    guardarProductos();
    mostrarProductos();

}


// ===============================
// EDITAR PRODUCTO
// ===============================

function editarProducto(id) {

    let producto = productos.find(function(p) {
        return p.id == id;
    });

    let nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
    let nuevoPrecio = prompt("Nuevo precio:", producto.precio);

    producto.nombre = nuevoNombre;
    producto.precio = nuevoPrecio;

    guardarProductos();
    mostrarProductos();

}


// ===============================
// EVENTO BOTON AGREGAR
// ===============================

document.getElementById("agregar").addEventListener("click", agregarProducto);


// ===============================
// EVENTOS DE LOS BOTONES EDITAR / ELIMINAR
// ===============================

document.addEventListener("click", function(e) {

    if (e.target.classList.contains("eliminar")) {

        let id = e.target.dataset.id;
        eliminarProducto(id);

    }

    if (e.target.classList.contains("editar")) {

        let id = e.target.dataset.id;
        editarProducto(id);

    }

});


// ===============================
// INICIAR APP
// ===============================

cargarProductos();
mostrarProductos();