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
const horarioSelect = document.getElementById("horario");

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

// Función para renderizar la lista de turnos en el DOM
function renderMisTurnos() {
    listaTurnos.innerHTML = "";
    turnos.forEach(turno => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${turno.fecha} - ${turno.horario} - ${turno.profesional} (${turno.especialidad})<br>
            Paciente: ${turno.nombre} ${turno.apellido}, DNI: ${turno.dni}
        `;
        
        // Botón Editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('btn-editar');
        btnEditar.onclick = () => editarTurno(turno.id);
        li.appendChild(btnEditar);

        // Botón Borrar
        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Borrar';
        btnBorrar.classList.add('btn-borrar');
        btnBorrar.onclick = () => borrarTurno(turno.id);
        li.appendChild(btnBorrar);

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
    const horario = document.getElementById("horario").value;

    // Validar DNI
    if (dni.length < 6 || dni.length > 8 || dni < 0) {
        alert("El DNI debe tener entre 6 y 8 dígitos y no puede ser negativo.");
        return;
    }

    // Validar que la fecha no sea pasada
    const fechaActual = new Date().toISOString().split('T')[0];
    if (fecha < fechaActual) {
        alert("No se puede seleccionar una fecha pasada.");
        return;
    }

    // Validar que no haya turnos en el mismo día y horario
    const turnoExistente = turnos.some(turno => turno.fecha === fecha && turno.horario === horario);
    if (turnoExistente) {
        alert("Ya hay un turno reservado para esta fecha y horario.");
        return;
    }

    // Crear un nuevo turno
    const nuevoTurno = {
        id: Date.now(),
        nombre,
        apellido,
        dni,
        email,
        especialidad,
        profesional,
        fecha,
        horario
    };

    // Guardar el turno en el array y en el localStorage
    turnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    
    // Limpiar el formulario
    formTurno.reset();
    especialidadSelect.onchange(); // Resetear el select de profesionales

    // Actualizar la lista de turnos
    renderMisTurnos();
}

// Inicializar la vista de turnos
renderMisTurnos();

// Función para editar un turno
function editarTurno(id) {
    const turno = turnos.find(turno => turno.id === id);

    // Rellenar el formulario con los datos del turno a editar
    document.getElementById("nombre").value = turno.nombre;
    document.getElementById("apellido").value = turno.apellido;
    document.getElementById("dni").value = turno.dni;
    document.getElementById("email").value = turno.email;
    document.getElementById("especialidad").value = turno.especialidad;
    document.getElementById("profesional").value = turno.profesional;
    document.getElementById("fecha").value = turno.fecha;
    document.getElementById("horario").value = turno.horario;

    // Borrar el turno original
    borrarTurno(id);
}