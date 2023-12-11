import React from 'react';
import { Navigate } from 'react-router-dom';
import { useVerifyAuthQuery } from '../services/authApi';

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { data, isFetching, isError } = useVerifyAuthQuery(undefined, {
		skip: false,
		refetchOnMountOrArgChange: true
	});

	if (isFetching) {
		return <div>Loading...</div>;
	}

	if (isError || !data?.isValid) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
