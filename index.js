//   Необходимо реализовать функцию, которая принимает в качестве аргумента строку s, 
// содержащую любые буквы латинского алфавита а так-же скобки вида (){}[], и выдает 
// в результате наибольшую возможную строку, такую что она является подстрокой бесконечной 
// строки вида sssssss... и скобочные символы в ней составляют правильную скобочную 
// последовательность. Если такая строка имеет бесконечную длину, вернуть строку "Infinite". 
// Также необходимо реализовать тесты.


// Разрешенные символы - только лаитнские символы и скобки
let truesimvolregexp = /[^a-z\{\}\(\)\[\]]+/i;
let bracketsSet = new Set('(', ')', '[', ']', '{', '}');
let bracketsRegExp = /[^\{\}\(\)\[\]]+/i;

function FunctionS(data) {

    //Проверка на допустимые символы в строке 
    if (truesimvolregexp.test(data)) {

        console.log('Err string: ' + data);
        return 'Err';

    };


    // Проверка на бесконечную длинну (метод наростания ошибок)



    // Проверяем скобочную послеловательность и находим самую длинную 
    // [\(\{\[].*[\)\}\]




    // Возврат ощибки если не одно условие не применилось
    console.log('No progress Data: ' + data);
    return 'No progress';
}





function correctsequenceofbrackets(data) {
    data = data.toString();
    console.log('correctsequenceofbrackets Data: ' + data);
    //Убираем личние символы. заменяем их на пустую строку
    data.replace(bracketsRegExp, '')
    console.log('correctsequenceofbrackets: ' + data);




    // http://www.cyberforum.ru/python-beginners/thread2211586.html
    // Проверяем послеловательность 

    stack = [];
    for (i in data) {
        if (i in ('(', '[', '{')) {
            stack.append(i)
        } else if (i == M[stack[-1]]) {
            stack.pop()
        } else {
            console.log('Неправильная последовательность скобок');
            return false;
        }


        if (len(stack) = 0) {
            console.log('Правильная последовательность скобок');
            return true;

        } else {
            console.log('Неправильная последовательность скобок');
            return false;
        }


    }
};




module.exports.FunctionS = FunctionS;
module.exports.correctsequenceofbrackets = correctsequenceofbrackets;