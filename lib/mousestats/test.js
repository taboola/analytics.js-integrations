
var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var tester = require('analytics.js-integration-tester');
var sandbox = require('clear-env');
var MouseStats = require('./');

describe('MouseStats', function() {
  var analytics;
  var mousestats;
  var options = {
    accountNumber: '5532375730335616295'
  };

  beforeEach(function() {
    analytics = new Analytics();
    mousestats = new MouseStats(options);
    analytics.use(MouseStats);
    analytics.use(tester);
    analytics.add(mousestats);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    mousestats.reset();
    sandbox();
  });

  it('should have the right settings', function() {
    analytics.compare(MouseStats, integration('MouseStats')
      .assumesPageview()
      .global('msaa')
      .global('MouseStatsVisitorPlaybacks')
      .option('accountNumber', ''));
  });

  describe('before loading', function() {
    beforeEach(function() {
      analytics.stub(mousestats, 'load');
    });

    describe('#initialize', function() {
      it('should call #load', function() {
        analytics.initialize();
        analytics.page();
        analytics.called(mousestats.load);
      });
    });
  });

  describe('loading', function() {
    it('should load', function(done) {
      analytics.load(mousestats, done);
    });
  });
});
