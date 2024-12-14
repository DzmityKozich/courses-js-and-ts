import dotenv from 'dotenv';
import experss from 'express';
import router from './routes/routes';

dotenv.config();

const port = process.env.SERVER_PORT || 3000;

const app = experss();

app.use(experss.json());

app.use('/', router);

app.listen(port, () => {
	console.log(`Server start on port ${port}`);
});
