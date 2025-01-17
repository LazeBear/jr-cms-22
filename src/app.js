const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('./utils/morgan');
const rateLimit = require('./utils/rateLimit');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const unknownErrorMiddleware = require('./middleware/error/unknownError.middleware');
const v1Router = require('./routes');
const pathNotFoundMiddleware = require('./middleware/pathNotFound.middleware');
const validationErrorMiddleware = require('./middleware/error/validationError.middleware');

const app = express();
app.use(helmet());
app.use(rateLimit);
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(formatResponseMiddleware);

app.use('/v1', v1Router);

app.use(pathNotFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(unknownErrorMiddleware);

module.exports = app;
