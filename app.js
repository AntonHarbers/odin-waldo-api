var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index_router');
var gameRouter = require('./routes/games_router');
var characterRouter = require('./routes/characters_router');
const RateLimit = require('express-rate-limit');
const { default: mongoose, mongo } = require('mongoose');
const compression = require('compression');
var cors = require('cors');
var helmet = require('helmet');

require('dotenv').config();

var app = express();

const limiter = RateLimit({
  windowsMs: 1 * 60 * 60 * 1000, // 1 hour
  max: 300,
});

// MongoDb setup
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URL_DEV;

connectMongo().catch((e) => console.error(e));
async function connectMongo() {
  await mongoose.connect(mongoDB);
}

// Middleware chain
app.set('trust proxy', 1);
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}
app.use(limiter);

const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self"],
    },
  })
);
app.use(compression());

// Hooking up the Routes:
app.use('/', indexRouter);
app.use('/games', gameRouter);
app.use('/characters', characterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
