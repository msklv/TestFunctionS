const assert = require('assert');
const indexjs = require('../index');


describe("indexjs", function() {

    it("Тест 123", function() {
        assert.equal(123, 123);
    });

    // Недопустимые символы
    let errsymbol = ['123()', '@()', '!()', '/fretreter1()', '&()', "{ [ } ]", ];

    it("Недопустимые символы", function() {
        errsymbol.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), 'Err');
        });
    });

    // Простые и правильные бесконечные последовательности
    let goodexpectation = ['g(g)g(g)', '(g[g]g)', '(){g}[]', '()(){}', '([{}]())','gg'];

    it("Хорошие бесконечные последовательности", function() {
        goodexpectation.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), 'Infinite');
        });
    });

    // Ошибочные нулевые последовательности
    let errexpectation = ["{[}]", "([}])"];

    it("Ошибочные нулевые последовательности", function() {
        errexpectation.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), '');
        });
    });


    // Подковырки (бесконечные)
    let gooddifficult = ['))z((', '))]{z}[(('];

    it("Подковырки (бесконечные)", function() {
        gooddifficult.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), 'Infinite');
        });
    });


    // Не бесконечные допустимые последовательности
    let nummatrix = [
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

    it("Не бесконечные допустимые послеловательности", function() {
        nummatrix.forEach(function(item, i, arr) {
            if (Array.isArray(item)) {
                if (Array.isArray(item[1])) {
                    let answer = item[1];
                    answer.forEach(function(answeritem, i, arr) {
                        assert.equal(indexjs.FunctionS(item[0]), answeritem);
                    });
                } else {
                    assert.equal(indexjs.FunctionS(item[0]), item[1]);
                }
            }
        });
    });



    // Пустая строка и нул
    let testnull = [null, ''];
    it("Пустая строка и нул", function() {
        testnull.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), '');
        });
    });


    // Правильная последовательность скобок
    it("Правильная последовательность скобок", function() {
        goodexpectation.forEach(function(item, i, arr) {
            assert.equal(indexjs.correctSequenceOfBrackets(item), true);
        });
    });

    // НЕ правильная последовательность скобок
    it("НЕ правильная последовательность скобок", function() {
        errexpectation.forEach(function(item, i, arr) {
            assert.equal(indexjs.correctSequenceOfBrackets(item), false);
        });
    });


});