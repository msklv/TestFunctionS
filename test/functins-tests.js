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
        ['()}', '()'],
        ['(qq)}', '(qq)'],
        ['()}(qqqqq)', '(qqqqq)'],
        ['(){(){[zzzzzzzz]', '[zzzzzzzz]'],
        ["())()", '()']
        ["(){(})[ddd]", '[ddd]'],
        ["uud](){(})[ddu", '[dduuud]']
        ["(wwwww)}(qqqqq)", ["(wwwww)", "(qqqqq)"]]
    ];

    it("Не бесконечные допустимые послеловательности", function() {


        gooddifficult.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), 'Infinite');
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