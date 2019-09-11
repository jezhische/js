console.log(pizzaList);
console.log(compositionList);

function getSortArrByPrice(arr, identifier) {
    // глубокое клонирование - необходимо, поскольку иначе при дальнейшей работе функции getSortArrByPrice произойдет
    // следующее.
    // И в java, и в javascript в аргументы фунции передается ЗНАЧЕНИЕ переменной, а НЕ ССЫЛКА на переменную (passing-by-value,
    // передача параметров по значению). Если переменная - это примитив, то замена значения такой переменной на другое
    // внутри функции никак не повлияет на исходную переменную. Однако, если это объект, то наша переменная
    // САМА ПО СЕБЕ ЯВЛЯЕТСЯ ССЫЛКОЙ на значение объекта, хранящееся где-то в памяти. Если мы передаем значение
    // этой ссылки в параметры функции, а потом внутри функции пытаемся присвоить новое значение этой ссылке, то
    // у исходной переменной значение ссылки никак не меняется.
    // Но если мы ПРОЙДЕМ по этой ссылке и поменяем внутренности объекта, то мы будем менять исходную переменную -
    // значение ссылки у нее не поменяется, а вот содержание - поменяется.
    // Массив в js - это объект, и в параметры функции я передаю значение ссылки на этот объект, а не значение
    // самого объекта. Если я внутри функции отсортирую массив, переданный в параметры моей функции, то это
    // будет означать, что я прошел по ссылке и поменял исходный объект. Поскольку console.log() работает уже после
    // того, как объект преобразован и "всплыл", то в результате в первых строчках (console.log(pizzaList); и т.д),
    // да и во всех последующих, я распечатаю уже отсортированный массив.
    // Чтобы такой пакости не произошло, делаем клон массива, полученного в аргументах функции, и дальше работаем с
    // клоном и возвращаем клон.

    // если объект не содержит "Dates, functions, undefined, Infinity, RegExps, Maps, Sets, Blobs, FileLists, ImageDatas,
    // sparse Arrays, Typed Arrays or other complex types", то глубокое клонирование возможно так:
    // JSON.parse(JSON.stringify(object))
    // но это не рекомендуется. Метод clone() годится только для поверхностного клонирования. Поэтому проще всего
    // просто создать наследника нашего массива и работать с ним:
    let clone = Object.create(arr);

    // тоже годится:
//    let clone = Object.assign([], arr);


    // Добавляем к каждому объекту массива специальное свойство, которое позволит сравнивать объекты по принципу
    // "меньше-больше", в данном случае, по цене.
    // https://learn.javascript.ru/object-toprimitive
    clone.forEach(elem => elem[Symbol.toPrimitive] = function (hint) {
        return this.price;
    });

    // ну, и сам метод)):
    switch (identifier) {
        case 'ascending':
            clone = clone.sort(sortAsc);
        break;
        case('descending') :
            clone = clone.sort(sortDesc);
            break;
        default :
            console.log('wrong identifier');
            clone = null;
    }
    return clone;
}

// https://learn.javascript.ru/array-methods
function sortAsc(a, b) {
    return a - b;
}

function sortDesc(a, b) {
    return b - a;
}

console.log(getSortArrByPrice(pizzaList, 'hu'));
console.log(getSortArrByPrice(pizzaList, 'ascending'));
console.log(getSortArrByPrice(pizzaList, 'descending'));
// console.log(getSortArrByPrice()); // main.js:6 Uncaught TypeError: Cannot read property 'forEach' of undefined
// at getSortArrByPrice (main.js:6)
// at main.js:36