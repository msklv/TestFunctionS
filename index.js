//   Необходимо реализовать функцию, которая принимает в качестве аргумента строку s, 
// содержащую любые буквы латинского алфавита а так-же скобки вида (){}[], и выдает 
// в результате наибольшую возможную строку, такую что она является подстрокой бесконечной 
// строки вида sssssss... и скобочные символы в ней составляют правильную скобочную 
// последовательность. Если такая строка имеет бесконечную длину, вернуть строку "Infinite". 
// Также необходимо реализовать тесты.



// Разрешенные символы - только латинские символы и скобки
let truesimvolregexp = /[^a-z\{\}\(\)\[\]]+/i;
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





function FunctionS(data) {

    //Проверка на допустимые символы в строке 
    if (truesimvolregexp.test(data)) {

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
    // если количесво ощибок равно на 3 и на 8 поторениях = значит поледовательность безконечна 
    let datarep3 = data + data + data;
    let datarep8 = datarep3 + datarep3 + data + data;
    if (counterUnorrectBrackets(datarep3) == counterUnorrectBrackets(datarep8)) {
        console.log("Infinite - " + data);
        return "Infinite";
    }
    console.log('');
    console.log('');
    console.log('%%%%%%%%%%%%%%%%-MAIN-%%%%%%%%%%%%%%%%%%%%%%');

    // Проверяем скобочную послеловательность и находим самую длинную правильную строку
    // 1) Для анализа используем строку длинной в 3s, тк это минимальный повторяющийся стэк
    // 2) Заменяем верные последовательности на спец символы "#"
    // 3) Находим самую длинную последовательность
    // 3.1) Находим номера начала и конца самой длинной последовательности "#"
    // 4) Возврашаем найденый массив символов из исходной строки 3s

    let maska = ReplaseCorrectBrackets (datarep3);
    let maxMaskCounter = maxMask (maska); 
    console.log('maxMaskCounter: ' + maxMaskCounter);
    if (maxMaskCounter == 0) {

        console.log('Fin: maska: '  + maska+ '. maxMaskCounter =0. Data: ' + data  )
        return '';
    };    

    // составляем regexp для maxMaskCounter
    let maskaCounterRegExp = new RegExp('\#{' + maxMaskCounter + '}', 'i');
    //console.log(maskaCounterRegExp);

    // Позиция первого и последнего символа в искомой подстроке
    let resultarray = maska.match(maskaCounterRegExp);

    let resultStartIndex = resultarray.index; 
    let resultStopIndex = resultarray.index + maxMaskCounter; 
    console.log('resultStartIndex: ' + resultStartIndex + '. resultStopIndex: ' + resultStopIndex);
        
    let result = '';
    for (let i = resultStartIndex; i<(resultStopIndex); i++) {
        
        result = result + datarep3[i];

    };
    
    return result;
}





///////////////  functions //////////////////////////////////

// Возвращаем длину максимальной маски
function maxMask (data){
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

// Возвращаем "маску" правильных последовательностей скобок
function ReplaseCorrectBrackets(data) {
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
    
    // Поочередно вырезваем успешные пары скобок пока вырадение не прекратит изменяться 
    let startdata = data;
    do {
        startdata = data;
        data = data.replace(BracketsMaskRegExp, function (x){
            let mask = '';
            for (let i = 0; i < x.length; i++ ) {
                mask = mask + '#';
            };
            //console.log('Mask: ' + mask);
            return  mask;
        });
        console.log('Replase: ' + data);

    } while (data != startdata);

    return data;
};



// Функция возвращает количество "скобочных" ошибок в строке 
function counterUnorrectBrackets(data) {
    // Быстро возвращаем полностью корректную строку 
    if (correctSequenceOfBrackets(data)) {
        return 0
    };

    //Убираем личние символы. заменяем их на пустую строку
    data = data.replace(bracketsRegExp, '')


    // Поочередно вырезваем успешные пары скобок пока вырадение не прекратит изменяться 
    let startdata = data;
    do {
        startdata = data;
        //console.log('Start replase: ' + startdata);

        data = data.replace(BracketsCloseRegExp, '');
        // console.log('Replase: ' + data);

    } while (data != startdata);
    //возвращаем длину оставшихся символов  = ошибочных скобок 
    return data.length;
};




// Проверка на наличие ошибок в строке
function correctSequenceOfBrackets(data) {
    //Убираем лишние символы. заменяем их на пустую строку
    data = data.replace(bracketsRegExp, '')

    // Проверяем последовательность 

    let stack = [];
    for (let i = 0; i < data.length; i++) {
        let datachar = data.charAt(i);
        // console.log('i= ' + i + '.  Datachar: ' + datachar);
        if ((datachar == '(') || (datachar == '[') || (datachar == '{')) {
            stack.push(datachar);
            // console.log('push ' + datachar);
        } else if (datachar == matchingBrackets[stack[stack.length - 1]]) {
            stack.pop();
            // console.log('pop ' + datachar);
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