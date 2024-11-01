const horariosDisponibles = {
    traumatologo: ["08:00", "09:00", "10:00", "11:00"],
    cardiologo: ["14:00", "15:00", "16:00", "17:00"],
    kinesiologo: ["10:00", "11:00", "15:00", "16:00"],
    "medico clinico": ["09:00", "10:00", "14:00", "15:00"],
    dermatologo: ["11:00", "12:00", "16:00", "17:00"]
};

async function obtenerDatosProfesionales() {
    try {
        const response = await fetch('profesionales.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        const data = await response.json();
        return {
            traumatologo: ["Dr. Maximiliano (Traumatólogo)", "Dra. Fernández (Traumatóloga)"],
            cardiologo: ["Dr. García (Cardiólogo)", "Dra. Pérez (Cardióloga)"],
            kinesiologo: ["Dr. Ana Gomez (Kinesióloga)"],
            "medico clinico": ["Dr. Juan Perez (Clínico)"],
            dermatologo: ["Dr. Sofia Lopez (Dermatóloga)"]
        };
    } catch (error) {
        console.error('Error al cargar profesionales:', error);
        return {
            traumatologo: ["Dr. Maximiliano (Traumatólogo)", "Dra. Fernández (Traumatóloga)"],
            cardiologo: ["Dr. García (Cardiólogo)", "Dra. Pérez (Cardióloga)"]
        };
    }
}

async function obtenerHorariosDisponibles() {
    return horariosDisponibles;
}
