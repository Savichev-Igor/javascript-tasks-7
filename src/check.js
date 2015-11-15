'use strict';

/**
 * @author Savi
 *
 * Элегантный метод, который умеет расширять переданный прототип.
 * @param {object} itemPrototype - расширяемый прототип.
 * @param {string} methodName - название нового метода.
 * @param {function} func - сам метод.
 */
function smartDefineProperty(itemPrototype, methodName, func) {
    Object.defineProperty(itemPrototype, methodName, {
        value: func
    });
}

/**
 * @author Savi
 *
 * Метод определён для объектов и массивов. Проверяет, что цель содержит указанные ключи.
 * @param {array} keys
 * @return {boolean|undefined}
 */
function checkContainsKeys(keys) {
    var objKeys = [];

    if ((this instanceof Array) || (this instanceof Object)) {
        // Если объект, то мы ещё возьмём и ключи прототипов :3
        for (var key in this) {
            objKeys.push(key);
        }
    }
    if (objKeys.length === 0) {
        return;
    }

    return keys.every(function (key) {
        return objKeys.indexOf(key) !== -1;
    });
}

/**
 * @author Savi
 *
 * Определён для объектов и массивов. Проверяет, что цель содержит только указанные ключи.
 * @param {array} keys
 * @return {boolean|undefined}
 */
function checkHasKeys(keys) {
    var objKeys = [];

    if ((this instanceof Array) || (this instanceof Object)) {
        // Если объект, то мы ещё возьмём и ключи прототипов :3
        for (var key in this) {
            objKeys.push(key);
        }
    }
    if (objKeys.length === 0) {
        return;
    }

    return objKeys.length === keys.length && this.checkContainsKeys(keys);
}

/**
 * @author Savi
 *
 * Метод определён для объектов и массивов. Проверяет, что цель содержит указанные значения.
 * @param {array} values
 * @return {boolean|undefined}
 */
function checkContainsValues(values) {
    var objValues = [];

    /* Почему-то для массива верны оба оператора - и 'this instanceof Object' и
       'this instanceof Array'  :/ */
    if (this instanceof Array) {
        objValues = this.slice();
    } else {
        if (this instanceof Object) {
            for (var key in this) {
                objValues.push(this[key]);
            }
        }
    }
    if (objValues.length === 0) {
        return;
    }

    return values.every(function (value) {
        return objValues.indexOf(value) !== -1;
    });
}

/**
 * @author Savi
 *
 * Метод определён для объектов и массивов. Проверяет, что цель содержит только указанные значения.
 * @param {array} values
 * @return {boolean|undefined}
 */
function checkHasValues(values) {
    var objValues = [];

    /* Почему-то для массива верны оба оператора - и 'this instanceof Object' и
     'this instanceof Array'  :/ */
    if (this instanceof Array) {
        objValues = this.slice();
    } else {
        if (this instanceof Object) {
            for (var key in this) {
                objValues.push(this[key]);
            }
        }
    }
    if (objValues.length === 0) {
        return;
    }

    return objValues.length === values.length && this.checkContainsValues(values);
}

/**
 * @author Savi
 *
 * Метод определён для объектов и массивов. Проверяет, что значение по указанному ключу относится к
 * указанному типу. Поддерживаемые типы: `String`, `Number`, `Function`, `Array`.
 * @param {string} key
 * @param {constructor} type
 * @return {boolean|undefined|string}
 */
function checkHasValueType(key, type) {
    if ((this instanceof Array) || (this instanceof Object)) {
        if ([String, Number, Function, Array].indexOf(type) === -1) {
            return 'Wrong type!';
        }
    } else {
        return;
    }

    // Просто проинициализируем ещё раз конструктором и сравним без приведения типов
    return type(this[key]) === this[key];
}

/**
 * @author Savi
 *
 * Метод определён для массивов и строк. Проверяет, что длина цели соответствует указанной.
 * @param {number} length
 * @return {boolean|undefined}
 */
function checkHasLength(length) {
    // Последняя проверка, если строка создана не через конструктор...
    if ((this instanceof String) || (this instanceof Array) || (typeof this === 'string')) {
        return this.length === length;
    }
}

/**
 * @author Savi
 *
 * Метод определён для функций. Проверяет, что количество аргументов функции соответствует
 * указанному.
 * @param {number} count
 * @return {boolean|undefined}
 */
function checkHasParamsCount(count) {
    if (this instanceof Function) {
        return this.length === count;
    }
}

/**
 * @author Savi
 *
 * Метод определён для строк. Проверяет, что количество слов в строке соответствует указанному.
 * Словом считается последовательность символов, ограниченная с обеих сторон пробелами или
 * началом/концом строки.
 * @param {number} count
 * @return {boolean|undefined}
 */
function checkHasWordsCount(count) {
    // Последняя проверка, если строка создана не через конструктор...
    if ((this instanceof String) || (typeof this === 'string')) {
        return this.split(' ').length === count;
    }
}

/**
 * @author Savi
 *
 * Основной метод, который расширяет указанные прототипы новыми методами.
 * @return {undefined}
 */
exports.init = function () {
    /* Мне кажется, что указание 'Array.prototype' излишне, т.к. всё равно в поиске этого метода он
       дойдет до 'Object.prototype', тем более некоторые методы эквивалентны */
    [Object.prototype].forEach(function (item) {
        smartDefineProperty(item, 'checkContainsKeys', checkContainsKeys);
    });
    [Object.prototype].forEach(function (item) {
        smartDefineProperty(item, 'checkHasKeys', checkHasKeys);
    });
    [Object.prototype].forEach(function (item) {
        smartDefineProperty(item, 'checkContainsValues', checkContainsValues);
    });
    [Object.prototype].forEach(function (item) {
        smartDefineProperty(item, 'checkHasValues', checkHasValues);
    });
    [Object.prototype].forEach(function (item) {
        smartDefineProperty(item, 'checkHasValueType', checkHasValueType);
    });
    [Array.prototype, String.prototype].forEach(function (item){
        smartDefineProperty(item, 'checkHasLength', checkHasLength);
    });
    [Function.prototype].forEach(function (item) {
        smartDefineProperty(item, 'checkHasParamsCount', checkHasParamsCount);
    });
    [String.prototype].forEach(function (item){
        smartDefineProperty(item, 'checkHasWordsCount', checkHasWordsCount);
    });
};
