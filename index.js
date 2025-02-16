//Creo un array de objetos, donde cada objeto es un producto con sus propiedades
let productos = [
  {
    nombre: "Agua",
    precio: 1000,
    stock: 5,
    id: 1,
  },
  {
    nombre: "Alfajor",
    precio: 1500,
    stock: 2,
    id: 2,
  },
  {
    nombre: "Gaseosa",
    precio: 1200,
    stock: 4,
    id: 3,
  },
  {
    nombre: "Vino",
    precio: 5000,
    stock: 0,
    id: 4,
  },
];

//Creo un array vacío para el carrito para poder después ir llenándolo con lo que el usuario elige.
let carrito = [];

//Creo una función que toma como parametro el array de productos y los muestra en consola.
//La función recorre el array ingresado como parámetro con un ciclo for y va imprimiendo en consola un texto para describir la propiedad con sus valor.
function mostrarProductos(productos) {
  for (let i = 0; i < productos.length; i++) {
    console.log(
      `Producto: ${productos[i].nombre}
Precio: $${productos[i].precio}
Stock: ${productos[i].stock}
ID: ${productos[i].id}`
    );
  }
}

//LLamo a la función para que se muestre la lista.
mostrarProductos(productos);

//Creo una función para elegir el producto mediante el prompt.
//Inicialicé una variable como null para que se ejecute el bucle while.
//Puse como opción para salir ingresar 0 y salir del bucle con un return.
//Luego verifico si el valor ingresado (-1 por el índice 0 del array) es mayor que el stock disponible
// de cumplirse eso, la función devuelve el número del producto elegido.

function elegirProducto() {
  let productoElegido = null;
  while (productoElegido === null) {
    const input = parseInt(
      prompt(
        "Seleccione el producto de la lista introduciendo el numero de ID del producto (o 0 para salir):"
      )
    );
    if (input === 0) {
      return 0;
    }
    if (productos[input - 1] && productos[input - 1].stock > 0) {
      productoElegido = input;
    } else {
      alert("Producto no válido o sin stock. Intente de nuevo.");
    }
  }
  return productoElegido;
}

//Creo una función para pedir la cantidad que queremos del producto elegido.
//Dentro creo un bucle while para que, a menos que la cantidad elegida sea menor que 0 o mayor que el stock disponible, devulva la cantidad elegida.

function elegirCantidad(productoElegido) {
  let cantidadElegida = parseInt(prompt("Introduzca la cantidad"));
  while (
    !(
      cantidadElegida > 0 &&
      cantidadElegida <= productos[productoElegido - 1].stock
    )
  ) {
    alert("Cantidad no válida o insuficiente stock. Intente de nuevo.");
    cantidadElegida = parseInt(prompt("Introduzca la cantidad"));
  }
  return cantidadElegida;
}

//Creo una función para actualizar el stock.
//toma como parámetros el producto elegido y la cantidad elegida para poder restarle al stock de ese producto la cantidad que se ingresó.
//Luego vuelvo a mostrar la lista de productos actualizada.

function actualizarStock(productoElegido, cantidadElegida) {
  productos[productoElegido - 1].stock -= cantidadElegida;
  console.log("Stock actualizado:");
  mostrarProductos(productos);
}

//Creo una función para actualizar el carrito.
//Creo una variable para guardar el objeto elegido previamente en ese indice
//Luego hago push de de sus propiedades nombre y precio y la cantidad elegida.

function actualizarCarrito(productoElegido, cantidadElegida) {
  const producto = productos[productoElegido - 1];
  carrito.push({
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: cantidadElegida,
  });
  console.log("Carrito actualizado:", carrito);
}

// creo una función para preguntar si se desea continuar comprando
// esto me devuelve true o false

function deseaContinuar() {
  return confirm("Desea continuar comprando?");
}

// Y la función para calcular el total donde recorro el carrito con un ciclo for y voy guardando en una variable el precio multiplicado por la cantidad.
// Devuelve el total.

function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}

//Para que se ejecute el ciclo while que va a dar inicio al simulador, declaro una variable seguirComprando como true para que se ejecute mientras esto sea cierto.

//guardo dentro de producto elegido el resultado de ejecutar la función elegirProducto.

// Como sugerimos por prompt salir del programa ingresando 0, pongo en un if que si el prducto elegido es 0 la variable seguirComprando es false y ya no se seguría ejecutando el programa.
// si no es 0 guardo en la variable cantidadElegida el resultado de ejecutar la funcion elegirCantidad con el parámetro productoElegido.
//con estas dos variables ya puedo pasar los parámetros a las funciones actualizarStock y actualizarCarrito.
//finalizo preguntando si deseo continuar y su resultado true o false se guardará en seguirComprando lo que determinará si se vuelve a ejecutar el ciclo while.

let seguirComprando = true;

while (seguirComprando) {
  let productoElegido = elegirProducto();
  if (productoElegido === 0) {
    seguirComprando = false;
  } else {
    let cantidadElegida = elegirCantidad(productoElegido);
    actualizarStock(productoElegido, cantidadElegida);
    actualizarCarrito(productoElegido, cantidadElegida);
    seguirComprando = deseaContinuar();
  }
}

//Muestro por consola el carrito y el total.

console.log("Compra finalizada. Carrito:", carrito);
console.log("Total a pagar: $" + calcularTotal());
