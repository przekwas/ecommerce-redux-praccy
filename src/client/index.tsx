import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

import './styles/app.scss';

// ESBuild Hot Reload for dev environment only
if (process.env.NODE_ENV === 'development') {
	new EventSource('/esbuild').addEventListener('change', () => location.reload());
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
