import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

app.use(helmet());
app.use(compression());

if (isDevelopment) {
	app.use(cors());
}

if (isProduction) {
	app.use(express.static('public'));
}

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/hello', (req, res) => {
	res.json({ message: 'World' });
});

if (isProduction) {
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root: 'public' });
	});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
