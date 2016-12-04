'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var BSDataHelper = require('../bs_data_helper');
chai.config.includeStack = true;


describe('BSDataHelper', function() {
  this.timeout(15000);
  var subject = new BSDataHelper();
  var post_code;

  // TODO: fix these brittle tests. They currently depend on the response order being exact each time. These should be stubbed
  // describe('#getBinCollectionDay', function() {
  //   context('with a valid post code', function() {
  //     it('returns matching label', function() {
  //       post_code = 'EX5+3JF';
  //       var value = subject.requestBinCollectionDay(post_code).then(function(obj) {
  //         return obj.LABEL;
  //       });
  //       return expect(value).to.eventually.eq('1 LONGMEADOW, BROADCLYST, EXETER,  EX5 3JF');
  //     });
  //   });
  // });
  //
  // describe('#getBinCollectionDay', function() {
  //   context('with a valid post code', function() {
  //     it('returns matching UPRN', function() {
  //       post_code = 'EX5+3JF';
  //       var value = subject.requestBinCollectionDay(post_code).then(function(obj) {
  //         return obj.UPRN;
  //       });
  //       return expect(value).to.eventually.eq('010000268236');
  //     });
  //   });
  // });

  describe('#formatResult', function () {
    context('which includes HTML', function () {
      it('removes HTML tags', function () {
          var dirtyResult = '<h2>Your recycling and food waste</h2><p class=\"boxtext-important text-centre\">Your next recycling and food waste collection will be on <em>Friday<br/>9 December 2016</em></p><p>We collect your recycling and food waste every week and your usual collection day is Friday. Your last collection was on Friday 2 December 2016.</p><h2>Your rubbish</h2><p class=\"boxtext-important text-centre\">Your next rubbish collection will be on <em>Friday<br/>9 December 2016</em></p><p>We collect your rubbish every two weeks and your usual collection day is Friday. Your last collection was on Friday 25 November 2016.</p><h2>Collections calendar</h2><p><a href=\"http://eastdevon.gov.uk/recycling-and-rubbish/when-is-my-bin-collected/future-collections-calendar/?UPRN=010000268236\" rel=\"nofollow\">View the scheduled collections for December 2016 - April 2017</a>.</p>'

          var actual = subject.formatResult(dirtyResult)

          return expect(actual).to.equal('Your recycling and food wasteYour next recycling and food waste collection will be on Friday9 December 2016We collect your recycling and food waste every week and your usual collection day is Friday. Your last collection was on Friday 2 December 2016.Your rubbishYour next rubbish collection will be on Friday9 December 2016We collect your rubbish every two weeks and your usual collection day is Friday. Your last collection was on Friday 25 November 2016.Collections calendarView the scheduled collections for December 2016 - April 2017.')
        });
      });
    });

  describe('#formatPostcode', function () {
    context('a malformed postcode', function() {
      it('is correctly encoded', function () {
        var dirtyPostCode = "ex43dx"
        var actual = subject.formatPostcode(dirtyPostCode)
        return expect(actual).to.equal("ex4+3dx")
      })
    })
  })
});
