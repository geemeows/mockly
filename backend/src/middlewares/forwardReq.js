const axios = require('axios');

module.exports = async (req, res, next) => {

  try {
    const headers = { ...req.headers };
    delete headers.host;


    const options = {
      method: req.method,
      url: `http://dashboard-api.instabug.com${req.url}`,
      headers: {
        authorization: headers.authorization,
        accept: headers.accept
      }
    }

    if (req.method !== 'GET') {
      options.data = req.body
    }
    
    const response = await axios(options)

    res.status(response.status).json(response.data);
    next();
  } catch (err) {
    const status = (err?.response?.status === 401 || err?.response?.status === 403) ? 500 : err?.response?.status
    res.status(status || 500).json(err);
    next();
  }
};