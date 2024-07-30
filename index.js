//   Необходимо реализовать функцию, которая принимает в качестве аргумента строку s, 
// содержащую любые буквы латинского алфавита а так-же скобки вида (){}[], и выдает 
// в результате наибольшую возможную строку, такую что она является подстрокой бесконечной 
// строки вида sssssss... и скобочные символы в ней составляют правильную скобочную 
// последовательность. Если такая строка имеет бесконечную длину, вернуть строку "Infinite". 
// Также необходимо реализовать тесты.


// ________________________________ Константы _________________________________________
// Разрешенные символы - только латинские символы и скобки
let trueSymbolRegExp = /[^a-z\{\}\(\)\[\]]+/i;
// Проверка скобочной последовательности
let bracketsRegExp = /[^\{\}\(\)\[\]]+/gi;
// Сопоставление скобок
let matchingBrackets = {
    '(': ')',
    '[': ']',
    '{': '}'
};
// Для исключения правильных связок скобок
let BracketsCloseRegExp = /(\{\})+|(\(\))+|(\[\])+/gi;
// Для исключения правильных связок скобок без учета маски "#"
let BracketsMaskRegExp = /(\{\#*\})+|(\(\#*\))+|(\[\#*\])+/gi;



// _______________________________________ Логика _________________________________________

/**
 * Функция, которая обрабатывает входную строку и возвращает подстроку с максимальной длиной правильной скобочной последовательности.
 * @param {string} data - входная строка, содержащая буквы латинского алфавита и скобки вида (){}[].
 * @returns {string} - подстрока с максимальной длиной правильной скобочной последовательности.
 */
function FunctionS(data) {

    //Проверка на допустимые символы в строке 
    if (trueSymbolRegExp.test(data)) {

        console.log('Err string: ' + data);
        return 'Err';

    };

    // Возврат пустой строки 
    if ((data == '') || (data == null)) {
        return '';
    };


    // Возвращаем явные бесконечные последовательности
    if (correctSequenceOfBrackets(data)) {
        return "Infinite";
    };



    // Проверка на бесконечную длину (метод нарастания ошибок)
    // если количество ошибок равно на 3 и на 8 повторениях = значит последовательность бесконечна 
    let dataRepeat3 = data + data + data;
    let dataRepeat8 = dataRepeat3 + dataRepeat3 + data + data;
    if (counterIncorrectBrackets(dataRepeat3) == counterIncorrectBrackets(dataRepeat8)) {
        console.log("Infinite - " + data);
        return "Infinite";
    }
    console.log('');
    console.log('');


    // Проверяем скобочную последовательность и находим самую длинную правильную строку
    // 1) Для анализа используем строку длинной в 3s, тк это минимальный повторяющийся стек
    // 2) Заменяем верные последовательности на спец символы "#"
    // 3) Находим самую длинную последовательность
    // 3.1) Находим номера начала и конца самой длинной последовательности "#"
    // 4) Возвращаем найденный массив символов из исходной строки 3s

    let mask = ReplaceCorrectBrackets (dataRepeat3);
    let maxMaskCounter = maxMask (mask); 
    console.log('maxMaskCounter: ' + maxMaskCounter);
    if (maxMaskCounter == 0) {

        console.log('Fin: mask: '  + mask+ '. maxMaskCounter =0. Data: ' + data  )
        return '';
    };    

    // составляем regexp для maxMaskCounter
    let maskCounterRegExp = new RegExp('\#{' + maxMaskCounter + '}', 'i');
    //console.log(maskCounterRegExp);

    // Позиция первого и последнего символа в искомой подстроке
    let resultArray = mask.match(maskCounterRegExp);

    let resultStartIndex = resultArray.index; 
    let resultStopIndex = resultArray.index + maxMaskCounter; 
    console.log('resultStartIndex: ' + resultStartIndex + '. resultStopIndex: ' + resultStopIndex);
        
    let result = '';
    for (let i = resultStartIndex; i<(resultStopIndex); i++) {
        
        result = result + dataRepeat3[i];

    };
    
    return result;
}



//_______________________________________ Функции _________________________________________
/**
 * Возвращает длину максимальной маски в строке.
 * @param {string} data - входная строка, содержащая буквы латинского алфавита и скобки вида (){}[].
 * @returns {number} - длина максимальной маски в строке.
 */
function maxMask(data) {
    let counter = 0;
    data.replace(/\#+/ig, function (x){
        if (counter < x.length){
            counter = x.length; 
        };
        //console.log('maxMask: ' + counter);
        return;
    });
    return counter;
};

/**
 * Заменяет корректные скобочные последовательности на маску.
 * @param {string} data - входная строка, содержащая буквы латинского алфавита и скобки вида (){}[].
 * @returns {string} - строка с замененными корректными скобочными последовательностями на маску.
 */
function ReplaceCorrectBrackets(data) {
    console.log('Start Mask: ' + data);
    //Заменяем символы на маску 
    data = data.replace(bracketsRegExp, function (x){
        let mask = '';
        for (let i = 0; i < x.length; i++ ) {
            mask = mask + '#';
        };
        //console.log('Mask: ' + mask);
        return  mask;
    });
    
    // Поочередно убираем корректные пары скобок пока выражение не прекратит изменяться 
    let startData = data;
    do {
        startData = data;
        data = data.replace(BracketsMaskRegExp, function (x){
            let mask = '';
            for (let i = 0; i < x.length; i++ ) {
                mask = mask + '#';
            };
            //console.log('Mask: ' + mask);
            return  mask;
        });
        console.log('Replace: ' + data);

    } while (data != startData);

    return data;
};


/**
 * Подсчитывает количество "скобочных" ошибок в строке.
 * @param {string} data - входная строка, содержащая буквы латинского алфавита и скобки вида (){}[].
 * @returns {number} - количество "скобочных" ошибок в строке.
 */
function counterIncorrectBrackets(data) {
    // Быстро возвращаем полностью корректную строку 
    if (correctSequenceOfBrackets(data)) {
        return 0
    };

    //Убираем лишние символы. заменяем их на пустую строку
    data = data.replace(bracketsRegExp, '')


    // Поочередно убираем успешные пары скобок пока выражение не прекратит изменяться 
    let startData = data;
    do {
        startData = data;
        //console.log('Start replace: ' + startData);

        data = data.replace(BracketsCloseRegExp, '');
        // console.log('Replace: ' + data);

    } while (data != startData);
    
    //возвращаем длину оставшихся символов  = ошибочных скобок 
    return data.length;
};




/**
 * Проверяет правильность скобочной последовательности в строке.
 * @param {string} data - входная строка, содержащая буквы латинского алфавита и скобки вида (){}[].
 * @returns {boolean} - true, если скобочная последовательность правильная, false в противном случае.
 */
function correctSequenceOfBrackets(data) {
    //Убираем лишние символы. заменяем их на пустую строку
    data = data.replace(bracketsRegExp, '')

    // Проверяем последовательность символов
    let stack = [];
    for (let i = 0; i < data.length; i++) {
        let dataChar = data.charAt(i);
        // console.log('i= ' + i + '.  dataChar: ' + dataChar);
        if ((dataChar == '(') || (dataChar == '[') || (dataChar == '{')) {
            stack.push(dataChar);
            // console.log('push ' + dataChar);
        } else if (dataChar == matchingBrackets[stack[stack.length - 1]]) {
            stack.pop();
            // console.log('pop ' + dataChar);
        } else {
           // console.log('Неправильная последовательность скобок, i=' + i + '. Data: ' + data);
            return false;
        };
    }

    if (stack.length == 0) {
       // console.log('Правильная последовательность скобок: ' + data)
        return true;
    } else {
        //console.log('НЕ правильная последовательность скобок: ' + data)
        return false;
    };

};



module.exports.FunctionS = FunctionS;
module.exports.correctSequenceOfBrackets = correctSequenceOfBrackets;
