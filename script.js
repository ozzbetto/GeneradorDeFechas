// Definir los nombres de los empleados
var employees = ["Herminio", "Carlos", "Christian", "Francisco"];

// Generar fechas y mostrarlas en el formulario
function generateDates() {
  var datesByMonth = generateMonthDates();
  displayDates(datesByMonth);
}

// Generar fechas de los sábados entre Julio y Diciembre de 2023
function generateMonthDates() {
  var startDate = new Date(2023, 6, 1); // Julio es el mes 6
  var endDate = new Date(2023, 11, 31); // Diciembre es el mes 11
  var dates = [];

  // Generar todas las fechas de los sábados entre la fecha de inicio y la fecha de finalización
  while (startDate <= endDate) {
    if (startDate.getDay() === 6) { // Verificar si es sábado (0: domingo, 1: lunes, ..., 6: sábado)
      dates.push(new Date(startDate));
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  // Verificar si hay suficientes sábados para todos los empleados
  if (dates.length < employees.length) {
    alert("No hay suficientes sábados disponibles para todos los empleados.");
    return {};
  }

  // Asignar fechas a los empleados de forma aleatoria y sin repetición en cada mes
  var shuffledDates = shuffleArray(dates);
  var datesByMonth = groupDatesByMonth(shuffledDates);

  return datesByMonth;
}

// Agrupar las fechas por mes
function groupDatesByMonth(dates) {
  var datesByMonth = {};

  for (var i = 0; i < dates.length; i++) {
    var date = dates[i];
    var month = date.getMonth();
    var monthKey = getMonthName(month);

    if (!datesByMonth[monthKey]) {
      datesByMonth[monthKey] = [];
    }

    datesByMonth[monthKey].push(date);
  }

  return datesByMonth;
}

// Mostrar las fechas asignadas por mes en el formulario
function displayDates(datesByMonth) {
  var datesList = document.getElementById("datesList");
  datesList.innerHTML = "";

  var months = Object.keys(datesByMonth).sort(function(a, b) {
    var aDate = new Date(a);
    var bDate = new Date(b);
    return bDate - aDate;
  });

  for (var i = 0; i < months.length; i++) {
    var month = months[i];
    var monthHeader = document.createElement("h2");
    monthHeader.textContent = month;
    datesList.appendChild(monthHeader);

    var monthDates = datesByMonth[month];
    for (var j = 0; j < monthDates.length; j++) {
      var employee = employees[j % employees.length];
      var listItem = document.createElement("li");
      listItem.textContent = employee + ": " + formatDate(monthDates[j]);
      monthHeader.appendChild(listItem);
    }
  }
}

// Obtener el nombre del mes a partir de su número
function getMonthName(month) {
  var monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return monthNames[month];
}

// Formatear una fecha como "dd/mm/yyyy"
function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1; // Sumar 1 porque enero es el mes 0
  var year = date.getFullYear();

  // Agregar ceros iniciales si es necesario
  day = (day < 10) ? "0" + day : day;
  month = (month < 10) ? "0" + month : month;

  return day + "/" + month + "/" + year;
}

// Función para mezclar el orden de los elementos de un arreglo
function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // Mientras queden elementos para mezclar
  while (currentIndex !== 0) {
    // Obtener un elemento aleatorio del arreglo restante
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Intercambiar el elemento actual con el elemento aleatorio
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
