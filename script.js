const empleados = ['Herminio', 'Carlos', 'Christian', 'Francisco'];

function mezclarFechas() {
    const sábados = obtenerSabadosDelMes();
    const asignacionesActuales = generarFechas(true);

    // Mezclar todos los sábados
    for (let i = sábados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sábados[i], sábados[j]] = [sábados[j], sábados[i]];
    }

    let asignaciones = {};
    empleados.forEach(empleado => {
        asignaciones[empleado] = [];
    });

    // Asignar sábados mezclados a empleados
    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleados[i % empleados.length];
        asignaciones[empleado].push(sábados[i]);
    }

    mostrarAsignaciones(asignaciones, sábados);
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

    empleados.forEach(empleado => {
        asignaciones[empleado] = [];
    });

    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleados[i % empleados.length];
        asignaciones[empleado].push(sábados[i]);
    }

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
