import { mandarObjeto} from "./op.js";
const variablesGlobales = {
    producto : [],
    listaJuegos:[],
    listaParaAgregar:[]
}
variablesGlobales.listaJuegos = mandarObjeto()||[] 
variablesGlobales.producto = localStorage.getItem("producto");
variablesGlobales.producto= JSON.parse(variablesGlobales.producto)||[];

//FUNCIONES
//verifico los listaJuegoscon con lo obtenido del local storage
const verificarElemento =()=>{
    let  productoVerificados = [];
    variablesGlobales.producto.forEach(producto => {
        const productoEncontrado = variablesGlobales.listaJuegos.filter((item)=>{
            return item.nombre.toLowerCase() === producto;
        });
        productoVerificados = [...productoVerificados,...productoEncontrado];
        
    });
    return productoVerificados;
}

const carritoVacio=()=>{
    console.log("carrito esa vacio")
    
}
//agregar al carrito los productos seleccionados o filtrados
const agregandoProductoCarrito=({nombre="",precio="",imagenURL=""},fragmento="")=>{
    
    const article = document.createElement('ARTICLE');
    const div1 = document.createElement('DIV');
    const pDiv1 = document.createElement('P');
    const figure = document.createElement('FIGURE');
    const imagen = document.createElement('IMG');
    const div2 = document.createElement('DIV');
    const pDiv2 = document.createElement('P');
    const div3 = document.createElement('DIV');
    const pDiv3 = document.createElement('P');

    
    pDiv1.textContent='X';
    imagen.setAttribute('src',imagenURL);
    imagen.setAttribute('alt',nombre);
    pDiv2.textContent=nombre;
    pDiv3.textContent = precio + " ARS";
    div1.appendChild(pDiv1);
    figure.appendChild(imagen);
    div2.appendChild(pDiv2);
    div3.appendChild(pDiv3);
    article.appendChild(div1);
    article.appendChild(figure);
    article.appendChild(div2);
    article.appendChild(div3);
    fragmento.appendChild(article);
}
const añadirFragmento = (productos)=>{
    const contenedor = document.getElementById('carritoProductos');
    const fragmento = document.createDocumentFragment();
    const contenedoProductos = document.createElement('DIV');
    productos.forEach((item)=>{
        agregandoProductoCarrito(item,fragmento);
    })
    contenedoProductos.appendChild(fragmento);
    contenedor.appendChild(contenedoProductos)
    contenedoProductos.classList.add('carrito__contenedor-productos');
}
//para simplificar la funcion para el operador
const verificarAñadir = () =>{
    variablesGlobales.listaParaAgregar = verificarElemento()||[];
    añadirFragmento(variablesGlobales.listaParaAgregar)
}

console.log(verificarElemento())


//INICIO DEL PROGRAMA
variablesGlobales.producto.length === 0?
carritoVacio():verificarAñadir();

