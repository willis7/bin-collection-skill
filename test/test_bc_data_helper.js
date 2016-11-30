'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var BCDataHelper = require('../bc_data_helper');
chai.config.includeStack = true;


describe('BCDataHelper', function() {
  this.timeout(15000);
  var subject = new BCDataHelper();
  var post_code;

  describe('#getBinCollectionDay', function() {
    context('with a valid post code', function() {
      it('returns matching post code', function() {
        post_code = 'EX5+3EL';
        var value = subject.requestBinCollectionDay(post_code).then(function(obj) {
          return obj.UPRN;
        });
        return expect(value).to.eventually.eq('010000268169');
      });
    });
  });
});
