import React from 'react';

export const withAuth = (WrappedComponent) => {
	return class extends React.Component {
		componentDidMount() {
			this.checkPermission();
		}

		componentDidUpdate() {
			this.checkPermission();
		}

		checkPermission() {
			const token = sessionStorage.getItem('token');
			if (!token) {
				this.props.history.push('/login');
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};
