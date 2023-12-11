import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
	return (
		<>
			<div>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/profile">Profile</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default Root;
