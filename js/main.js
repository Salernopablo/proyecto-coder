let nombre = prompt("Escribe tu nombre");

function saludar(){
    alert ("Bienvenido "+nombre+"!!!")
    console.log ("Bienvenido "+nombre+" a el centro de atencion médica personalizada")
}
saludar();

function sacarTurno(){
    let fecha = prompt ("Elige la fecha en la que te gustaria tener un turno");
    alert ("Elegiste la fecha: "+fecha);
}

function tengoTurno(){
    alert ("Función para mostrar los detalles de tu turno actual (puedes definir qué hacer aquí)");
}

let reservar = parseInt(prompt(nombre+", por favor, elige una opción: \n 1-Sacar un turno \n 2-Tengo un turno \n 3-Salir"));
while (reservar !== 3){
    switch (reservar){
        case 1:
            sacarTurno();
            break;
        case 2:
            tengoTurno();
            break;
        default:
            alert("Opcion incorrecta");
    }
    reservar = parseInt(prompt(nombre + ", por favor, elige una opción: \n 1-Sacar un turno \n 2-Tengo un turno \n 3-Salir"));
}
alert("Gracias por usar el sistema. ¡Hasta luego!");