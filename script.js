/*const empleados = ['Herminio', 'Carlos', 'Lucas', 'Francisco', 'Gustavo'];

function obtenerSabadosDelMes(mes) {
    const anoActual = new Date().getFullYear();
    let sábados = [];
    for (let i = 1; i <= 31; i++) {
        let fecha = new Date(anoActual, mes, i);
        if (fecha.getDay() === 6) { // 6 es sábado
            sábados.push(fecha);
        }
    }
    return sábados;
}

function generarFechasParaMes(mes) {
    const sábados = obtenerSabadosDelMes(mes);
    let asignaciones = {};

    empleados.forEach(empleado => {
        asignaciones[empleado] = [];
    });

    let empleadosRotativos = [...empleados];
    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleadosRotativos.shift();
        asignaciones[empleado].push(sábados[i]);
        empleadosRotativos.push(empleado);
    }

    mostrarAsignaciones(asignaciones, sábados, mes);
}

function generarFechasParaTodosLosMeses() {
    const mesActual = new Date().getMonth();
    for (let mes = mesActual; mes < 12; mes++) {
        generarFechasParaMes(mes);
    }
    document.getElementById("btnGenerar").disabled = true;
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const contenedor = document.getElementById('contenedorTablas');

    html2canvas(contenedor, {
        scale: 0.5,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        pdf.addImage(imgData, 'PNG', 10, 10, 280, canvas.height * 280 / canvas.width);
        pdf.save("asignaciones.pdf");
    });
}

function mostrarAsignaciones(asignaciones, sábados, mes) {
    const contenedor = document.getElementById('contenedorTablas');
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const colores = ['table-primary', 'table-secondary', 'table-success', 'table-danger'];

    let tabla = `<h3>${mesesNombres[mes]}</h3>
                 <table class="table table-bordered">
                     <thead>
                         <tr>
                             <th>Fecha</th>
                             <th>Herminio</th>
                             <th>Carlos</th>
                             <th>Lucas</th>
                             <th>Francisco</th>
                             <th>Gustavo</th>
                         </tr>
                     </thead>
                     <tbody>`;

    sábados.forEach((sábado, index) => {
        let colorFila = colores[index % colores.length];
        tabla += `<tr class="${colorFila}"><td>` + sábado.toLocaleDateString() + '</td>';
        empleados.forEach(empleado => {
            tabla += '<td>' + (asignaciones[empleado].includes(sábado) ? '✓' : '') + '</td>';
        });
        tabla += '</tr>';
    });

    tabla += '</tbody></table>';
    contenedor.innerHTML += tabla;
}

function mezclarAsignaciones() {
    const contenedor = document.getElementById('contenedorTablas');
    const tablas = contenedor.querySelectorAll('table');
    
    tablas.forEach(tabla => {
        const sábados = Array.from(tabla.querySelectorAll('tbody tr td:first-child')).map(td => new Date(td.textContent));
        const asignacionesMezcladas = mezclarFechasEntreEmpleados(sábados);
        
        const filas = Array.from(tabla.querySelectorAll('tbody tr'));
        filas.forEach((fila, index) => {
            const celdas = Array.from(fila.querySelectorAll('td:not(:first-child)'));
            empleados.forEach((empleado, empIndex) => {
                celdas[empIndex].textContent = asignacionesMezcladas[empleado].includes(sábados[index]) ? '✓' : '';
            });
        });
    });
}

function mezclarFechasEntreEmpleados(sábados) {
    let empleadosMezclados = [...empleados].sort(() => Math.random() - 0.5);
    let asignaciones = {};
    let empleadoAnterior = null;

    empleados.forEach(empleado => {
        asignaciones[empleado] = [];
    });

    for (let i = 0; i < sábados.length; i++) {
        let empleadoActual = empleadosMezclados.find(empleado => empleado !== empleadoAnterior);
        asignaciones[empleadoActual].push(sábados[i]);
        empleadoAnterior = empleadoActual;
        empleadosMezclados = empleadosMezclados.filter(empleado => empleado !== empleadoActual);
        if (empleadosMezclados.length === 0) {
            empleadosMezclados = [...empleados].filter(empleado => empleado !== empleadoAnterior);
        }
    }

    return asignaciones;
}

// Al cargar la página, generamos fechas aleatorias
window.onload = generarFechasParaTodosLosMeses;
*/

