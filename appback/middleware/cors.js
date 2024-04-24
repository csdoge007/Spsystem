const cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://10.162.184.233:5173');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  }
export default cors;