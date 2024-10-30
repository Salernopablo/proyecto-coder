// Datos simulados (fetch a un archivo JSON)
const horariosDisponibles = {
    traumatologo: ["08:00", "09:00", "10:00", "11:00"],
    cardiologo: ["14:00", "15:00", "16:00", "17:00"]
};

// Simulación de un fetch a un JSON
function obtenerDatosProfesionales() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                traumatologo: ["Dr. Maximiliano (Traumatólogo)", "Dra. Fernández (Traumatóloga)"],
                cardiologo: ["Dr. García (Cardiólogo)", "Dra. Pérez (Cardióloga)"]
            };
            resolve(data);
        }, 500);
    });
}