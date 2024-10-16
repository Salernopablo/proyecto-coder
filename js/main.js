// Array de profesionales con sus especialidades
const profesionales = [
    { id: 1, nombre: "Dr. Maximiliano", especialidad: "Traumatólogo" },
    { id: 2, nombre: "Dr. Juan", especialidad: "Traumatólogo" },
    { id: 3, nombre: "Lic. Damian", especialidad: "Kinesiólogo" },
    { id: 4, nombre: "Dr. Adrian", especialidad: "Médico Clínico" },
    { id: 5, nombre: "Dra. Mariana", especialidad: "Dermatóloga" }
];

// Array para almacenar los turnos
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

// Elementos del DOM
const especialidadSelect = document.getElementById("especialidad");
const profesionalSelect = document.getElementById("profesional");
const formTurno = document.getElementById("formTurno");
const listaTurnos = document.getElementById("listaTurnos");

// Llenar el select de profesionales dinámicamente según la especialidad elegida
especialidadSelect.onchange = () => {
    profesionalSelect.innerHTML = ""; // Limpiar el select
    const especialidadSeleccionada = especialidadSelect.value;

    // Filtrar los profesionales por especialidad
    const profesionalesFiltrados = profesionales.filter(
        prof => prof.especialidad === especialidadSeleccionada
    );

    // Llenar el select con los profesionales filtrados
    profesionalesFiltrados.forEach(prof => {
        const option = document.createElement("option");
        option.value = prof.nombre;
        option.text = prof.nombre;
        profesionalSelect.appendChild(option);
    });
};

// Inicializar el select de profesionales al cargar la página
especialidadSelect.onchange();

// Función para renderizar los turnos desde el localStorage
function renderMisTurnos() {
    listaTurnos.innerHTML = "";
    turnos.forEach(turno => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${turno.fecha} - ${turno.profesional} (${turno.especialidad})<br>
            Paciente: ${turno.nombre} ${turno.apellido}, DNI: ${turno.dni}<br>
            <button onclick="editarTurno(${turno.id})">Editar</button>
            <button onclick="borrarTurno(${turno.id})">Borrar</button>
        `;
        listaTurnos.appendChild(li);
    });
}

// Función para borrar un turno
function borrarTurno(id) {
    turnos = turnos.filter(turno => turno.id !== id);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    renderMisTurnos();
}

// Función para registrar un nuevo turno
formTurno.onsubmit = (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const email = document.getElementById("email").value;
    const especialidad = document.getElementById("especialidad").value;
    const profesional = document.getElementById("profesional").value;
    const fecha = document.getElementById("fecha").value;

    // Crear un nuevo objeto de turno
    const nuevoTurno = {
        id: Date.now(),
        nombre,
        apellido,
        dni,
        email,
        especialidad,
        profesional,
        fecha
    };

    // Guardar el turno en el array y en el localStorage
    turnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos));

    // Notificar al usuario
    alert("Turno registrado exitosamente.");
    
    // Limpiar el formulario
    formTurno.reset();
    especialidadSelect.onchange(); // Resetear el select de profesionales

    // Actualizar la lista de turnos
    renderMisTurnos();
}

// Inicializar la vista de turnos
renderMisTurnos();