// Constante del sistema (no cambia nunca)
const IVA = 0.21;

// Array donde guardamos productos
let productos = [];
let idAuto = 1;

function agregarProducto() {

    let nombre = prompt("Ingrese nombre del producto:");
    let precio = parseFloat(prompt("Ingrese precio del producto sin IVA:"));

    // Calculamos precio final usando la constante
    let precioFinal = precio + (precio * IVA);

    let producto = {
        id: idAuto,
        nombre: nombre,
        precio: precio,
        precioFinal: precioFinal
    };

    productos.push(producto);
    idAuto++;

    alert("Producto agregado con IVA incluido");
}

function listarProductos() {

    if (productos.length === 0) {
        alert("No hay productos cargados");
        return;
    }

    console.log("Lista de productos:");

    for (let producto of productos) {
        console.log(
            producto.id + " - " +
            producto.nombre +
            " | Precio: $" + producto.precio +
            " | Final c/IVA: $" + producto.precioFinal
        );
    }

    alert("Mira la consola para ver los productos");
}

function modificarProducto() {

    let id = parseInt(prompt("Ingrese ID del producto a modificar"));
    let producto = productos.find(p => p.id === id);

    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    let nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
    let nuevoPrecio = parseFloat(prompt("Nuevo precio sin IVA:", producto.precio));

    producto.nombre = nuevoNombre;
    producto.precio = nuevoPrecio;

    // recalculamos IVA usando la constante
    producto.precioFinal = nuevoPrecio + (nuevoPrecio * IVA);

    alert("Producto modificado correctamente");
}

agregarProducto();
listarProductos();
modificarProducto();
listarProductos();