import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './views/Root';
import Home from './views/Home';
import Login from './views/Login';
import Profile from './views/Profile';
import PrivateRoute from './components/PrivateRoute';

interface AppProps {}

const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/profile',
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				)
			}
		]
	}
]);

const App = (props: AppProps) => {
	return <RouterProvider router={router} />;
};

export default App;
