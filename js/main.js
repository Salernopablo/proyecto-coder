let pacientesRegistrados = JSON.parse(localStorage.getItem('pacientes')) || [];
let turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
let turnoEditandoIndex = null;
let modoEdicion = false;

function inicializarFechaMinima() {
    const hoy = new Date().toISOString().split("T")[0];
    document.getElementById("fecha").setAttribute("min", hoy);
}

function mostrarMensaje(mensaje, tipo = 'info') { 
    Swal.fire({
        text: mensaje,
        icon: tipo,
        confirmButtonText: 'Aceptar'
    });
}

function mostrarSeccion(seccion) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('oculto'));
    document.getElementById(seccion).classList.remove('oculto');
}

function validarDNI(dni) {
    // Verifica que solo contenga números
    const soloNumeros = /^\d+$/.test(dni);
    // Verifica la longitud
    const longitudCorrecta = dni.length >= 8;
    
    if (!soloNumeros) {
        mostrarMensaje("El DNI debe contener solo números", 'error');
        return false;
    }
    if (!longitudCorrecta) {
        mostrarMensaje("El DNI debe tener al menos 8 caracteres", 'error');
        return false;
    }
    return true;
}

async function cargarEspecialidades() {
    try {
        const profesionales = await obtenerDatosProfesionales();
        const especialidadSelect = document.getElementById('especialidad');
        especialidadSelect.innerHTML = '<option value="">Seleccione una especialidad</option>';
        
        Object.keys(profesionales).forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad;
            option.textContent = especialidad.charAt(0).toUpperCase() + especialidad.slice(1);
            especialidadSelect.appendChild(option);
        });
    } catch (error) {
        mostrarMensaje("Error al cargar las especialidades", 'error');
    }
}

document.getElementById('form-verificar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dni = document.getElementById('dni-verificacion').value;
    
    if (!validarDNI(dni)) {
        mostrarMensaje("El DNI debe tener al menos 8 caracteres", 'error');
        return;
    }

    const paciente = pacientesRegistrados.find(p => p.dni === dni);

    if (paciente) {
        const turnosPaciente = turnosGuardados.filter(turno => turno.dni === dni);
        await cargarEspecialidades();

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

document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;

        if (!validarDNI(dni)) {
            mostrarMensaje("El DNI debe tener al menos 8 caracteres", 'error');
            return;
        }

        const nuevoPaciente = { nombre, dni };
        pacientesRegistrados.push(nuevoPaciente);
        localStorage.setItem('pacientes', JSON.stringify(pacientesRegistrados));

        await cargarEspecialidades();
        mostrarMensaje("Paciente registrado con éxito.");
        mostrarSeccion('solicitar-turno');
    } catch (error) {
        mostrarMensaje("Error al registrar el paciente.", 'error');
    } finally {
        document.getElementById('form-registro').reset();
    }
});

function turnoDuplicado(dni, profesional, fecha, horario, turnoActualIndex = null) {
    return turnosGuardados.some((turno, index) => 
        index !== turnoActualIndex && 
        turno.profesional === profesional &&
        turno.fecha === fecha &&
        turno.horario === horario
    );
}

document.getElementById('form-turno').addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const especialidad = document.getElementById('especialidad').value;
        const profesional = document.getElementById('profesional').value;
        const fecha = document.getElementById('fecha').value;
        const horario = document.getElementById('horario').value;
        const dni = document.getElementById('dni-verificacion').value;

        if (modoEdicion) {
            if (turnoDuplicado(dni, profesional, fecha, horario, turnoEditandoIndex)) {
                mostrarMensaje("Ya existe un turno para este profesional en el mismo día y horario.", 'warning');
                return;
            }

            turnosGuardados[turnoEditandoIndex] = {
                dni,
                especialidad,
                profesional,
                fecha,
                horario
            };
            modoEdicion = false;
            turnoEditandoIndex = null;
            mostrarMensaje("Turno actualizado con éxito.");
        } else {
            if (turnoDuplicado(dni, profesional, fecha, horario)) {
                mostrarMensaje("Ya existe un turno para este profesional en el mismo día y horario.", 'warning');
                return;
            }

            const nuevoTurno = { dni, especialidad, profesional, fecha, horario };
            turnosGuardados.push(nuevoTurno);
            mostrarMensaje("Turno reservado con éxito.");
        }

        localStorage.setItem('turnos', JSON.stringify(turnosGuardados));
        mostrarSeccion('mis-turnos');
        mostrarTurnosPaciente(dni);
    } catch (error) {
        mostrarMensaje("Error al gestionar el turno.", 'error');
    } finally {
        document.getElementById('form-turno').reset();
    }
});

