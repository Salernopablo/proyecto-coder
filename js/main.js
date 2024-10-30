let pacientesRegistrados = JSON.parse(localStorage.getItem('pacientes')) || [];
let turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];

// Función para inicializar la fecha mínima en el selector de fechas
function inicializarFechaMinima() {
    const hoy = new Date().toISOString().split("T")[0];
    document.getElementById("fecha").setAttribute("min", hoy);
}

// Mostrar mensaje
function mostrarMensaje(mensaje) {
    alert(mensaje); // Puedes cambiar esto por SweetAlert para mejorar la experiencia
}

// Mostrar sección
function mostrarSeccion(seccion) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('oculto'));
    document.getElementById(seccion).classList.remove('oculto');
}

// Verificar registro del paciente
document.getElementById('form-verificar').addEventListener('submit', (e) => {
    e.preventDefault();
    const dni = document.getElementById('dni-verificacion').value;
    const paciente = pacientesRegistrados.find(p => p.dni === dni);

    if (paciente) {
        const turnosPaciente = turnosGuardados.filter(turno => turno.dni === dni);

        if (turnosPaciente.length > 0) {
            mostrarTurnosPaciente(dni);
            mostrarSeccion('mis-turnos');
        } else {
            mostrarSeccion('solicitar-turno');
            mostrarMensaje("No tienes turnos registrados. Solicita uno nuevo.");
        }
    } else {
        mostrarSeccion('registro-paciente');
        mostrarMensaje("No está registrado. Proceda a registrarse.");
    }
});

// Registrar nuevo paciente
document.getElementById('form-registro').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;

    const nuevoPaciente = { nombre, dni };
    pacientesRegistrados.push(nuevoPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientesRegistrados));

    mostrarMensaje("Paciente registrado con éxito.");
    mostrarSeccion('solicitar-turno');
});

// Validar si un turno ya existe en el mismo horario y profesional
function turnoDuplicado(dni, profesional, fecha, horario) {
    return turnosGuardados.some(turno => 
        turno.dni === dni &&
        turno.profesional === profesional &&
        turno.fecha === fecha &&
        turno.horario === horario
    );
}

// Solicitar turno
document.getElementById('form-turno').addEventListener('submit', (e) => {
    e.preventDefault();
    const especialidad = document.getElementById('especialidad').value;
    const profesional = document.getElementById('profesional').value;
    const fecha = document.getElementById('fecha').value;
    const horario = document.getElementById('horario').value;
    const dni = document.getElementById('dni-verificacion').value;

    if (turnoDuplicado(dni, profesional, fecha, horario)) {
        mostrarMensaje("Ya existe un turno para este profesional en el mismo horario.");
        return;
    }

    const nuevoTurno = { dni, especialidad, profesional, fecha, horario };
    turnosGuardados.push(nuevoTurno);
    localStorage.setItem('turnos', JSON.stringify(turnosGuardados));

    mostrarMensaje("Turno reservado con éxito.");
    mostrarSeccion('mis-turnos');
    mostrarTurnosPaciente(dni);
});

// Mostrar turnos del paciente
function mostrarTurnosPaciente(dni) {
    const turnosPaciente = turnosGuardados.filter(turno => turno.dni === dni);
    const listaTurnos = document.getElementById('lista-turnos');
    listaTurnos.innerHTML = '';

    turnosPaciente.forEach((turno, index) => {
        const turnoElement = document.createElement('div');
        turnoElement.textContent = `Especialidad: ${turno.especialidad}, Profesional: ${turno.profesional}, Fecha: ${turno.fecha}, Horario: ${turno.horario}`;

        // Botón de Editar
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => editarTurno(dni, index));

        // Botón de Eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarTurno(dni, index));

        turnoElement.appendChild(botonEditar);
        turnoElement.appendChild(botonEliminar);
        listaTurnos.appendChild(turnoElement);
    });
}

// Editar turno
function editarTurno(dni, index) {
    const turno = turnosGuardados.filter(t => t.dni === dni)[index];
    
    document.getElementById('especialidad').value = turno.especialidad;
    actualizarProfesionales(turno.especialidad);
    document.getElementById('profesional').value = turno.profesional;
    document.getElementById('fecha').value = turno.fecha;
    actualizarHorarios(turno.especialidad);
    document.getElementById('horario').value = turno.horario;

    mostrarSeccion('solicitar-turno');

    document.getElementById('form-turno').onsubmit = (e) => {
        e.preventDefault();

        const nuevaFecha = document.getElementById('fecha').value;
        const nuevoHorario = document.getElementById('horario').value;

        turnosGuardados[index] = { ...turno, fecha: nuevaFecha, horario: nuevoHorario };
        localStorage.setItem('turnos', JSON.stringify(turnosGuardados));

        mostrarMensaje("Turno editado con éxito.");
        mostrarSeccion('mis-turnos');
        mostrarTurnosPaciente(dni);
    };
}

// Eliminar turno
function eliminarTurno(dni, index) {
    turnosGuardados = turnosGuardados.filter((_, i) => !(turnosGuardados[i].dni === dni && i === index));
    localStorage.setItem('turnos', JSON.stringify(turnosGuardados));

    mostrarMensaje("Turno eliminado.");
    mostrarTurnosPaciente(dni);
}

// Actualizar profesionales y horarios según especialidad
document.getElementById('especialidad').addEventListener('change', () => {
    const especialidad = document.getElementById('especialidad').value.toLowerCase();
    actualizarProfesionales(especialidad);
    actualizarHorarios(especialidad);
});

// Función para actualizar select de profesionales
function actualizarProfesionales(especialidad) {
    const profesionalSelect = document.getElementById('profesional');
    profesionalSelect.innerHTML = '';

    obtenerDatosProfesionales().then(data => {
        const profesionales = data[especialidad] || [];
        if (profesionales.length > 0) {
            profesionales.forEach(prof => {
                const option = document.createElement('option');
                option.value = prof;
                option.textContent = prof;
                profesionalSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.textContent = 'No hay profesionales disponibles';
            profesionalSelect.appendChild(option);
        }
    }).catch(error => {
        mostrarMensaje("Error al cargar los profesionales.");
    });
}

// Función para actualizar horarios
function actualizarHorarios(especialidad) {
    const horarioSelect = document.getElementById('horario');
    horarioSelect.innerHTML = '';

    const horarios = horariosDisponibles[especialidad] || [];
    if (horarios.length > 0) {
        horarios.forEach(h => {
            const option = document.createElement('option');
            option.value = h;
            option.textContent = h;
            horarioSelect.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.textContent = 'No hay horarios disponibles';
        horarioSelect.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", inicializarFechaMinima);