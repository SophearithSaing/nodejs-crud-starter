const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const sampleDataRouter = require('./routes/sampleDataRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
// Development log
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10kb' }));

// Serve static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/sample-data', sampleDataRouter);
app.use('/api/v1/users', userRouter);

// Handle unmatched route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
