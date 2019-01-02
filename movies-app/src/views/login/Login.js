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

const Heading = Styled.h2`
	margin-top: 0;
`;

const Form = Styled.form`
	background: #fff;
	padding: 2rem;
	display: flex;
	flex-direction: column;
`;

const Field = Styled.input`
	margin-bottom: 0.5rem;
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
					<Heading>Zaloguj się</Heading>
					<Field
						type="email"
						value={this.state.login}
						placeholder="login"
						onChange={({ target }) => this.handleChange({ login: target.value })}
					/>
					<Field
						type="password"
						value={this.state.password}
						placeholder="password"
						onChange={({ target }) => this.handleChange({ password: target.value })}
					/>
					<button type="submit">Zaloguj</button>
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
