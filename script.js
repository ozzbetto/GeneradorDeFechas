const empleados = ['Herminio', 'Carlos', 'Christian', 'Francisco'];

function mezclarFechas() {
    const sábados = obtenerSabadosDelMes();
    const asignacionesActuales = generarFechas(true);

    let todosLosCheckmarks = [];
    empleados.forEach(empleado => {
        sábados.forEach(sábado => {
            if (asignacionesActuales[empleado].includes(sábado)) {
                todosLosCheckmarks.push(sábado);
            }
        });
    });

    // Mezclar todos los checkmarks
    for (let i = todosLosCheckmarks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todosLosCheckmarks[i], todosLosCheckmarks[j]] = [todosLosCheckmarks[j], todosLosCheckmarks[i]];
    }

    // Reasignar los checkmarks mezclados a los empleados
    let nuevasAsignaciones = {};
    empleados.forEach(empleado => {
        nuevasAsignaciones[empleado] = [];
    });

    empleados.forEach(empleado => {
        for (let i = 0; i < sábados.length / empleados.length; i++) {
            nuevasAsignaciones[empleado].push(todosLosCheckmarks.pop());
        }
    });

    mostrarAsignaciones(nuevasAsignaciones, sábados);
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
