function saludar(){
    alert ("Bienvenido "+nombre+"!!!")
    console.log ("Bienvenido "+nombre+" a el centro de atencion médica personalizada")
}

let nombre = prompt("Escribe tu nombre");
saludar(nombre);

const turnosDisponibles = ["13.30 hs", "14.30 hs", "16.30 hs","17 hs"];

for (let i = 0; i < turnosDisponibles.length; i++) {
    console.log(turnosDisponibles[i].id + " - " + turnosDisponibles[i].hora);
}

let usuario = {
    nombre: "",
    apellido: "", 
    dni: 0,
    mail: "",
}

function sacarTurno(){
    let esRegistrado = confirm ("¿Ya eres paciente registrado?");

    if (esRegistrado){
        let turnoElegido = prompt ("Elige uno de los siguientes turnos disponibles: "+turnosDisponibles.join("\n"));
        alert ("¡Perfecto "+nombre+" "+usuario.apellido+"! haz elegido el turno de la hora "+turnoElegido);
    }else{
        usuario.nombre = prompt ("Escribe tu nombre")
        usuario.apellido = prompt ("Escribe tu apellido");
        usuario.dni = parseInt(prompt(usuario.nombre+" escribe tu numero de DNI"));
        usuario.mail = prompt ("Por ultimo, regitra el mail a donde quieres que te enviemos la confirmacion del turno")
        alert ("Gracias por registrarte "+nombre+" "+usuario.apellido+". Ahora puedes elegir un turno.");
        let turnoElegido = prompt ("Elige uno de los siguientes turnos disponibles: "+turnosDisponibles.join("\n"));
        alert ("¡Perfecto "+nombre+" "+usuario.apellido+"! haz elegido el turno de la hora "+turnoElegido);
    }
}
function tengoTurno(){
    alert ("Estos son detalles de tu turno actual: ");
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
            alert("Opcion incorrecta, por favor elige una opción válida.");
    }
    reservar = parseInt(prompt(nombre + ", por favor, elige una opción: \n 1-Sacar un turno \n 2-Tengo un turno \n 3-Salir"));
}
alert("Gracias por usar el sistema. ¡Hasta luego!");