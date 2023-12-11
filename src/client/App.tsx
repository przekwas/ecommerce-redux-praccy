import React, { useState } from 'react';
import { useAppDispatch } from './store';
import { login } from './features/authSlice';
import { fetchData } from './services/fetchData';

interface AppProps {}

const App = (props: AppProps) => {
	const dispatch = useAppDispatch();
	const [values, setValues] = useState({
		email: 'test@test.com',
		password: 'password123'
	});

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues(p => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(values))
			.unwrap()
			.then(() => {
				console.log('Login successful');
			})
			.catch(error => {
				console.error('Login failed:', error);
			});
	};

	const handleVerify = async () => {
		fetchData('/api/auth/verify', 'POST').then(res => console.log(res));
	};
	const handleLogout = async () => {
		fetchData('/api/auth/logout', 'POST').then(res => console.log(res));
	};

	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form onSubmit={handleLogin}>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							className="form-control"
							name="email"
							value={values.email || ''}
							onChange={handleChanges}
						/>
						<label htmlFor="password">Password</label>
						<input
							type="text"
							className="form-control"
							name="password"
							value={values.password || ''}
							onChange={handleChanges}
						/>
						<button className="btn btn-primary">Login</button>
					</form>
				</div>
			</section>
			<button className="btn btn-secondary" onClick={handleVerify}>
				Verify Token
			</button>
			<button className="btn btn-danger" onClick={handleLogout}>
				Logout
			</button>
		</main>
	);
};

export default App;
