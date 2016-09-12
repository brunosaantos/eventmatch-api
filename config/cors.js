export default (app) => {
  app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-Access-Token');
    return next();
  });
  //
  function corsHandler(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Cache-Control, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-Access-Token, X-PINGOTHER, X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');

    return next();
  }

  function optionsRoute(req, res, next) {
    res.send(200);
    return next();
  }

  app.opts('/\.*/', corsHandler, optionsRoute);

  return app;
};
