/**
 * Задача 4.
 *
 * Напишите функции compose(), которая в качестве аргументов принимает неограниченное количество функций.
 *
 * При запуске compose() последовательно запускает коллбек-функции из аргументов.
 *
 * Важно: compose() выполняет коллбек-функции из аргументов НАЧИНАЯ С КОНЦА.
 *
 * Каждая коллбек-функция из цепочки в качестве своего аргумента принимает то, что возвращает предыдущая коллбек-функция.
 * То есть возвращаемое значение каждой коллбек-функции из цепочки
 * становится доступным из параметра следующей коллбек-функции в цепочке.
 *
 * Функция compose() возвращает ещё одну функцию с одним параметром.
 * Значение, переданное этой функции в качестве аргумента должно стать
 * параметром первой коллбек-функции в цепочке выполнения функции compose().
 *
 * Итого, подпись функции compose: `compose(f, g)(x) = f(g(x))`.
 *
 * Генерировать ошибки если:
 * - Любой из аргументов не является функцией;
 * - Любая функция из аргументов не вернула значение.
 *
 * Заметка:
 * Если функции, которая является возвращаемым значением compose()
 * не передать в качестве аргумента какое-либо значение, генерировать ошибку не нужно.
 */

// Решение
// function compose(...cb){
//
//     this.cbs = [];
//
//     for (let  i = 0; i < cb.length; i++){
//         this.cbs.push(cb[i]);
//     }
//
//     return (arg) => {
//         let next_arg = arg;
//           if (typeof(next_arg) !== "undefined"){
//             next_arg = String(next_arg);
//         }
//
//         for (let i = this.cbs.length - 1;  i >= 0; i--){
//             if (typeof(this.cbs[i]) !== "function"){
//                 throw new Error('it is not function');
//             }
//
//             next_arg = this.cbs[i](next_arg);
//
//             if (typeof(next_arg) === "undefined"){
//                 throw new Error('function did not return a parameter');
//             }
//         }
//
//         return next_arg;
//     }
// }

function compose(...cb) {

    this.cbs = [];

    for (let i = 0; i < cb.length; i++) {
        this.cbs.push(cb[i]);
    }

    return (arg) => this.cbs.reduceRight(function (prev, item, index, arr) {
        if (typeof (item) !== "function") {
            throw new Error('it is not a function');
        }
        let temp = item(prev);
        if (typeof (temp) === "undefined") {
            throw new Error('function did not return a parameter');
        }

        return temp;
    }, arg);
}


const result1 = compose(
    prevResult => prevResult + 'o',
    prevResult => prevResult + 'l',
    prevResult => prevResult + 'l',
    prevResult => prevResult + 'e'
)('h');
const result2 = compose(
    prevResult => prevResult + 'o',
    prevResult => prevResult + 'l',
    prevResult => prevResult + 'l',
    prevResult => prevResult + 'e',
    () => 'h',
)();

console.log(result1); // 'hello'
console.log(result2); // 'hello'

exports.compose = compose;
