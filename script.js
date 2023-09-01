function generarFechas() {
    const tablaGuardias = document.getElementById('tablaGuardias');
    tablaGuardias.innerHTML = ''; // Limpiar la tabla

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const anoActual = fechaActual.getFullYear();

    const empleados = ['Herminio', 'Carlos', 'Christian', 'Francisco'];
    let asignaciones = {};

    // Obtener todos los sábados del mes
    let sábados = [];
    for (let i = 1; i <= 31; i++) {
        let fecha = new Date(anoActual, mesActual, i);
        if (fecha.getDay() === 6) { // 6 es sábado
            sábados.push(fecha);
        }
    }

    // Asignar fechas a empleados
    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleados[i % empleados.length];
        if (!asignaciones[empleado]) {
            asignaciones[empleado] = [];
        }
        asignaciones[empleado].push(sábados[i]);
    }

    // Llenar la tabla con las fechas asignadas
    sábados.forEach(sábado => {
        let fila = '<tr><td>' + sábado.toLocaleDateString() + '</td>';
        empleados.forEach(empleado => {
            fila += '<td>' + (asignaciones[empleado].includes(sábado) ? '✓' : '') + '</td>';
        });
        fila += '</tr>';
        tablaGuardias.innerHTML += fila;
    });
}
