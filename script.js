function generateDates(){
  document.getElementById('datesList').innerHTML = ""; // Limpia la lista antes de generar nuevas fechas
  
  // Comenzamos desde septiembre de 2023
  let startDate = new Date(2023, 8, 1); // Meses en JavaScript son 0-indexados, por lo que 8 representa septiembre
  
  for(let i = 0; i < 52; i++){
    let saturday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i*7);
    let card = generateDateCard(saturday.toLocaleDateString(), saturday.getMonth());
    document.getElementById('datesList').appendChild(card);
  }
}

function generateDateCard(date, month) {
  let card = document.createElement('div');
  card.className = 'card p-2 m-2';  // Estilos Bootstrap: card, padding y margen
  card.innerText = date;
  
  // Aquí puedes agregar los nombres de las personas agrupados por mes
  let namesForMonth = getNamesByMonth(month);
  let namesList = document.createElement('ul');
  namesForMonth.forEach(name => {
    let listItem = document.createElement('li');
    listItem.innerText = name;
    namesList.appendChild(listItem);
  });
  card.appendChild(namesList);
  
  card.style.backgroundColor = '#FAFAD2';  // Color de fondo crema
  return card;
}

function getNamesByMonth(month) {
  // Aquí debes obtener los nombres de las personas por mes. 
  // Por ahora, devolveré un array de ejemplo:
  let exampleNames = [
    ["Herminio", "Francisco", "Carlos", "Christian"]
  ];
  return exampleNames[month] || []; // Devuelve los nombres del mes o un array vacío si no hay nombres
}
