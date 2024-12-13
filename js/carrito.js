import { mandarObjeto} from "./op.js";
const variablesGlobales = {
    producto : [],
    listaJuegos:[],
    listaParaAgregar:[]
}
variablesGlobales.listaJuegos = mandarObjeto()||[] 
variablesGlobales.producto = localStorage.getItem("producto");
variablesGlobales.producto= JSON.parse(variablesGlobales.producto)||[]

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
    const carritoVacio = document.getElementById('carritoVacio');
    const finalizar = document.getElementById('finalizar');
    const precioTotal = document.getElementById('precioTotal');
    carritoVacio.style.display="flex";
    finalizar.style.display="none";
    precioTotal.style.display="none";
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
    const carritoVacio = document.getElementById('carritoVacio')||"";
    carritoVacio.style.display="none";
    variablesGlobales.listaParaAgregar = verificarElemento()||[];
    añadirFragmento(variablesGlobales.listaParaAgregar)
    
}

//eliminar producto de la lista
const eliminarProducto = ()=>{
    const seleccionar = document.getElementById('carritoProductos');
    seleccionar.addEventListener('click',(e)=>{
        const validar = e.target.textContent.toLowerCase() || "";
        
        if(validar === "x") eliminarStorage(e)
    })
}

function eliminarProductoHTML(e){
    const productoSeleccionado = e.target.parentElement.parentElement;
    if(productoSeleccionado.tagName ==="ARTICLE")productoSeleccionado.parentElement.removeChild(productoSeleccionado)
    
}

//modificarPrecioEliminado
const precioModificado =(e)=>{
        const total = precioTotal();
        agregarTotalHTML(total);
}

//eliminamos producto del storage
const eliminarStorage =(e)=>{

    const nombreProducto = e.target.parentElement.parentElement.childNodes[2].textContent.toLowerCase()||"";
    let listaCarrito = JSON.parse(localStorage.getItem("producto")) ||[];
    let condicion = true; 
    listaCarrito = listaCarrito.filter(item=>{
        if(item!==nombreProducto||condicion === false){
            return item!== nombreProducto ||condicion===false
        }condicion=false;//productos iguales
    })
    localStorage.setItem("producto",JSON.stringify(listaCarrito));
    if(listaCarrito.length === 0)carritoVacio();
    eliminarProductoHTML(e);
    precioModificado(e);
}

//calculando precio total y agregado html
const agregarTotalHTML =(sumarProductos=0)=>{
    const total = document.getElementById('total');
    total.innerHTML = sumarProductos + ".000 ARS"; 
}
const precioTotal =()=>{
    let sumarProductos = 0;
    variablesGlobales.producto = localStorage.getItem("producto");
    variablesGlobales.producto= JSON.parse(variablesGlobales.producto)||[]
    const listaStorage = verificarElemento();
    listaStorage.forEach((producto)=>{
        sumarProductos += parseInt(producto.precio); 
    })
    return sumarProductos;
}



console.log(verificarElemento())



//INICIO DEL PROGRAMA
variablesGlobales.producto.length === 0?
carritoVacio():verificarAñadir();
eliminarProducto();
agregarTotalHTML(precioTotal());

