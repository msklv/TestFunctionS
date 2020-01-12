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
const { expect } = require('chai');
const indexjs = require ('../index');


const foo = 'bar';
const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };



expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);



describe("indexjs", function() {

    it("Тестируем работу тестов", function() {
        assert.equal(indexjs.FunctionS(123), 123);

    });
  
    it("Тестируем возникновение ошибок ", function() {
        assert.equal(indexjs.FunctionS(123), 1234);
        assert.equal(indexjs.FunctionS(1234), 123);
    });





  });


