const assert = require('assert');
const indexjs = require('../index');

// Недопустимые символы
let errsymbol = [ '123()', '@()', '!()','/fretreter1()','&()'];

// хорошие последовательности
let goodexpectation = ['g(g)g(g)', '(g[g]g)', '(){g}[]', '()(){}'];


// Ошибочные последовательности
let errexpectation = ["{ [ } ]",  "([}])"];

// Подковырки
let gooddifficult = ['))((', '))]{}[(('];

// Не бесконечные послеловательности
let nummatrix = [
    ['()}', 0],
    ['(qq)}', 2],
    ['()}(qqqqq)', 5],
    ['(){(){[zzzzzzzz]', 8],
    ["())()", 0]
    ["(){(})[ddd]", 3]
  ];


describe("indexjs", function() {

    it("Тест 123", function() {
        assert.equal(123, 123);
    });

    it("Недопустимые символы", function() {
        errsymbol.forEach(function(item, i, arr) {
            assert.equal(indexjs.FunctionS(item), 'Err');
          });
        

    });
  


  });


