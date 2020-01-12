// Неверные символы
//'123()'
//'@()'
//'!()'
//'/fretreter1()'
//'&()'

// хорошие последовательности 
//'()()'
//'([])'
//'(){}[]'

// Ошибочные
//'{ [ } ]'

// Подковырки
//'))(('
//'))]{}[(('


const assert = require('assert');
const indexjs = require('../index');


const foo = 'bar';
const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };



describe("indexjs", function() {

    it("Тест 123", function() {
        assert.equal(123, 123);
    });

    it("Тестируем работу тестов", function() {
        assert.equal(indexjs.FunctionS(123), 123);

    });
  
    it("Тестируем возникsновение ошибок ", function() {
        assert.equal(indexjs.FunctionS(123), 123);
        assert.equal(indexjs.FunctionS(1234), 123);
    });





  });


