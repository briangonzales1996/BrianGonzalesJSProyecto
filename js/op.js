
//funciones
function dineroComprobarDato(dinero){
    while(isNaN(dinero)||(dinero<0)){
        dinero = prompt("ingrese un numero y mayor a 0");
    }
    return dinero;
}
function ingresarProducto(){
    let nombre = prompt("ingrese el nombre del producto");   
    let precio = comprobarPrecio();
    alert("producto " + nombre +" se registro correctamente");
    return precio;
}
function comprobarPrecio(){
    let precio = parseInt(prompt ("ingrese precio del producto"));
    while(isNaN(precio) || precio<0){
        precio = parseInt(prompt("el dato debe ser numerico"));
    }
    return precio    
}
function comprobarTecla(finalizar){
    while(finalizar != "s" && finalizar !="n"){
        finalizar=prompt("ERROR.presione 's' para afirmar o 'n' para negar");
    }
    return finalizar;
}
function comprobarCompra(dinero,precioTotal){
    if(precioTotal>dinero){
        alert("la compra no se puede realizar, verifique su cartera");
    }
    else{
        dinero = dinero - precioTotal;
        alert("la compra se realizo exitosamente, su vuelto es de : " + dinero + " pesos")
    }
}

//incio del programa
document.addEventListener("DOMContentLoaded",function(){
    let finalizar = "";
    let precioTotal = 0;
    let dinero = parseInt(prompt("ingrese dinero disponible"));
    dinero = dineroComprobarDato(dinero);
    do{
        precioTotal += ingresarProducto();
        finalizar=prompt("desea finalizar la compra? s/n");
        finalizar=comprobarTecla(finalizar);
    }
    while(finalizar != "s");
    comprobarCompra(dinero,precioTotal);
})




