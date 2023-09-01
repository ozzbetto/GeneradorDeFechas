const empleados = ['Herminio', 'Carlos', 'Christian', 'Francisco'];

function mezclarAsignaciones(asignaciones) {
    let todasLasFechas = [];
    for (let empleado in asignaciones) {
        todasLasFechas = todasLasFechas.concat(asignaciones[empleado]);
    }

    // Mezclar todas las fechas
    for (let i = todasLasFechas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todasLasFechas[i], todasLasFechas[j]] = [todasLasFechas[j], todasLasFechas[i]];
    }

    // Reasignar las fechas mezcladas a los empleados
    let nuevasAsignaciones = {};
    empleados.forEach(empleado => {
        nuevasAsignaciones[empleado] = [];
    });

    for (let i = 0; i < todasLasFechas.length; i++) {
        let empleado = empleados[i % empleados.length];
        nuevasAsignaciones[empleado].push(todasLasFechas[i]);
    }

    return nuevasAsignaciones;
}

function mezclarFechas() {
    const sábados = obtenerSabadosDelMes();
    const asignaciones = generarFechas(true); // Obtener las asignaciones sin refrescar la tabla
    const nuevasAsignaciones = mezclarAsignaciones(asignaciones);
    mostrarAsignaciones(nuevasAsignaciones, sábados); // Refrescar la tabla con las nuevas asignaciones
}

function obtenerSabadosDelMes() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const anoActual = fechaActual.getFullYear();

    let sábados = [];
    for (let i = 1; i <= 31; i++) {
        let fecha = new Date(anoActual, mesActual, i);
        if (fecha.getDay() === 6) { // 6 es sábado
            sábados.push(fecha);
        }
    }
    return sábados;
}

function generarFechas(sinMostrar = false) {
    const sábados = obtenerSabadosDelMes();
    let asignaciones = {};

    // Asignar fechas a empleados
    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleados[i % empleados.length];
        if (!asignaciones[empleado]) {
            asignaciones[empleado] = [];
        }
        asignaciones[empleado].push(sábados[i]);
    }

    // Llenar la tabla con las fechas asignadas
    if (!sinMostrar) {
        mostrarAsignaciones(asignaciones, sábados);
    }

    return asignaciones;
}

function mostrarAsignaciones(asignaciones, sábados) {
    const tablaGuardias = document.getElementById('tablaGuardias');
    tablaGuardias.innerHTML = ''; // Limpiar la tabla

    const colores = ['color1', 'color2', 'color3', 'color4'];

    sábados.forEach((sábado, index) => {
        let colorFila = colores[index % colores.length];
        let fila = `<tr class="${colorFila}"><td>` + sábado.toLocaleDateString() + '</td>';
        empleados.forEach(empleado => {
            fila += '<td>' + (asignaciones[empleado].includes(sábado) ? '✓' : '') + '</td>';
        });
        fila += '</tr>';
        tablaGuardias.innerHTML += fila;
    });
}
