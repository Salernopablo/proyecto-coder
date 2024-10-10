class Paciente {
    static id = 0;
    constructor(nombre, apellido, email, dni) {
        this.id = ++Paciente.id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.dni = dni;
    }
}

const pacientes = [];
const horariosDisponibles = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

function registrarPaciente() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let email = document.getElementById("email").value;

    if (nombre && apellido && dni && email) {
        const nuevoPaciente = new Paciente(nombre, apellido, email, dni);
        pacientes.push(nuevoPaciente);
        console.log("Paciente registrado:", nuevoPaciente);
        mostrarMenu();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function mostrarMenu() {
    document.querySelector(".menu").style.display = "block";
}

function mostrarHorarios() {
    let listaHorarios = document.getElementById("horariosDisponibles");
    listaHorarios.innerHTML = ""; 
    horariosDisponibles.forEach(horario => {
        let li = document.createElement("li");
        li.innerText = horario;
        li.onclick = () => seleccionarHorario(horario); 
        listaHorarios.appendChild(li);
    });
    document.querySelector(".horario").style.display = "block";
}


function seleccionarHorario(horarioSeleccionado) {
    alert(`Has seleccionado el horario: ${horarioSeleccionado}`);
    document.querySelector(".info-turno").style.display = "block";
    document.getElementById("detalleTurno").innerText = `Tu turno es a las ${horarioSeleccionado}`;
}

document.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    registrarPaciente();
};

document.getElementById("noTengoTurno").onclick = mostrarHorarios;