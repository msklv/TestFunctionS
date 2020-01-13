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

    // Хорошие беcконечные последовательности
    let goodexpectation = ['g(g)g(g)', '(g[g]g)', '(){g}[]', '()(){}'];

    it("Хорошие беcконечные последовательности", function() {
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


    // Подковырки (безконечные)
    let gooddifficult = ['))z((', '))]{z}[(('];

    it("Подковырки (безконечные)", function() {
        gooddifficult.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), 'Infinite');
        });
    });


    // Не бесконечные допустимые послеловательности
    let nummatrix = [
        ["(wwwww)}(qqqqq)", ["(wwwww)", "(qqqqq)"]],
        ['(qq)}', '(qq)'],
        ['()}(qqqqq)', '(qqqqq)'],
        ['(){(){[zzzzzzzz]', '[zzzzzzzz]'],
        ["())()", '()']
        ["(){(})[ddd]", '[ddd]'],
        ["uud](){(})[ddu", '[dduuud]']
        ['()}', '()']
    ];

    it("Не бесконечные допустимые послеловательности", function() {
        nummatrix.forEach(function(item, i, arr) {
            if (Array.isArray(item)) {
                if (Array.isArray(item[1])) {
                    let answer = item[1];
                    answer.forEach(function(answeritem, i, arr) {
                        assert.equal(indexjs.FunctionS(item[0]), answeritem); // Ошибка - проверяется только 1 вариант из массива
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

});