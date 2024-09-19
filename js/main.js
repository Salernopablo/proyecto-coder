let nombre = prompt("Escribe tu nombre");
saludar(nombre);

function saludar(nombre){
    alert ("Bienvenido "+nombre+"!!!")
    console.log ("Bienvenido "+nombre+" a el centro de atencion médica personalizada")
}

const turnosDisponibles = ["13 hs", "14 hs", "16 hs","17 hs"];

for (let i = 0; i < turnosDisponibles.length; i++) {
    console.log(turnosDisponibles[i]);
}

let usuario = {
    nombre: "",
    apellido: "", 
    dni: 0,
    mail: "",
    turnoActual: null,
}

function sacarTurno(turnosDisponibles){
    let esRegistrado = confirm ("¿Ya eres paciente registrado?");

    if (esRegistrado){
        parseInt(prompt("Ingrese su número de DNI"))
        let turnoElegido = prompt ("Ahora elija uno de los siguientes turnos disponibles: "+turnosDisponibles.join("\n"));
        alert ("¡Perfecto "+nombre+" "+usuario.apellido+"! haz elegido el turno de la hora "+turnoElegido);
        usuario.turnoActual = turnoElegido;
        console.log("Turno elegido por el usuario registrado: " + turnoElegido);
    }else{
        usuario.nombre = prompt ("Escribe tu nombre")
        usuario.apellido = prompt ("Escribe tu apellido");
        usuario.dni = parseInt(prompt(usuario.nombre+" escribe tu numero de DNI"));
        usuario.mail = prompt ("Por ultimo, regitra el mail a donde quieres que te enviemos la confirmacion del turno")
        alert ("Gracias por registrarte "+usuario.nombre+" "+usuario.apellido+". Ahora puedes elegir un turno.");
        console.log("Datos del usuario después del registro: ", usuario);
        let turnoElegido = prompt ("Elige uno de los siguientes turnos disponibles: "+turnosDisponibles.join("\n"));
        alert ("¡Perfecto "+usuario.nombre+" "+usuario.apellido+"! haz elegido el turno de la hora "+turnoElegido);
        usuario.turnoActual = turnoElegido;
        console.log("Turno elegido por el usuario no registrado: " + turnoElegido);
    }
}
function tengoTurno(usuario){
    if(usuario.turnoActual){
        alert ("Estos son detalles de tu turno actual: Tienes turno reservado para la hora " +usuario.turnoActual);
        console.log("El usuario tiene un turno reservado: " + usuario.turnoActual);
    } else {
        alert ("No tienes turno");
        console.log("El usuario no tiene ningún turno reservado.");
    }
    
}

let reservar = parseInt(prompt(nombre+", por favor, elige una opción: \n 1-Sacar un turno \n 2-Tengo un turno \n 3-Salir"));
while (reservar !== 3){
    switch (reservar){
        case 1:
            sacarTurno(turnosDisponibles);
            break;
        case 2:
            tengoTurno(usuario);
            break;
        default:
            alert("Opcion incorrecta, por favor elige una opción válida.");
    }
    reservar = parseInt(prompt(nombre + ", por favor, elige una opción: \n 1-Sacar un turno \n 2-Tengo un turno \n 3-Salir"));
}
alert("Gracias por usar el sistema. ¡Hasta luego!");