function mostrarTurnosPaciente(dni) {
    // Asegurarse de que turnosGuardados sea un array
    if (!Array.isArray(turnosGuardados)) {
        turnosGuardados = [];
        localStorage.setItem('turnos', JSON.stringify(turnosGuardados));
    }

    // Filtrar solo los turnos del paciente actual
    const turnosPaciente = turnosGuardados.filter(turno => turno && turno.dni === dni);
    const listaTurnos = document.getElementById('lista-turnos');
    listaTurnos.innerHTML = '';

    if (turnosPaciente.length === 0) {
        listaTurnos.innerHTML = '<p>No tienes turnos registrados.</p>';
        return;
    }

    turnosPaciente.forEach((turno, index) => {
        const turnoElement = document.createElement('div');
        turnoElement.className = 'turno-card';
        turnoElement.innerHTML = `
            <p><strong>Especialidad:</strong> ${turno.especialidad}</p>
            <p><strong>Profesional:</strong> ${turno.profesional}</p>
            <p><strong>Fecha:</strong> ${turno.fecha}</p>
            <p><strong>Horario:</strong> ${turno.horario}</p>
        `;

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => editarTurno(turno, turnosGuardados.findIndex(t => t === turno)));

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarTurno(dni, turnosGuardados.findIndex(t => t === turno)));

        turnoElement.appendChild(botonEditar);
        turnoElement.appendChild(botonEliminar);
        listaTurnos.appendChild(turnoElement);
    });
}

async function editarTurno(turno, index) {
    modoEdicion = true;
    turnoEditandoIndex = index;

    await cargarEspecialidades();
    document.getElementById('especialidad').value = turno.especialidad;
    await actualizarProfesionales(turno.especialidad);
    document.getElementById('profesional').value = turno.profesional;
    document.getElementById('fecha').value = turno.fecha;
    await actualizarHorarios(turno.especialidad);
    document.getElementById('horario').value = turno.horario;

    mostrarSeccion('solicitar-turno');
}

function eliminarTurno(dni, index) {
    if (index === -1) {
        mostrarMensaje("No se pudo encontrar el turno para eliminar.", 'error');
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            turnosGuardados = turnosGuardados.filter((_, i) => i !== index);
            localStorage.setItem('turnos', JSON.stringify(turnosGuardados));
            mostrarMensaje("Turno eliminado con éxito.");
            mostrarTurnosPaciente(dni);
        }
    });
}

document.getElementById('especialidad').addEventListener('change', async () => {
    const especialidad = document.getElementById('especialidad').value;
    await actualizarProfesionales(especialidad);
    await actualizarHorarios(especialidad);
});

async function actualizarProfesionales(especialidad) {
    const profesionalSelect = document.getElementById('profesional');
    profesionalSelect.innerHTML = '<option value="">Seleccione un profesional</option>';

    try {
        const profesionales = await obtenerDatosProfesionales();
        const profesionalesEspecialidad = profesionales[especialidad] || [];
        
        profesionalesEspecialidad.forEach(prof => {
            const option = document.createElement('option');
            option.value = prof;
            option.textContent = prof;
            profesionalSelect.appendChild(option);
        });
    } catch (error) {
        mostrarMensaje("Error al cargar los profesionales.", 'error');
    }
}

async function actualizarHorarios(especialidad) {
    const horarioSelect = document.getElementById('horario');
    horarioSelect.innerHTML = '<option value="">Seleccione un horario</option>';

    try {
        const horarios = await obtenerHorariosDisponibles();
        const horariosEspecialidad = horarios[especialidad] || [];
        
        horariosEspecialidad.forEach(h => {
            const option = document.createElement('option');
            option.value = h;
            option.textContent = h;
            horarioSelect.appendChild(option);
        });
    } catch (error) {
        mostrarMensaje("Error al cargar los horarios.", 'error');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarFechaMinima();
    cargarEspecialidades();
});