const empleados = ['Herminio', 'Carlos', 'Lucas', 'Francisco', 'Gustavo'];

function obtenerSabadosDelMes(mes) {
    const anoActual = new Date().getFullYear();
    let sábados = [];
    for (let i = 1; i <= 31; i++) {
        let fecha = new Date(anoActual, mes, i);
        if (fecha.getDay() === 6) { // 6 es sábado
            sábados.push(fecha);
        }
    }
    return sábados;
}

function generarFechasParaMes(mes) {
    const sábados = obtenerSabadosDelMes(mes);
    let asignaciones = {};

    // Inicializar las asignaciones para todos los empleados
    empleados.forEach(empleado => {
        asignaciones[empleado] = [];
    });

    let empleadosRotativos = [...empleados];
    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleadosRotativos.shift();
        asignaciones[empleado].push(sábados[i]);
        empleadosRotativos.push(empleado);
    }

    mostrarAsignaciones(asignaciones, sábados, mes);
}

function generarFechasParaTodosLosMeses() {
    const mesActual = new Date().getMonth();
    for (let mes = mesActual; mes < 12; mes++) {
        generarFechasParaMes(mes);
    }
    document.getElementById("btnGenerar").disabled = true;
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const contenedor = document.getElementById('contenedorTablas');

    html2canvas(contenedor, {
        scale: 0.5,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        pdf.addImage(imgData, 'PNG', 10, 10, 280, canvas.height * 280 / canvas.width);
        pdf.save("asignaciones.pdf");
    });
}

function mostrarAsignaciones(asignaciones, sábados, mes) {
    const contenedor = document.getElementById('contenedorTablas');
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const colores = ['table-primary', 'table-secondary', 'table-success', 'table-danger'];

    let tabla = `<h3>${mesesNombres[mes]}</h3>
                 <table class="table table-bordered">
                     <thead>
                         <tr>
                             <th>Fecha</th>`;
    empleados.forEach(empleado => {
        tabla += `<th>${empleado}</th>`;
    });
    tabla += `</tr>
                     </thead>
                     <tbody>`;

    sábados.forEach((sábado, index) => {
        let colorFila = colores[index % colores.length];
        tabla += `<tr class="${colorFila}"><td>` + sábado.toLocaleDateString() + '</td>';
        empleados.forEach(empleado => {
            tabla += '<td>' + (asignaciones[empleado].includes(sábado) ? '✓' : '') + '</td>';
        });
        tabla += '</tr>';
    });

    tabla += '</tbody></table>';
    contenedor.innerHTML += tabla;
}

function mezclarAsignaciones() {
    const contenedor = document.getElementById('contenedorTablas');
    const tablas = contenedor.querySelectorAll('table');
    
    tablas.forEach(tabla => {
        const sábados = Array.from(tabla.querySelectorAll('tbody tr td:first-child')).map(td => new Date(td.textContent));
        const asignacionesMezcladas = mezclarFechasEntreEmpleados(sábados);
        
        const filas = Array.from(tabla.querySelectorAll('tbody tr'));
        filas.forEach((fila, index) => {
            const celdas = Array.from(fila.querySelectorAll('td:not(:first-child)'));
            empleados.forEach((empleado, empIndex) => {
                celdas[empIndex].textContent = asignacionesMezcladas[empleado].includes(sábados[index]) ? '✓' : '';
            });
        });
    });
}

function mezclarFechasEntreEmpleados(sábados) {
    let empleadosMezclados = [...empleados].sort(() => Math.random() - 0.5);
    let asignaciones = {};
    let empleadoAnterior = null;

    empleados.forEach(empleado => {
        asignaciones[empleado] = [];
    });

    for (let i = 0; i < sábados.length; i++) {
        let empleadoActual = empleadosMezclados.find(empleado => empleado !== empleadoAnterior);
        asignaciones[empleadoActual].push(sábados[i]);
        empleadoAnterior = empleadoActual;
        empleadosMezclados = empleadosMezclados.filter(empleado => empleado !== empleadoActual);
        if (empleadosMezclados.length === 0) {
            empleadosMezclados = [...empleados].filter(empleado => empleado !== empleadoAnterior);
        }
    }

    return asignaciones;
}

// Al cargar la página, generamos fechas para todos los meses
window.onload = generarFechasParaTodosLosMeses;
