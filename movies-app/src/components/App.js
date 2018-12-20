import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/auth/reducer';

class App extends Component {
	state = {
		login: '',
		password: ''
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.login(this.state);
	};

	render() {
		return (
			<Fragment>
				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						value={this.state.login}
						placeholder="login"
						onChange={(e) => this.setState({ login: e.target.value })}
					/>
					<input
						type="password"
						value={this.state.password}
						placeholder="password"
						onChange={(e) => this.setState({ password: e.target.value })}
					/>
					<button type="submit">Zaloguj</button>
				</form>
			</Fragment>
		);
	}
}

export default connect(null, { login })(App);
