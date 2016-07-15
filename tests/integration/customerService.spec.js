var
    async = require('async'),
    expect = require('expect'),
    uuid = require('uuid');

describe('CustomerService', function() {
  var AdWords = require('../..');
  var service = new AdWords.CustomerService();

  it('should provide a service description', function(done) {
    service.getClient(function(err, client) {
      expect(err).toNotExist();
      expect(service.description).toExist();
      return done(err);
    });
  });

  it('should get customers', function(done) {
    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'customerId', sortOrder: 'ASCENDING'}]
    });

    service.get(
      process.env.ADWORDS_CLIENT_CUSTOMER_ID,
      selector,
      function(err, results) {
        expect(err).toNotExist();
        expect(results.entries).toExist();
        return done(err);
      }
    );
  });

});
