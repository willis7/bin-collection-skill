'use strict';

module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('binschedule');
var BSDataHelper = require('./bc_data_helper');

app.launch(function (req, res) {

  var prompt = 'For your bin schedule, tell me a post code.';
  var reprompt = 'All I need is a post code.'

  res.say(prompt).reprompt(reprompt).shouldEndSession(false);

});

app.intent('binschedule', {

    'slots': {
      'POSTCODE': 'POSTCODES'
    },
    'utterances': ['{|bin|trash|rubbish} {|date|schedule} {|for} {-|POSTCODE}']
  },

  function (req, res) {

    // Get the slot
    var postCode = req.slot('POSTCODE');

    var reprompt = 'Please tell me a post code to get bin schedule information.';

    if (_.isEmpty(postCode)) {

      var prompt = 'I didn\'t hear a post code. Please tell me a post code.';

      res.say(prompt).reprompt(reprompt).shouldEndSession(false);

      return true;

    } else {

      var bsHelper = new BSDataHelper();

      bsHelper.requestBinCollectionDay(postCode).then(function (scheduleData) {
        console.log(scheduleData);

        res.say(bsHelper.formatResult(scheduleData.Results)).send();

      }).catch(function (err) {
        console.log(err.statusCode);

        var prompt = 'I didn\'t have data for a post code of ' + postCode;

        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();

      });

      return false;

    }
  }
);

module.exports = app;
