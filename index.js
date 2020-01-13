//   Необходимо реализовать функцию, которая принимает в качестве аргумента строку s, 
// содержащую любые буквы латинского алфавита а так-же скобки вида (){}[], и выдает 
// в результате наибольшую возможную строку, такую что она является подстрокой бесконечной 
// строки вида sssssss... и скобочные символы в ней составляют правильную скобочную 
// последовательность. Если такая строка имеет бесконечную длину, вернуть строку "Infinite". 
// Также необходимо реализовать тесты.



// Разрешенные символы - только лаитнские символы и скобки
let truesimvolregexp = /[^a-z\{\}\(\)\[\]]+/i;
// Проверка скобочной последовательности
let bracketsRegExp = /[^\{\}\(\)\[\]]+/gi;
// Сопоставление скобок
let matchingBrackets = {
    '(': ')',
    '[': ']',
    '{': '}'
};






function FunctionS(data) {

    //Проверка на допустимые символы в строке 
    if (truesimvolregexp.test(data)) {

        console.log('Err string: ' + data);
        return 'Err';

    };

    // Возврат пустой строки 
    if ((data == '')||(data==null)) {
        return '';
    };



    // Проверка на бесконечную длинну (метод наростания ошибок)



    // Проверяем скобочную послеловательность и находим самую длинную 
    // [\(\{\[].*[\)\}\]




    // Возврат ощибки если не одно условие не применилось
    console.log('No progress Data: ' + data);
    return 'No progress';
}





function correctsequenceofbrackets(data) {
    //Убираем личние символы. заменяем их на пустую строку
    data = data.replace(bracketsRegExp, '')

    // http://www.cyberforum.ru/python-beginners/thread2211586.html
    // Проверяем послеловательность 

    let stack = [];
    for (let i = 0; i < data.length; i++) {
        var datachar = data.charAt(i);
        // console.log('i= ' + i + '.  Datachar: ' + datachar);
        if ((datachar == '(') || (datachar == '[') || (datachar == '{')) {
            stack.push(datachar);
            // console.log('push ' + datachar);
        } else if (datachar == matchingBrackets[stack[stack.length - 1]]) {
            stack.pop();
            // console.log('pop ' + datachar);
        } else {
            console.log('Неправильная последовательность скобок, i=' + i + '. Data: ' + data);
            return false;
        };


    }

    if (stack.length == 0) {
        //console.log('Правильная последовательность скобок');
        console.log('Правильная последовательность скобок: ' + data)
        return true;
    } else {
        console.log('НЕ правильная последовательность скобок: ' + data)
        //console.log('Неправильная последовательность скобок');
        return false;
    };

};




module.exports.FunctionS = FunctionS;
module.exports.correctsequenceofbrackets = correctsequenceofbrackets;