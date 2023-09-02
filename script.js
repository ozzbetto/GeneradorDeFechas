const empleados = ['Herminio', 'Carlos', 'Christian', 'Francisco'];

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

    for (let i = 0; i < sábados.length; i++) {
        let empleado = empleados[i % empleados.length];
        asignaciones[empleado].push(sábados[i]);
    }

    mostrarAsignaciones(asignaciones, sábados, mes);
}

function generarFechasParaTodosLosMeses() {
    const mesActual = new Date().getMonth();
    for (let mes = mesActual; mes < 12; mes++) {
        generarFechasParaMes(mes);
    }
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Asignaciones de Guardias", 10, 10);
    // Aquí puedes agregar el contenido que deseas en el PDF
    doc.save("asignaciones.pdf");
}

function mostrarAsignaciones(asignaciones, sábados, mes) {
    const contenedor = document.getElementById('contenedorTablas');
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const colores = ['color1', 'color2', 'color3', 'color4'];

    let tabla = `<h3>${mesesNombres[mes]}</h3>
                 <table class="table table-bordered">
                     <thead>
                         <tr>
                             <th>Fecha</th>
                             <th>Herminio</th>
                             <th>Carlos</th>
                             <th>Christian</th>
                             <th>Francisco</th>
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
    const mesActual = new Date().getMonth();
    for (let mes = mesActual; mes < 12; mes++) {
        const sábados = obtenerSabadosDelMes(mes);
        let asignaciones = {};

        let empleadosMezclados = [...empleados];
        empleadosMezclados.sort(() => Math.random() - 0.5);

        for (let i = 0; i < sábados.length; i++) {
            let empleado = empleadosMezclados[i % empleadosMezclados.length];
            if (!asignaciones[empleado]) {
                asignaciones[empleado] = [];
            }
            asignaciones[empleado].push(sábados[i]);
        }

        mostrarAsignaciones(asignaciones, sábados, mes);
    }
}
