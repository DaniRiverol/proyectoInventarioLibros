const titulo = document.querySelector("#titulo"),
  autor = document.querySelector("#autor"),
  isbn = document.querySelector("#isbn"),
  categoria = document.querySelector("#categoria"),
  precio = document.querySelector("#precio"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  btnGuardar = document.querySelector("#btnGuardar");
const radios = document.querySelectorAll('input[type="radio"]');
console.log(radios);
const inventario = [
  {
    titulo: "cuentos completos",
    autor: "edgard alan poe",
    isbn: "9788491052166",
    categoria: "cuento",
    precio: 2500.99,
    img: "http://boutiquedezothique.es/793-large_default/cuentos-completos-edgar-allan-poe.jpg",
  },
  {
    titulo: "quien paga pierde",
    autor: "stephen king",
    isbn: "9789506443924",
    categoria: "terror",
    precio: 1800.99,
    img: "http://d2r9epyceweg5n.cloudfront.net/stores/001/421/275/products/king_quienpierdepaga_libro3d1-186af08b4fbf47f81116071041288636-640-0.png",
  },
];

//Constructor
function Libro(titulo, autor, isbn, categoria, precio, img) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.categoria = categoria;
  this.precio = parseFloat(precio);
  if (precio == "") {
    this.precio = 0;
  } else {
    this.precio = precio;
  }
  if (img == "") {
    this.img = `https://via.placeholder.com/150`;
  } else {
    this.img = img;
  }
}

//Crear libro
function crearLibro(titulo, autor, isbn, categoria, precio, img) {
  return new Libro(titulo, autor, isbn, categoria, precio, img);
}

//Cargar al array
function cargarInventario(arr, prod) {
  return arr.push(prod);
}

//Funciones de filtrado
function filtrarPorNombre(arr, filtro) {
  return arr.filter((el) => {
    return el.titulo.includes(filtro);
  });
}
function filtrarPorPrecio(arr, filtro) {
  return arr.filter((el) => {
    return el.precio <= filtro;
  });
}
function filtrarPorISBN(arr, filtro) {
  return arr.filter((el) => {
    return el.isbn == filtro;
  });
}
//funcion genérica
function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    return el[`${param}`].includes(filtro);
  });
}

//console.log(filtrar(inventario, "24", "isbn"));
//Manipular el DOM
function crearHtml(arr) {
  let html = "";
  for (const item of arr) {
    html = `<tr>
  <td>${item.titulo}</td>
  <td>${item.autor}</td>
  <td>${item.isbn}</td>
  <td>${item.categoria}</td>
  <td>${item.precio}</td>
  <td><img src="${item.img}"/></td>
  </tr>`;
    tbody.innerHTML += html;
  }
}
function limpiarCampos() {
  titulo.value = "";
  autor.value = "";
  isbn.value = "";
  categoria.value = "";
  precio.value = "";
  img.value = "";
}

crearHtml(inventario);
//Listeners
btnGuardar.addEventListener("click", () => {
  const nuevoLibro = crearLibro(
    titulo.value,
    autor.value,
    isbn.value,
    categoria.value,
    precio.value,
    img.value
  );
  cargarInventario(inventario, nuevoLibro);
  limpiarCampos();
  tbody.innerHTML = "";
  crearHtml(inventario);
});


search.addEventListener("input", () => {
  let nuevoFiltro = filtrar(inventario, search.value, "titulo");
  tbody.innerHTML = "";
  crearHtml(nuevoFiltro);
});

for (const radio of radios) {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(inventario, search.value, radio.value);
        tbody.innerHTML = "";
        crearHtml(nuevoFiltro);
      });
    }
  });
}
