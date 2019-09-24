let filteredPizzaList = [...pizzaList];
let modal = document.getElementsByClassName('modal')[0];
let modalContent = document.getElementsByClassName('modal-content')[0];

let onPizzaClick = function (id) {
  let pizzaObj = pizzaList.find(pizza => pizza.id == id);
  modal.style.display = "block";
  modalContent.innerHTML = `
                            <div class ="modal_pizza_inner">    
                            <img class="modal_pizza-img" src="img/${pizzaObj.img}" alt="pizza">
                            <div class="pizza-text">
                            <h2 class="modal_pizzaName title">${pizzaObj.name}</h2>
                            <p>Состав: ${pizzaObj.composition.join(', ')}</p>
                            <img class="ingredients" src="img/ingredients.png">
                            <div class ="modal_caloricity">
                            <span>${pizzaObj.caloricity}</span>
                            <img class="modal_calories" src="img/calories-icon.jpg">
                            </div>
                            <div class ="modal_price">
                            <span>Цена: ${pizzaObj.price} грн</span>
                            </div>
                            </div>
                            </div>
                            <span class="close icon-cancel-circled-outline"></span>
                            <button class="modal_toCart icon-basket" type="button">В корзину</button>
                            `;

  let close = document.getElementsByClassName('close')[0];   
  close.onclick = function () {
    modal.style.display = "none"
  };                       
}; 



window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}; 


let showPizzaList = function () {
  let pizzaCards = "";
  filteredPizzaList.forEach((pizza, pizzaIndex) => {
    pizzaCards += `<div class="pizza col-md-6 col-lg-4" id="pizza${pizzaIndex}">
                            <div class ="pizza_inner" onclick="onPizzaClick(${pizza.id})">    
                            <img class="pizza-img" src="img/${pizza.img}" alt="pizza">
                            <h2 class="pizzaName title">${pizza.name}</h2>
                            <p>Состав: ${pizza.composition.join(', ')}</p>
                            <div class ="caloricity">
                            <span>${pizza.caloricity}</span>
                            <img class="calories" src="img/calories-icon.jpg">
                            </div>
                            <div class ="price">
                            <span>Цена: ${pizza.price} грн</span>
                            </div>
                            <button class="toCart icon-basket" id="toCart" type="button">В корзину</button>
                            </div>
                            </div>`;

  });

  document.getElementsByClassName('pizzaCards')[0].innerHTML = pizzaCards;
};

showPizzaList();



function onInputChange(value) {
  const val = value.toLowerCase();
  filteredPizzaList = pizzaList.filter(pizza => {
    return pizza.name.toLowerCase().includes(val) || pizza.composition.some(ing => ing.toLowerCase().includes(val))

  });
  showPizzaList();
}; //Поиск по ингредиенту или по имени

let onSelect = function (value) {
  switch (value) {
    case '1':
      filteredPizzaList = pizzaList.filter(pizza => !!filteredPizzaList.find(filteredPizza => filteredPizza.id == pizza.id));
      return showPizzaList();
    case '2':
      filteredPizzaList.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        if (a.price == b.price) return 0;
      });
      return showPizzaList();
    case '3':
      filteredPizzaList.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        if (a.price == b.price) return 0;
      });
      return showPizzaList();
  }
} //Сортировка по цене



