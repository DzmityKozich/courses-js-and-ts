import dotenv from 'dotenv';
import experss from 'express';
import router from './routes/routes';
import { MongoClient } from 'mongodb';

dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const MONGO_PATH = process.env.MONGO_PATH || 'mongodb://localhost:27017';

const app = experss();

app.use(experss.json());

app.use('/', router);

app.listen(port, () => {
	console.log(`Server start on port ${port}`);
});

const client = new MongoClient(MONGO_PATH);
client
	.connect()
	.then(() => {
		console.log('conncet');
	})
	.catch((err) => {
		console.log(err);
	});
