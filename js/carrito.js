import { obtenerStorage } from "./op.js";

const peticionesProductos = async ()=>{
	try{
		const response = await fetch('../productos.json')
		if(!response) throw new Error('error  en el sistemas, no se recibieron los datos')
		const listaJuegos = await response.json();	
		return listaJuegos;
	}
	catch(e){
		console.log(e)
		return[]
	}
}

const variablesGlobales = {
    producto : [],
    listaParaAgregar:[]
}

const listaJuegos = peticionesProductos() || [];
variablesGlobales.producto = localStorage.getItem("producto");
variablesGlobales.producto= JSON.parse(variablesGlobales.producto)||[]

//FUNCIONES
//verifico los listaJuegoscon con lo obtenido del local storage
export const verificarElemento = async ()=>{
    let  productoVerificados = [];
    const lista = await listaJuegos
    variablesGlobales.producto = localStorage.getItem("producto");
    variablesGlobales.producto= JSON.parse(variablesGlobales.producto)||[]
    variablesGlobales.producto.forEach(producto => {
        const productoEncontrado = lista.filter((item)=>{
            
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

//añadir carrito agregar o quitar producto
function botonesAumentarProducto (){
    const contenedor = document.createElement('DIV');
    const boton1 = document.createElement('BUTTON');
    const boton2 =document.createElement('BUTTON');
    const p = document.createElement('P');

    contenedor.classList.add('carrito__productos__cantidad');
    boton1.textContent='Añadir';
    boton2.textContent='Quitar';
    p.textContent = '1';
    boton1.setAttribute('id','botonAñadir');
    boton2.setAttribute('id','botonQuietar')

    contenedor.appendChild(boton1);
    contenedor.appendChild(p);
    contenedor.appendChild(boton2);

    quitarAñadirProducto(boton1,añadirProducto);
    quitarAñadirProducto(boton2,quitarProducto);
    return contenedor;
}

//agregar al carrito los productos seleccionados o filtrados

const agregandoProductoCarrito=({nombre="",precio="",imagenURL="",id=0},fragmento="")=>{
    
    const article = document.createElement('ARTICLE');
    const div1 = document.createElement('DIV');
    const pDiv1 = document.createElement('P');
    const figure = document.createElement('FIGURE');
    const imagen = document.createElement('IMG');
    const div2 = document.createElement('DIV');
    const pDiv2 = document.createElement('P');
    const div3 = document.createElement('DIV');
    const pDiv3 = document.createElement('P');

    article.setAttribute("data-id",id);
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

    const botones = botonesAumentarProducto();
    article.appendChild(botones);
    fragmento.appendChild(article);
}

const añadirFragmento = (productos)=>{
    const contenedor = document.getElementById('carritoProductos');
    const fragmento = document.createDocumentFragment();
    const contenedoProductos = document.createElement('DIV');
    productos.forEach((item)=>{
        parseInt(item.cantidad)===0
        ?agregandoProductoCarrito(item,fragmento)
        :modificarCantidadProductos(item);
        item.cantidad++
    })
    contenedoProductos.appendChild(fragmento);
    contenedor.appendChild(contenedoProductos)
    contenedoProductos.classList.add('carrito__contenedor-productos');
    actualizarCantidadProductos(productos);
    
}
///////////////////////////////////////////
  function modificarCantidadProductos (producto){
        
}

const actualizarCantidadProductos =(productosLista)=>{
    const productoContenedor = document.querySelector('.carrito__contenedor-productos')
    const children = productoContenedor.children;
    [...children].forEach(item=>{
        const cantidad =  productosLista.find(producto=>{
            return (producto.id == item.dataset.id)
        })
        item.lastElementChild.firstElementChild.nextElementSibling.textContent = cantidad.cantidad
    })
}

//para simplificar la funcion para el operador
const verificarAñadir = async () =>{
    const carritoVacio = document.getElementById('carritoVacio')||"";
    carritoVacio.style.display="none";
    variablesGlobales.listaParaAgregar = await verificarElemento()||[];
    console.log(variablesGlobales.listaParaAgregar)
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
const precioModificado = async (e)=>{
        const total =  await precioTotal();
        
        agregarTotalHTML(total);
        modificarPrecioStorage(total)
}

//eliminamos producto del storage
const eliminarStorage =(e)=>{
    const nombreProducto = e.target.parentElement.parentElement.childNodes[2].textContent.toLowerCase()||"";
    let listaCarrito = JSON.parse(localStorage.getItem("producto")) ||[];
    listaCarrito = listaCarrito.filter(item=>{
            return item!== nombreProducto 
    })
    localStorage.setItem("producto",JSON.stringify(listaCarrito));
    if(listaCarrito.length === 0)carritoVacio();
    eliminarProductoHTML(e);
    precioModificado(e);
}

//calculando precio total y agregado html
const agregarTotalHTML = async (sumarProductos=0)=>{
    sumarProductos = await sumarProductos;
    
    //localStorage.setItem("precioTotal",sumarProductos);
    const total = document.getElementById('total');
    total.innerHTML = sumarProductos + ".000 ARS"; 
    
}
const precioTotal = async ()=>{
    let sumarProductos = 0;
    const listaStorage =  await verificarElemento();
    listaStorage.forEach((producto)=>{
        sumarProductos += parseInt(producto.precio); 
    })
    return sumarProductos;
}



// modificar cantidad añadir y quitar.. producto
const modificarPrecioStorage =(precio)=>{
    localStorage.setItem('precio',precio)
}

const  agregarStorage = (key,valor)=>{
    let storage = JSON.stringify(valor);
    localStorage.setItem(key,storage);
    return storage;
}

const sumarCantidad =(cantidad)=>{
    cantidad++;
    return cantidad;
}
const restarCantidad =(cantidad)=>{
    cantidad--;
    return cantidad;
}

const modificarCantidadTexto = (boton='',operacion)=>{
    boton = boton.parentElement.children[1];
    let cantidad = parseInt(boton.textContent);
    cantidad = operacion(cantidad);
    boton.textContent = cantidad;
    return cantidad;
    
}

const modificarPrecioTotalTexto= async (boton='',cantidad)=>{
    const total = await precioTotal();
    const botonPrecioTotal = boton.closest(".carrito").children[2].lastElementChild;
    botonPrecioTotal.textContent = total +".000 ARS";
    agregarStorage('precio',total);
    if(cantidad==0)cantidadNulaEliminar(boton);
    if(0 === parseInt(total))carritoVacio();
}

const moodificarContenidoHTML = (productoStorage,botonNodo,operacion)=>{
    agregarStorage('producto',productoStorage);
    let cantidad = modificarCantidadTexto(botonNodo,operacion);
    modificarPrecioTotalTexto(botonNodo,cantidad);
    
}

//añadir producto de la lista
const añadirProducto =(boton,productoStorage,botonId)=>{
    productoStorage.push(botonId.toLowerCase());
    moodificarContenidoHTML(productoStorage,boton,sumarCantidad)
}

//quitar producto de la  lista
function quitarProducto (botonQuitar,productoStorage,botonId){
    const posicion = productoStorage.indexOf(botonId.toLowerCase());
    productoStorage.splice(posicion,1);
    moodificarContenidoHTML(productoStorage,botonQuitar,restarCantidad);
    
}

function quitarAñadirProducto (botonSeleccionado,funcion){
    botonSeleccionado.addEventListener('click',(e)=>{
    const productoStorage = obtenerStorage('producto');     
    const botonId= botonSeleccionado.closest('[data-id]').childNodes[2].textContent;
        funcion(botonSeleccionado,productoStorage,botonId);
    })

}

const cantidadNulaEliminar = (boton='')=>{
    boton = boton.closest('[data-id]');
    boton.parentElement.removeChild(boton)
} 


//INICIO DEL PROGRAMA
variablesGlobales.producto.length === 0?
carritoVacio():verificarAñadir();
eliminarProducto();
agregarTotalHTML(precioTotal());

