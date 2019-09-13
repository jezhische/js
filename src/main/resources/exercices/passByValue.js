let primitive ='hi';
let referenced = {
    oho: 48,
    // toString: () => `this[uhu] = ${this['uhu']}, this[oho] = ${this['oho']}` // так нельзя: стрелочная функция не имеет this
    toString: () => `this[uhu] = ${this['uhu']}, this[oho] = ${this['oho']}`
};

// в методе заменяем значение переменной, переданной в аргументы, на новое и возвращаем его;
// изменится ли значение исходной переменной?
function changeArgValue(arg) {
    arg = {uhu: 25,
    toString: function () {
        return `this[uhu] = ${this['uhu']}, this[oho] = ${this['oho']}`;
    }};
    return arg;
}
// changeArgValue.apply(referenced, );

alert(referenced.oho);
alert(`before handling: primitive = ${primitive}`);
let changed = changeArgValue(primitive);
alert(`after handling: primitive = ${primitive}, changed = ${changed}`); // значение исходной переменной не поменялось

alert(`before handling: referenced = ${referenced}`);
changed = changeArgValue(referenced);
alert(`after handling: primitive = ${primitive}, changed = ${changed}`); // значение исходной переменной не поменялось

// в этом методе