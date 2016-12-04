'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://eastdevon.gov.uk/addressfinder?qtype=bins&term=';

function BSDataHelper() {
}

// requestBinCollectionDay returns the response from the call to getBinCollectionDay
BSDataHelper.prototype.requestBinCollectionDay = function (postCode) {

  return this.getBinCollectionDay(postCode).then(
    function (response) {
      console.log('success - received bin info for ' + postCode);
      return response.body[0];
    }
  );
};

BSDataHelper.prototype.getBinCollectionDay = function (postCode) {
  // The api won't accept a space in a postcode so we need to add a + symbol
  var formattedPostCode = this.formatPostCode(postCode);
  var options = {
    method: 'GET',
    uri: ENDPOINT + formattedPostCode,
    resolveWithFullResponse: true,
    json: true
  };

  return rp(options);
};

BSDataHelper.prototype.formatPostcode = function (postCode) {
  return postCode.insert((postCode.length - 3), "+");
};

BSDataHelper.prototype.formatResult = function (result) {
  return result.replace(/<(?:.|\n)*?>/gm, '');
};

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

module.exports = BSDataHelper;
