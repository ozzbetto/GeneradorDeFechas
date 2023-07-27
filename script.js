function generateDates(){
  document.getElementById('datesList').innerHTML = ""; // Limpia la lista antes de generar nuevas fechas
  for(let i = 0; i < 52; i++){
    let saturday = new Date(2023, 0, 1+i*7);
    let card = generateDateCard(saturday.toLocaleDateString());
    document.getElementById('datesList').appendChild(card);
  }
}

function generateDateCard(date) {
  let card = document.createElement('div');
  card.className = 'card p-2 m-2';  // Estilos Bootstrap: card, padding y margen
  card.innerText = date;
  card.style.backgroundColor = '#FAFAD2';  // Color de fondo crema
  return card;
}
