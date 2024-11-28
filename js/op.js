
"use strict" 
//variables u objetos
class Productos{
    constructor(){
        this.nombre = verificarNombre().toLowerCase(); 
        this.precio = parseInt(verificarNumero("ingrese precio del producto"))+"$";
        this.id = verificarId();
        this.cantidad = parseInt(verificarNumero("ingrese la cantidad de productos"));
    }
}

const variablesGlobales = {
    opcion : "",
    productos: []//array de lista de productos agregados como objeto
}

//FUNCIONES
//verificamos si ingreso un nombre correcto
const verificarNombre = ()=>{
    let nombre = prompt("ingrese el nombre del producto");
    while(!isNaN(parseInt(nombre)) || nombre === "" ){
        nombre = prompt("El nombre no es valido, debe ser una palabra");
    }
    return nombre 
}

//verificamos si ingreso un numero
const verificarNumero=(mensaje)=>{
    let precio =prompt(mensaje);
    while(isNaN(parseInt(precio))){
        precio = prompt("ingrese un numero porfavor")
    }
    return precio
}

//funcion bucle para buscar si se repite el id
const buscarID = (produc,id)=>{
    let idUsado = true;
    for(let item in produc){
        if(produc[item].id == id || isNaN(id)){
            idUsado = false;
        }
    }
    return idUsado
}
function verificarId(){
    while(true){
        let  id = parseInt(prompt("ingrese el id del producto"));
        if(isNaN(id)){
            alert("el id esta invalido ingrese un numero");
            continue;
        }
        if(variablesGlobales.productos.length === 0){
            return id;
        }
        const idUsado = buscarID(variablesGlobales.productos,id);
        if(true === idUsado){
            return id;
        }
        alert("el id ya esta registrado")
    }
}

function agregarProducto (){
    const producto = new Productos();  
    variablesGlobales.productos.push(producto);//ingrese los objetos creados en el array
    alert("el producto " + producto.nombre + " se agrego correctamente")
}

function mostrarProductos(){
    let lista = [];
    //itineramos y agregamos productos a la lista
    if(variablesGlobales.productos.length === 0){
        alert("La lista de productos se encuentra vacia")
    }
    else{
        variablesGlobales.productos.forEach(element => {
            lista.push('Producto: '+ element.nombre +"\n"+ "Precio: "+ element.precio + "\n" + 'Cantidad: ' + element.cantidad + '\n' + 'Id: ' + element.id + "\n-------------------");    
        });
        alert(lista.join('\n'))
    }
    
}

const buscarProducto = ()=>{
    let iden = parseInt(prompt("ingrese el id del producto"));
    let resultado = variablesGlobales.productos.find(item=>item.id === iden);
    if(resultado === undefined){
        alert("no registraste ningun producto con ese identificador");
    }
    else {
        alert('Producto: '+ resultado.nombre +"\n"+ "Precio: "+ resultado.precio + "\n" + 'Cantidad: ' + resultado.cantidad + '\n' + 'Id: ' + resultado.id)      
    }    
    
}

const eliminarProducto = ()=>{
    let eliminar = prompt('ingrese numero de id ');
    for(let item in variablesGlobales.productos){
        if(variablesGlobales.productos[item].id === parseInt(eliminar)){
            variablesGlobales.productos.splice(parseInt(item),1);
            return 'el producto se elimino correctamente';
        }
    }
    return "nose encontro el id, mire la 'lista de productos'"
}

//Inicio del programa
document.addEventListener('DOMContentLoaded',function(){
    do{
        variablesGlobales.opcion = prompt("Este es su carrito\nSelecciona una de la siguientes opciones\n\n1-Agregar producto a la lista\n2-Eliminar producto de la lista\n3-Mostrar lista de productos agregados\n4-Buscar producto\n5-Salir");
        variablesGlobales.opcion = parseInt(variablesGlobales.opcion)
        switch(variablesGlobales.opcion){
            case 1 : agregarProducto();break;
            case 2 : { let productoEliminado = eliminarProducto()
                alert(productoEliminado);
                break;
            }
            case 3 : mostrarProductos();break;
            case 4 : buscarProducto();break;
            case 5 : alert("Gracias por utilizar nuestro servicio. Hasta luego");break;
            default: alert('la opcion ingresada es incorrecta');break;
        }
    
    }
    while(variablesGlobales.opcion != 5);
})








