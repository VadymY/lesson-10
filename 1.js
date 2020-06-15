/**
 * Задача 1.
 *
 * Напишите имплементацию функции Function.prototype.bind().
 *
 * Наша собственная функция bind() должна задавать контекст выполнения целевой функции,
 * и возвращать новую, привязанную версию целевой функции.
 *
 * Функция bind() должна обладать следующими параметрами:
 * - Первый параметр — это функция, контекст выполнения которой мы хотим привязать;
 * - Второй параметр — это объект (не массив), в контексте которого нужно вызывать функцию из первого параметра;
 * - Третий и все остальные параметры — это аргументы для вызова функции из первого параметра.
 *
 * Генерировать ошибки если:
 * - Первый параметр не является типом function;
 * - Второй параметр не является типом object;
 * - Второй параметр является массивом.
 *
 * Условия:
 * - Использовать встроенную функцию Function.prototype.bind() запрещено.
 */

// Решение

function bind(cb, obj, ...arg) {
    if (typeof(cb) !== "function"){
        throw new Error("it is not a function");
    }
    if (typeof(obj) !== "object"){
        throw new Error("it is not an object");
    }
    if (Array.isArray(obj)){
        throw new Error("it is an array");
    }
    this.name = obj.name;
    return () => cb(...arg);
}

function getName(greeting, message) {
    return `${greeting} ${message} ${this.name}.`;
}

const user = {name: 'Walter', getName};
const oliver = {name: 'Oliver'};

const boundedGetName = bind(getName, oliver, 'Hello!', 'I am');

console.log(user.getName('Hello!', 'My name is')); // Hello! My name is Walter.
console.log(boundedGetName()); // Hello! I am Oliver.

exports.bind = bind;
