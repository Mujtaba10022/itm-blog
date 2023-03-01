module.exports = function(app) {
    app.use('*',function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
  });
  };
  