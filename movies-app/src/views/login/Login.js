import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, resetLogin } from '../../redux/auth/reducer';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const Container = Styled.div`
  background: #333;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Form = Styled.form`
	background: #fff;
	padding: 2rem;
	display: flex;
	flex-direction: column;
`;

class Login extends Component {
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
			<Container>
				<Form onSubmit={this.handleSubmit}>
					<h2 className="subtitle is-2">Zaloguj się</h2>
					<div
						className="field"
						type="email"
						value={this.state.login}
						placeholder="login"
						onChange={({ target }) => this.handleChange({ login: target.value })}
					>
						<p className="control has-icons-left">
							<input className="input" type="email" placeholder="Email" />
							<span className="icon is-small is-left">
								<i className="fas fa-envelope" />
							</span>
						</p>
					</div>
					<div
						className="field"
						type="password"
						value={this.state.password}
						placeholder="password"
						onChange={({ target }) => this.handleChange({ password: target.value })}
					>
						<p className="control has-icons-left">
							<input className="input" type="password" placeholder="Password" />
							<span className="icon is-small is-left">
								<i className="fas fa-lock" />
							</span>
						</p>
					</div>
					<button type="submit" class="button is-success">
						Zaloguj
					</button>
				</Form>
				{this.props.error}
			</Container>
		);
	}
}

Login.propTypes = {
	errorMessage: PropTypes.string,
	login: PropTypes.func,
	resetLogin: PropTypes.func
};

const mapStateToProps = (state) => ({
	error: state.auth.errorMessage,
	isLogin: state.auth.isLogin
});

export default connect(mapStateToProps, { login, resetLogin })(Login);
