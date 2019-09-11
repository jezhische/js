console.log(emplyeeArr);

// task 1:
function Employee(someEmployee) {
    let employeePropertiesNames = Object.keys(someEmployee);
    let employeePropertiesValues = Object.values(someEmployee);
    for (let i = 0; i < employeePropertiesValues.length; i++) {
        this[employeePropertiesNames[i]] = employeePropertiesValues[i];
    }
}
// test
let original = emplyeeArr[0];
let clone = new Employee(original);
let workable = true;
let originalKeys = Object.keys(original);
let cloneKeys = Object.keys(clone);
let originalValue = Object.values(original);
let cloneValue = Object.values(clone);
for (let i = 0; i < originalKeys.length; i++)
    if (cloneKeys[i] !== originalKeys[i] &&
        cloneValue[i] !== originalValue[i]) workable = false;

console.log('clone equals original: ' + workable);

// ----------------------------------------------------------------------------------------

// task 2:
Employee.prototype = {getFullName: function() {return this.surname + ' ' + this.name}};
// test
clone = new Employee(emplyeeArr[1]);
let splitFullName = clone.getFullName().split(' ');
workable = emplyeeArr[1].surname === splitFullName[0] && emplyeeArr[1].name === splitFullName[1];
console.log('getFullName() works: ' + workable);

// ----------------------------------------------------------------------------------------

// task 3:
let emplyeeConstructArr = [];
emplyeeArr.forEach(emp => emplyeeConstructArr.push(new Employee(emp)));

// task4:
function getFullNamesFromArr(arr) {
    let fullNames = [];
    emplyeeConstructArr.forEach(emp => fullNames.push(emp.getFullName()));
    return fullNames;
}
// test for tasks 3, 4
let fullNames = getFullNamesFromArr(emplyeeConstructArr);
console.log('everything works: ' + (emplyeeConstructArr[2].surname === fullNames[2].split(' ')[0] &&
    emplyeeConstructArr[2].name === fullNames[2].split(' ')[1]));