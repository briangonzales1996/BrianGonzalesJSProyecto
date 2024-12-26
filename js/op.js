
"use strict" 
const peticionesProductos = async ()=>{
	try{
		const response = await fetch('../productos.json')
		if(!response) throw new Error('error  en el sistemas, no se recibieron los datos')
		const listaJuegos = await response.json();	
		return listaJuegos;

	}
	catch(e){
		errorPoductos(e)	
		return[]
	}
}



//funciones
//error al cargar peticiones
const errorHTML = ()=>{
	const errorContainer = document.getElementById('error');
	const div =document.createElement('DIV');
	const figure = document.createElement('FIGURE');
	const img = document.createElement('IMG');
	const titulo = document.createElement('H1');
	const p = document.createElement('P');

	div.classList.add('error__container');
	img.setAttribute('src','./assets/error.png');
	img.setAttribute('alt','error del sistema');
	titulo.textContent='ERROR AL ENCONTRAR LOS DATOS!';
	p.textContent='No se puede acceder a la pagina, espere que se solucione el problema e intentelo mas tarde';

	figure.appendChild(img);
	div.appendChild(figure);
	div.appendChild(titulo);
	div.appendChild(p);
	errorContainer.appendChild(div);
}

function errorPoductos (error){	
	errorHTML();
	const lista = document.getElementById('lista')
	const filtro = document.querySelector('.filtros');
	filtro.style.display='none';
	lista.style.display = 'none';
}


//despliegue del filtrado
function subMenu(){
    const filtro = document.querySelectorAll(".subMenu");
    filtro.forEach((elemento)=>{
        elemento.addEventListener('click',(e)=>{
            let height = 0;
            if(elemento.nextElementSibling.clientHeight === 0){
                height = elemento.nextElementSibling.scrollHeight;
            }
            elemento.nextElementSibling.style.height = `${height}px`;
            elemento.lastElementChild.classList.toggle("flecha");            
        })
    })
}

const desplegarFiltro = ()=>{
    const ocultarMenu = document.getElementById('desplegar__menu');
    const left = document.getElementById('filtros')||"";
	//verifica si existe elemento del doom
	if(left)left.style.left = 0;
    if(ocultarMenu)ocultarMenu.addEventListener('click',()=>{
        left.style.left == "0px" ? left.style.left = `${-700}px` : left.style.left = `${0}px`;
    })
}

//filtrar lista de productos
const crearListaHTML=({nombre = "",genero="",precio="",imagenURL=""},fragmento)=>{
    const lista = document.getElementById('lista');
	if(lista)lista.innerHTML="";
	const productos = document.createElement('ARTICLE');
    const figure =document.createElement('FIGURE');
    const img = document.createElement('IMG');
    const p1 = document.createElement('P');
    const a = document.createElement('A');
    const p2 = document.createElement('P');
    const p3 = document.createElement('P');
    const span = document.createElement('SPAN');
	//agregando atributos y clases
    productos.classList.add('lista__productos__item');
    img.setAttribute('src',imagenURL);
    a.setAttribute('href','#');
    p1.innerHTML = genero.toUpperCase();
    a.innerHTML=nombre;
    p3.textContent='Desde ';
    span.innerHTML = precio;
	//agregar elementos a las equitequetas
    figure.appendChild(img);
    p2.appendChild(a);
    p3.appendChild(span);
    productos.appendChild(figure);
    productos.appendChild(p1);
    productos.appendChild(p2);
    productos.appendChild(p3);
    fragmento.appendChild(productos);
    return fragmento    
}




//agregar elementos al HTML
const agregarListaHTML=async (lista = [])=>{
    let fragmento = document.createDocumentFragment();
    lista = await lista
	
	lista.forEach((item)=>{
        fragmento=crearListaHTML(item,fragmento);
    })
    if(document.getElementById('lista'))document.getElementById('lista').appendChild(fragmento);
}

const filtrado = (filtro='',tipo='')=>{
    if(filtro)filtro.addEventListener('click',e=>eventoClick(e,tipo));
	
}

 function agregandoListaFiltrada (listaFiltrada=[]){
	//comprobamos lista vacia
	
	if(listaFiltrada.length !== 0 ){
		const lista = document.getElementById('lista');
		lista.innerHTML="";
	}
	agregarListaHTML(listaFiltrada);
	//eliminarEstilos();
}

