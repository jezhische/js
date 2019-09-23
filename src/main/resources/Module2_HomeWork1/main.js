function showPizzas(pizzaList) {
    let imgContainer = document.getElementById('img-container');
    pizzaList.forEach((elem) => {
        let pizzaCardDiv = document.createElement('div');
        pizzaCardDiv.id = elem.id;
        // установим пользовательский атрибут data-price, пригодится для сортировки
        pizzaCardDiv.dataset.price = elem.price;
        let img = document.createElement('img');
        // img.classList.add('')
        img.src = `img/${elem.img}`;
        pizzaCardDiv.append(img);
        let mark = document.createElement('p');
        // mark.classList.add();
        mark.innerHTML = `<strong>${elem.name}</strong><br>Состав: ${elem.composition.join(', ')}` +
            `<br>Калорийность: <em>${elem.caloricity}</em><br><strong>${elem.price}.-</strong><br>`;
        pizzaCardDiv.append(mark);
        let buttonDiv = document.createElement('div');
        let button = document.createElement('input');
        button.value = 'В корзину!';
        button.type = 'button';
        button.addEventListener('click', () => alert(`Пицца ${elem.name} добавлена в корзину!`));
        // button.classList.add('basket');
        buttonDiv.append(button);
        pizzaCardDiv.append(buttonDiv);
        let hr = document.createElement('p');
        hr.innerHTML += '<hr><br>';
        pizzaCardDiv.append(hr);
        pizzaCardDiv.style.display = 'block';
        imgContainer.append(pizzaCardDiv);
    });
}

// ----------------------------------------------------------------------------------------------------------------

function searchPizza() {
    let input = document.getElementById('search-input');
    // получаем коллекцию всех карточек с пиццами
    let pizzaCards = document.getElementById('img-container').children;
    // добавляем инпуту обработчик событий клавиатуры
    input.addEventListener('keyup', event => {
        // содержимое инпута
        let value = input.value;
        if(value !== '') {
            // уводим value в нижний регистр для сравнения
            value = value.toLowerCase();
            // и, пожалуй, проигнорируем знаки препинания, которые могут проставить самые грамотные:
            value = value.split('').filter(char => char != ',' && char != '.').join('');
// поскольку коллекция элементов, полученная из свойства children, не является массивом, то к ней нужно применять
// цикл for ... of. Но можно, например, вызвать методы массива в контексте этой коллекции:
            [].forEach.call(pizzaCards,function (elem) {
// чтобы легче получить нужное значение, берем из массива pizzaList ту пиццу, которая отображается в обрабатываемом
// в данный момент DOM-элементе elem
                let concordant = pizzaList.filter(item => item.id == elem.id)[0];
// и проверяем, содержит ли она в своем имени или составе value, полученное из инпута. Если нет,
// убираем видимость элемента (NB здесь тернарный оператор)
                concordant.name.toLowerCase().indexOf(value) > -1
                    // не забываем, что composition - это массив
                || anyMatchToArrayItems(concordant.composition, value)?
                // || concordant.composition.join(' ').toLowerCase().indexOf(value) > -1 ?
                elem.style.display = 'block' : elem.style.display = 'none';
            });
            // если из инпута стерты все символы, возвращаем видимость всем элементам
        } else [].forEach.call(pizzaCards,elem => elem.style.display = 'block');
    });
}

// ----------------------------------------------------------------------------------------------------------------

// можно было бы отсортировать исходную коллекцию и затем заново ее отрендерить. Но это лишние ресурсы, а кроме того,
// если на странице уже совершался поиск и некоторые "карточки с пиццами" приобрели атрибут style="display:none", 
// то после сортировки их придется заново обрабатывать в соответствии со словами, введенными в поиск. Поэтому будем 
// сортировать уже готовые элементы, взятые со страницы
function sortByPrice(order) {
    let imgContainer = document.getElementById('img-container');
    let pizzaCards = imgContainer.children;
    // делаем из коллекции массив (https://learn.javascript.ru/traversing-dom)
    pizzaCards = Array.prototype.slice.call(pizzaCards);
    // а теперь добавляем для каждого элемента свойство [Symbol.toPrimitive], по которому компаратор сможет
    // сравнивать эти элементы
    pizzaCards.forEach(elem => {
        // у нас для каждой карточки с пиццей установлен пользовательский атрибут data-price, в котором записана
        // цена пиццы. Теперь эту цену легко извлечь
        let price = parseInt(elem.dataset.price);
        // и записываем функцию, возвращающую цену, в [Symbol.toPrimitive]
        elem[Symbol.toPrimitive] = () => price;
        // сортируем по возрастанию
        if (order == 'asc') pizzaCards.sort((a, b) => b - a);
        if (order == 'desc') pizzaCards.sort((a, b) => a - b);

        // Теперь просто передвинуть элементы на странице на новые места.
        // "Все методы вставки автоматически удаляют узлы со старых мест" (https://learn.javascript.ru/modifying-document)
        pizzaCards.forEach(elem => imgContainer.prepend(elem));
    })
}

// ----------------------------------------------------------------------------------------------------------------

function attachSortToTheButtons() {
    document.getElementById('asc').addEventListener('click', () => sortByPrice('asc'));
    document.getElementById('desc').addEventListener('click', () => sortByPrice('desc'));
}

// ------------------------------------------------------------------------------------------------------ util

function anyMatchToArrayItems(compositionArr, matchLikeArray) {
    let isMatched = true;
    // превращаем matchLikeArray в массив (даже если из одного элемента).
    matchLikeArray = matchLikeArray.split(' ');
    // превращаем массив составляющих пиццы в единый string
    let compositionString = compositionArr.join(' ').toLowerCase();
    // если какой-либо из членов этого массива не имеет никаких соответствий в этом стринге, функция должна вернуть false
    for (let i = 0; i < matchLikeArray.length; i++) {
        if (compositionString.indexOf(matchLikeArray[i]) < 0) {
            isMatched = false;
            break;
        }
    }
    return isMatched;
}


// ====================================================================================== performing
showPizzas(pizzaList);
searchPizza();
attachSortToTheButtons();