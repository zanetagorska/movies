import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { login, resetLogin } from '../redux/auth/reducer';

class App extends Component {
	state = {
		login: '',
		password: ''
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.login(this.state);
	};

	handleChange = (field) => {
		if (this.props.errorMessage) {
			this.props.resetLogin();
		}

		this.setState(field);
	};

	render() {
		return (
			<Fragment>
				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						value={this.state.login}
						placeholder="login"
						onChange={(e) => this.handleChange({ login: e.target.value })}
					/>
					<input
						type="password"
						value={this.state.password}
						placeholder="password"
						onChange={(e) => this.handleChange({ password: e.target.value })}
					/>
					<button type="submit">Zaloguj</button>
				</form>
				{this.props.errorMessage}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, { login, resetLogin })(App);
