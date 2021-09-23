/**
 * External Modules
 */
import express from 'express';
import http from 'http';
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
/**
 * Internal Modules
 */
import routerUser from 'src/routes/user';
import routerCar from 'src/routes/car';
import connectDB from 'src/services/connectDB';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

/**
 * App Variables
 */
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = parseInt(process.env.PORT, 10);


/**
 * Data Base Configuration
 */
if (!process.env.DB_URL) {
  process.exit(1);
}

const url = process.env.DB_URL;
connectDB(url);

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes Configuration
 */
app.use("/users", routerUser);
app.use("/cars", routerCar);

server.listen(port, () => {
  console.log('Example Express listening on port 3000!');
});