import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
/**
 * Routes
 */
import router_user from 'src/routes/user';
import router_car from 'src/routes/car';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router_user);
app.use(router_car);

/**
 * Conect to mongoDB
 */
const mongoDB_url = 'mongodb://localhost:27017/admin';

mongoose.connect(mongoDB_url);

const db = mongoose.connection;
db.on('open', () => console.log('Conection success'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(port, () => {
  console.log('Example Express listening on port 3000!');
});