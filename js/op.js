
"use strict" 
//variables u objetos
const listaJuegos =[{	
	"nombre":"Silent Hill 2",
	"id":1,
	"genero":"horror",
	"precio": "30.000",
	"plataforma":"ps5",
	"imagenURL": "./assets/silent-hill-2-ps5-245x300.jpg"
},
{
	"nombre":"Alan Wake",
	"id":2,
	"genero":"horror",
	"precio": "15.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/alan-wake-remastered-245x300.jpg"
 },
{
	"nombre":"Combo accion",
	"id":3,
	"genero":"accion",
	"precio": "10.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/Combo-accion-A-1-245x300.jpg"
 },
{
	"nombre":"Crash bandicoot",
	"id":4,
	"genero":"accion",
	"precio": "4.000",
	"plataforma":"ps3",
	"imagenURL": "./assets/crash-bandicoot-245x300.jpg"
 },
{
	"nombre":"Cyberpuck",
	"id":5,
	"genero":"aventura",
	"precio": "15.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/cyberpunk-2077-245x300.jpg"
 },
{
	"nombre":"Dragon ball Sparking Zero",
	"id":6,
	"genero":"lucha",
	"precio": "35.000",
	"plataforma":"ps5",
	"imagenURL": "./assets/dragon-ball-sparking-zero-ps5-245x300.jpg"
 },
{
	"nombre":"Dragon ball kakarot",
	"id":7,
	"genero":"lucha",
	"precio": "10.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/dragon-ball-z-kakarot-1-245x300.jpg"
 },
{
	"nombre":"Elden Ring",
	"id":8,
	"genero":"aventura",
	"precio": "17.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/elden-ring-245x300.jpg"
 },
{
	"nombre":"Fallout 4",
	"id":9,
	"genero":"aventura",
	"precio": "16.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/fallout-4-4-245x300.jpg"
 },
{
	"nombre":"God of War Asencion",
	"id":10,
	"genero":"accion",
	"precio": "8.000",
	"plataforma":"ps3",
	"imagenURL": "./assets/god-of-war-ascension-1-245x300.jpg"
 },
{
	"nombre":"God of War Ragnarok",
	"id":11,
	"genero":"accion",
	"precio": "30.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/god-of-war-ragnarok-245x300.jpg"
 },
{
	"nombre":"GTA San Andreas",
	"id":12,
	"genero":"realista",
	"precio": "2.000",
	"plataforma":"ps3",
	"imagenURL": "./assets/gta-san-andreas-1-245x300.jpg"
 },
{
	"nombre":"Hogwarts legacy",
	"id":13,
	"genero":"aventura",
	"precio": "30.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/hogwarts-legacy-245x300.jpg"
 },
{
	"nombre":"Spider Man 2",
	"id":14,
	"genero":"accion",
	"precio": "36.000",
	"plataforma":"ps5",
	"imagenURL": "./assets/Marvel-Spiderman-2-245x300.jpg"
 },
{
	"nombre":"Combo superheroes",
	"id":15,
	"genero":"accion",
	"precio": "15.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/oferta-combo-super-heroes-245x300.jpg"
 },
{
	"nombre":"Combo terror",
	"id":16,
	"genero":"HORROR",
	"precio": "19.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/oferta-combo-terror-245x300.jpg"
 },
{
	"nombre":"Resident evil 4",
	"id":17,
	"genero":"supervivencia",
	"precio": "24.000",
	"plataforma":"ps4",
	"imagenURL": "./assets/resident-evil-4-remake-245x300.jpg"
 },
{
	"nombre":"Resident evil 6",
	"id":18,
	"genero":"supervivencia",
	"precio": "6.000",
	"plataforma":"ps3",
	"imagenURL": "./assets/resident-evil-6-ultimate-edition-1-245x300.jpg"
 },
{
	"nombre":"The last of us",
	"id":19,
	"genero":"supervivencia",
	"precio": "5.000",
	"plataforma":"ps3",
	"imagenURL": "./assets/the-last-of-us-1-245x300.jpg"
 },
{
	"nombre":"Dead Space",
	"id":20,
	"genero":"horror",
	"precio": "10.000",
	"plataforma":"ps5",
	"imagenURL": "./assets/dead-space-ps5-245x300.jpg"
 }
]



//funciones

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
    const left = document.getElementById('filtros');
    left.style.left = 0;
    ocultarMenu.addEventListener('click',()=>{
        left.style.left == "0px" ? left.style.left = `${-400}px` : left.style.left = `${0}px`;
    })
}

const crearListaHTML=({nombre = "",genero="",precio="",imagenURL=""},fragmento)=>{
    const lista = document.getElementById('lista');
	lista.innerHTML="";
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
const agregarListaHTML=(lista = [])=>{
    let fragmento = document.createDocumentFragment();
    lista.forEach((item)=>{
        fragmento=crearListaHTML(item,fragmento);
    })
    document.getElementById('lista').appendChild(fragmento);
}

const filtrado = (filtro,tipo)=>{
    filtro.addEventListener('click',e=>eventoClick(e,tipo));
	
}

function agregandoListaFiltrada(listaFiltrada){
	//comprobamos lista vacia
	if(listaFiltrada.length !== 0 ){
		const lista = document.getElementById('lista');
		lista.innerHTML="";
	}
	agregarListaHTML(listaFiltrada);
}

const eventoClick = function (e,tipo){
    const verificar = e.target.textContent.toLowerCase().replace(/\s+/g, '');
	console.log(tipo)
	console.log(verificar)
    const listaFiltrada=listaJuegos.filter(item=>{
        return item[tipo] === verificar;
    });
	listaFiltrada.length === document.querySelectorAll('.lista__productos__item').length ? 
	
	agregarListaHTML(listaJuegos):agregandoListaFiltrada(listaFiltrada);
}

//filtrar por genero





//inicio del programa

subMenu();
desplegarFiltro();
agregarListaHTML(listaJuegos); //cagando al doom la lista del objeto
filtrado(document.getElementById('filtros__plataforma'),"plataforma");
filtrado(document.getElementById('filtros__genero'),'genero');





