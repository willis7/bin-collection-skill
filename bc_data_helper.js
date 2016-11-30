'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://eastdevon.gov.uk/addressfinder?qtype=bins&term=';

function BCDataHelper() { }

// requestBinCollectionDay returns the response from the call to getBinCollectionDay
BCDataHelper.prototype.requestBinCollectionDay = function(postCode) {

  return this.getBinCollectionDay(postCode).then(
    function(response) {
      console.log('success - received bin info for ' + postCode);
      return response.body[0];
    }
  );
};


BCDataHelper.prototype.getBinCollectionDay = function(postCode) {

  var options = {
    method: 'GET',
    uri: ENDPOINT + postCode,
    resolveWithFullResponse: true,
    json: true
  };

  return rp(options);
};

module.exports = BCDataHelper;
