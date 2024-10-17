const express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');

// Utils
const { loadJSONFiles } = require('./utils/index')

// Middlewares
const forwardRequest = require('./middlewares/forwardReq');

// Dashboard Routes
const dashboardRoutes = require('./router/index')

let app = express();
app.use(CORS());
app.use(bodyParser.json())

app = loadJSONFiles('./mocks', app);
const PORT = 4000;

app.use('/api/dashboard', dashboardRoutes);
app.use((req, res, next) => forwardRequest(req, res, next));

app.listen(PORT, () => {
  console.log(`Mocking server is running at http://localhost:${PORT}`);
});