const eventoClick = async function  (e,tipo){
    const verificar = e.target.textContent.toLowerCase().replace(/\s+/g, '');
	const lista = await listaJuegos;
	const plataforma = document.getElementById('filtros__plataforma');
	const genero = document.getElementById('filtros__genero');
    const listaFiltrada=lista.filter(item=>{
        return item[tipo].toLowerCase() === verificar;
    });
	
	
	if(listaFiltrada.length === document.querySelectorAll('.lista__productos__item').length){
		
		agregarListaHTML(lista)
		eliminarEstilos(plataforma)
		eliminarEstilos(genero)
		
	}
	else{
		agregandoListaFiltrada(listaFiltrada);
		estiloFiltro(verificar,e,obetenerSubMenu(plataforma),plataforma,genero)
		estiloFiltro(verificar,e,obetenerSubMenu(genero),plataforma,genero)
	} 
	
	
}

const obetenerSubMenu = (subMenu)=>{
	const subMenuArray = [];
	[...subMenu.children].forEach((item)=>{
		subMenuArray.push(item.textContent.toLowerCase().replace(/\s+/g, ''))
	})
	return subMenuArray
}


const eliminarEstilos=(tipo)=>{
	
	[...tipo.children].forEach(nodo=>{
		nodo.style.color='inherit';
	})
	
}

const estiloFiltro =(verificar,seleccion,subMenu,plataforma,genero)=>{
	subMenu.forEach((item)=>{
		if(verificar === item){
			eliminarEstilos(plataforma);
			eliminarEstilos(genero)
			seleccion.target.style.color='red';
			
		}
	})
}



//barra busqueda funciones
const buscador = ()=>{
	const buscar = document.getElementById('buscar');
	const resultados = document.getElementById('buscador');
	if(buscar)buscar.addEventListener("click",()=>{		
		busquedaComprobar(resultados.value)
		resultados.value="";
		modificarFondo('transparent')
		document.getElementById('productosRelacionados').innerHTML="";
		productosRelacionados.style.borderTop = `none`;
		
	})
}

const busquedaComprobar = async (buscar='')=>{
	let productoEncotrado = [];
	const lista =  await listaJuegos;
	for(let juego in lista){
	let nombreJuego = lista[juego].nombre.toLowerCase();
	if(nombreJuego.includes(buscar))productoEncotrado.push(lista[juego])
	}
	agregarListaHTML(productoEncotrado);
}

//buscador productos relacionados en el buscador
function buscadorAgregarHTMLRelacionado(producto={}){
	const contenedorRelacionado = document.getElementById('productosRelacionados');
	contenedorRelacionado.classList.add('menu__buscador__relacionado');
	const p = document.createElement('P');
	p.textContent=(producto.nombre).toLowerCase();
	contenedorRelacionado.appendChild(p);
	seleccionarResultado(p,producto);
}


const elementosResultado = async (buscarProducto="")=>{
	const lista = await listaJuegos
	const resultados = lista.filter((juego)=>{
		return juego.nombre.toLowerCase().startsWith(buscarProducto.value.toLowerCase())
	});
	if(resultados.length===0){
		document.getElementById('productosRelacionados').style.borderTop = `none`;
		modificarFondo("transparent")
	}
	document.getElementById('productosRelacionados').innerHTML="";
	resultados.forEach(producto=>{
		document.getElementById('productosRelacionados').style.borderTop = `solid ${1}px rgba(${255},${255},${255},${0.168})`
		buscadorAgregarHTMLRelacionado(producto);
	})
	
}

const buscadorProductosRelacionadosTeclado = ()=>{
	const buscarProducto = document.getElementById('buscador');
		if(buscarProducto)buscarProducto.addEventListener('input',(e)=>{
			modificarFondo("#222229")
			buscarProducto.value!==""?
			elementosResultado(buscarProducto):
			agregarBorde();
			
		})
	
function agregarBorde(){
	const productosRelacionados = document.getElementById('productosRelacionados');
	productosRelacionados.innerHTML="";
	productosRelacionados.style.borderTop = `none`;
	modificarFondo('transparent')
}
}

function modificarFondo(visible){
	const borderRadio = document.querySelector('.menu__buscador');
	borderRadio.style.backgroundColor= visible;
}


//seleccionar elemento relacionado
const seleccionarResultado=(p="",producto={})=>{
	p.addEventListener('click',()=>{
		let fragmento = document.createDocumentFragment();
		fragmento = crearListaHTML(producto,fragmento);
		document.getElementById('lista').appendChild(fragmento);
		document.getElementById('productosRelacionados').innerHTML="";
		document.getElementById('buscador').value = "";
		productosRelacionados.style.borderTop = `none`
		modificarFondo('transparent')
	})
}


