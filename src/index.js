import '@babel/polyfill';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import socketio from 'socket.io';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import env from './config/env';
import routes from './routes';
import multer from 'multer';
import http from 'http';
import SocketDev from './socket';
// import { socketAuth } from './middleware/socketAuth';

const app = express()
const server = http.createServer(app)
const io = socketio(server)
SocketDev(io);

// io.on('connection', () => {
//   console.log('New WebSocket Connection')
//   // client.on('event', data => { console.log(`Socket IO is Connected ${data}`) });
//   // client.on('disconnect', () => { console.log('Socket IO is disconnected') });
// });

const upload = multer();

const production = env.NODE_ENV === 'production';

// Create global app object
// const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(upload.single('file'));

// app.use(passport.initialize());
app.use(cors());
app.use(cookieParser());

// Normal express config defaults
app.use(morgan('dev'));

app.use(methodOverride());
if (!production) {
  app.use(errorhandler());
}

// connect app to routes
app.use('/v1.0/api', routes);

// development error handler
if (!production) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// routes
// app.use(routes);
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to sportfans',
}));
app.all('*', (req, res) => res.send({ message: 'route not found' }));

// io.on('connection', () => {
//   console.log('Socket IO is Connected')
// });

// start our server...
server.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}\nVisit http://localhost:${process.env.PORT}`);
});


export default server;
