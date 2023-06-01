//https://pokeapi.co/
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  const url = " https://pokeapi.co/api/v2/pokemon/";
  const card = document.getElementById("carta");
  const boton = document.getElementById("boton");
  let getPokeData = () => {
    // Genera un num random de 1 a 150 y lo coje de la API
    let id = Math.floor(Math.random() * 150) + 1;
    // Combina la url de la API con la id 
    const finalUrl = url + id;
    // Recoge la info
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        generateCard(data);
      });
  };
  //Genera la carta
  let generateCard = (data) => {
    // Recoje los datos y los guarda para la carta
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    // Cambia el fondo de color basado en el yipo de pokemon 
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);
   // Genera lo que aparece el la carta basandose en lo que recoge 
      card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokeName}</h2>
          <div class="types">
           
          </div>
          <div class="stats">
            <div>
              <h3>${statAttack}</h3>
              <p>Ataque</p>
            </div>
            <div>
              <h3>${statDefense}</h3>
              <p>Defensa</p>
            </div>
            <div>
              <h3>${statSpeed}</h3>
              <p>Velocidad</p>
            </div>
          </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
  };
  let appendTypes = (types) => {
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };
  let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
};
  // Los eventlistener para cuando haces click en el boton 
  boton.addEventListener("click", getPokeData);
  window.addEventListener("load", getPokeData);