//seleccion del elemento para el carrito
const seleccionarProductoLista  = async ()=>{
		let seleccion=[];
		if(localStorage.getItem("producto"))seleccion = obtenerStorage("producto")
		if(document.getElementById('lista'))document.getElementById('lista').addEventListener("click",async (e)=>{
			seleccion =obtencionProductoClick(e,seleccion)
			
			carritoSuperiorHTML(seleccion.length);
			comprobarCarritoDisplay('block')
			const productosSeleccionados = await verificarElementoSeleccionado(seleccion);
			sumarPrecios(productosSeleccionados)////////////////////////////////
		})
}

export const obtenerStorage = (llave)=>{
	let seleccion = [];
	seleccion = localStorage.getItem(llave);
	seleccion = JSON.parse(seleccion);
	return seleccion
}

//buscamoss el elemento padre y seleccionar el div nombre
const obtencionProductoClick=(evento,seleccion)=>{
	let mostrar ="";
			evento.target.id === evento.target.parentElement.parentElement.id? 
			mostrar= evento.target.parentElement.parentElement:	
			mostrar = evento.target.parentElement;
			//console.log(mostrar.childNodes)
			mostrar = mostrar.childNodes[2].textContent.toLowerCase()
			if(mostrar.length !== 5){
				seleccion.push(mostrar)
				localStorage.setItem("producto",JSON.stringify(seleccion))
				libreriaAgregadoPoducto(mostrar);
				
			};
			
			return seleccion
}


//cantidad de productos añadidos parte superior
const carritoSuperiorHTML = (cantidad=0)=>{
	const span = document.getElementById('carritoSuperior')||"";
	if(span){
		span.innerHTML= cantidad;
		span.style.animation = `carrito ${.6}s ease both`;
		setTimeout(()=>{
			span.style.animation = `none`;
		},100)
	}
} 

const eliminarSpan =()=>{
	const span = document.getElementById('spanCarrito');
//mirar span condicion
	if(span)span.parentElement.removeChild(span);
}

const comprobarCarritoDisplay=(display)=>{
	const carritoComprobar = document.getElementById('carritoSuperior');
	carritoComprobar.style.display=display; 
}

const carritoSuperior=()=>{
	const carritoComprobar = document.getElementById('carritoSuperior');
	let productoAgregados = obtenerStorage("producto") || [];
	productoAgregados = productoAgregados.length
	productoAgregados!==0?carritoSuperiorHTML(productoAgregados): eliminarSpan()
	if(productoAgregados === 0 && carritoComprobar)comprobarCarritoDisplay('none');
}


//Modificando precio total del carrito superior
const verificarElementoSeleccionado = async (seleccion)=>{
	let  productoVerificados = [];
	const lista = await listaJuegos
	seleccion = localStorage.getItem("producto");
	seleccion= JSON.parse(seleccion)||[]
	seleccion.forEach(producto => {
		const productoEncontrado = lista.filter((item)=>{
			return item.nombre.toLowerCase() === producto;
		});		
		productoVerificados = [...productoVerificados,...productoEncontrado];
	});
	return productoVerificados;
}


const agregandoStorage =(precioTotal=0)=>{
	localStorage.setItem("precio",precioTotal);
}
const sumarPreciosHTML=(precio)=>{
	const contenedor = document.getElementById('carritoSuperiorTotal')
	if(contenedor)contenedor.innerHTML = (precio+".000");
}

const sumarPrecios = (productoSeleccion=[])=>{
	let precioTotal = 0;
	productoSeleccion.forEach(item=>{
		precioTotal+= parseInt(item.precio);
	})
	sumarPreciosHTML(precioTotal);
	agregandoStorage(precioTotal);
}

//verificamos  precio en el storage
const verificarStoragePrecio=()=>{
	if(localStorage.getItem('precio')){
		let precioTotal = obtenerStorage('precio');
		
		sumarPreciosHTML(precioTotal)
	}
}

//libreria toastify
const libreriaAgregadoPoducto =(nombre)=>{
	Toastify({
		text: `Se agrego correctamente ${nombre}`,
		duration: 1500
		}).showToast();
}




//INICIO DEL PROGRAMA
const listaJuegos = peticionesProductos()

if(localStorage.getItem("producto") && document.getElementById('carritoSuperior'))comprobarCarritoDisplay('block');
subMenu();
desplegarFiltro();
agregarListaHTML(listaJuegos); //cagando al doom la lista del objeto
filtrado(document.getElementById('filtros__plataforma'),"plataforma");
filtrado(document.getElementById('filtros__genero'),'genero');
buscador();
buscadorProductosRelacionadosTeclado();

if(localStorage.getItem("producto"))carritoSuperior();
seleccionarProductoLista();
verificarStoragePrecio()


