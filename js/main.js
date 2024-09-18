let nombre = prompt("Escribe tu nombre");

function saludar(){
    alert ("Bienvenido "+nombre+"!!!")
    console.log ("Bienvenido "+nombre+" a el centro de atencion médica personalizada")
}
saludar();

const turnosDisponibles = ["13.30 hs", "14.30 hs", "16.30 hs", "17 hs"];

let usuario = {
    nombre,
    apellido: "", 
    edad: 0,
}

function sacarTurno(){
    let esRegistrado = confirm ("¿Ya res paciente registrado?");
    if (esRegistrado){
        let turnoElegido = prompt ("Elige uno de los siguientes turnos disponibles: "+turnosDisponibles.join("\n"));
        alert ("¡Perfecto "+nombre+" "+usuario.apellido+"! haz elegido el turno de la hora "+turnoElegido);
    }else{
        usuario.apellido = prompt ("Escribe tu apellido");
        usuario.edad = parseInt(prompt("Dinos, "+nombre+" ¿cuantos años tienes?"));
        alert ("Gracias por registrarte "+nombre+" "+usuario.apellido+". Ahora puedes elegir un turno.");
        let turnoElegido = prompt ("Elige uno de los siguientes turnos disponibles: "+turnosDisponibles.join("\n"));
        alert ("¡Perfecto "+nombre+" "+usuario.apellido+"! haz elegido el turno de la hora "+turnoElegido);
    }
}
function tengoTurno(){
    alert ("Estos son detalles de tu turno actual");
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


