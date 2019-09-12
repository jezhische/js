let primitive ='hi';
let referenced = {oho: 48};

function changeArgValue(arg) {
    arg = {uhu: 25,
    toString: function () {
        return `this.uhu = ${this.uhu}`;
    }};
    return arg;
}
changeArgValue.apply(referenced, )
let changed = changeArgValue(primitive);
alert('after handling: primitive = ' + primitive + ', changed = ' + changed);

changed = changeArgValue(referenced);
alert('after handling: referenced = ' + referenced + ', changed = ' + changed);


