const assert = require('assert');
const indexJs = require('../index');


describe("indexJs", function() {

    it("Тест 123", function() {
        assert.equal(123, 123);
    });

    // Недопустимые символы
    let errorSymbol = ['123()', '@()', '!()', '/ferreter1()', '&()', "{ [ } ]", ];

    it("Недопустимые символы", function() {
        errorSymbol.forEach(function(item, i, arr) {
            assert.equal(indexJs.FunctionS(item), 'Err');
        });
    });

    // Простые и правильные бесконечные последовательности
    let goodExpectation = ['g(g)g(g)', '(g[g]g)', '(){g}[]', '()(){}', '([{}]())','gg'];

    it("Хорошие бесконечные последовательности", function() {
        goodExpectation.forEach(function(item, i, arr) {
            assert.equal(indexJs.FunctionS(item), 'Infinite');
        });
    });

    // Ошибочные нулевые последовательности
    let errorExpectation = ["{[}]", "([}])"];

    it("Ошибочные нулевые последовательности", function() {
        errorExpectation.forEach(function(item, i, arr) {
            assert.equal(indexJs.FunctionS(item), '');
        });
    });


    // Подковырки (бесконечные)
    let gooddifficult = ['))z((', '))]{z}[(('];

    it("Подковырки (бесконечные)", function() {
        gooddifficult.forEach(function(item, i, arr) {
            assert.equal(indexJs.FunctionS(item), 'Infinite');
        });
    });


    // Не бесконечные допустимые последовательности
    let numMatrix = [
        ["(wwwww)}(qqqqq)", '(qqqqq)(wwwww)'],
        ['(qq)}', '(qq)'],
        ['()}(qqqqq)', '(qqqqq)()'],
        ['(){(){[zzzzzzzz]', '[zzzzzzzz]()'],
        ["())()", '()']
        ["(){(})[ddd]", '[ddd]'],
        ["uud](){(})[ddu", '[dduuud]']
        ['()}', '()'],
        ["(((((((()))))", '((((()))))']
    ];

    it("Не бесконечные допустимые последовательности", function() {
        numMatrix.forEach(function(item, i, arr) {
            if (Array.isArray(item)) {
                if (Array.isArray(item[1])) {
                    let answer = item[1];
                    answer.forEach(function(answerItem, i, arr) {
                        assert.equal(indexJs.FunctionS(item[0]), answerItem);
                    });
                } else {
                    assert.equal(indexJs.FunctionS(item[0]), item[1]);
                }
            }
        });
    });



    // Пустая строка и нул
    let testNull = [null, ''];
    it("Пустая строка и нул", function() {
        testNull.forEach(function(item, i, arr) {
            assert.equal(indexJs.FunctionS(item), '');
        });
    });


    // Правильная последовательность скобок
    it("Правильная последовательность скобок", function() {
        goodExpectation.forEach(function(item, i, arr) {
            assert.equal(indexJs.correctSequenceOfBrackets(item), true);
        });
    });

    // НЕ правильная последовательность скобок
    it("НЕ правильная последовательность скобок", function() {
        errorExpectation.forEach(function(item, i, arr) {
            assert.equal(indexJs.correctSequenceOfBrackets(item), false);
        });
    });


});