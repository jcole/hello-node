/**
 * DEVELOPMENT Environment settings
 */

module.exports = function(app, express) {
  app.use(express.logger({ format: 'dev' }));
  app.set('view options', { pretty: true });
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  //app.set('db-uri', 'mongodb://localhost/openbox-development');
};