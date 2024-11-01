# Proyecto Final - Sistema de Turnos Médicos

Este proyecto es un simulador interactivo de un sistema de reserva de turnos médicos, desarrollado en JavaScript, con integración de HTML, CSS y JSON. Permite la reserva, edición y eliminación de turnos asociados a un DNI, manteniendo la persistencia de los datos en el navegador mediante localStorage.

## Funcionalidades

- Reserva de turnos médicos con selección de especialista, fecha y hora.
- Validación de fecha para evitar la selección de turnos en fechas pasadas.
- Edición y eliminación de turnos guardados en localStorage.
- Fetch para cargar la lista de profesionales desde un archivo `JSON`.
- Uso de SweetAlert2 para mostrar mensajes amigables al usuario.

## Tecnologías

- **JavaScript**: Lógica del sistema.
- **HTML y CSS**: Interfaz visual, utilizando Flexbox y Grid.
- **Bootstrap**: Estilos adicionales para el diseño visual.
- **SweetAlert2**: Para mensajes de confirmación y error.
- **LocalStorage**: Para la persistencia de datos.

## Organización de Archivos

- **index.html**: Página principal del sistema.
- **dataFetch.js**: Archivo que simula un fetch a JSON, cargando datos de profesionales.
- **main.js**: Archivo que gestiona el formulario de reservas, la validación de fecha, y las funciones de edición y eliminación de turnos.

## Instrucciones

1. Clonar el repositorio en tu máquina local.
2. Abrir el archivo `index.html` en un navegador compatible.
3. En la interfaz:
   - Selecciona un especialista, fecha y horario para reservar un turno.
   - Los turnos pueden ser editados o eliminados desde la sección "Mis Turnos".
4. Verifica el DNI para ver los turnos asociados al mismo.

## Ejemplo de Uso

1. Seleccionar un especialista, fecha, y horario disponible.
2. Guardar el turno y revisar los turnos agendados.
3. Editar o eliminar los turnos según sea necesario.