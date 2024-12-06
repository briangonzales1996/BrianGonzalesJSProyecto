
"use strict" 
//variables u objetos

//funciones
function subMenu(){
    const filtro = document.querySelectorAll(".subMenu");
    filtro.forEach((elemento)=>{
        elemento.addEventListener('click',(e)=>{
            let height = 0;
            if(elemento.lastElementChild.clientHeight === 0){
                height = elemento.lastElementChild.scrollHeight;
            }
            elemento.lastElementChild.style.height = `${height}px`;
            elemento.firstElementChild.lastElementChild.classList.toggle("flecha");            
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
//inicio del programa

subMenu();
desplegarFiltro();

