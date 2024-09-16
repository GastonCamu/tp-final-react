import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';

import { useAuth } from '../../context';
import { useForm } from '../../hooks';

const LoginPage = ({}) => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const validate = (values) => {
		const errors = {};
		if (!values.username) errors.username = 'El usuario es requerido';
		if (!values.password) errors.password = 'La contraseña es requerida';
		return errors;
	};

	const { values, errors, handleChange, handleSubmit } = useForm(
		{username: '', password: ''},
		validate
	);

	const onSubmit = () => {
		login(values.username);
		navigate('/home');
		
	};

	return (
		<div className={styles.loginpage}>
 			<form className={styles.form} onSubmit={(e) => handleSubmit(e, onSubmit)}>
				<div className={styles.formDivs}>
					<label>Usuario:</label>
					<input 
						className={styles.input}
						type="text" 
						name='username'
						placeholder='Gaston'
						value={values.username}
						onChange={handleChange}
					/>
					{errors.username && <p className={styles.error}>* {errors.username}</p>}
				</div>
				<div className={styles.formDivs}>
					<label>Contraseña:</label>
					<input
					className={styles.input} 
					type="password"
					name='password'
					placeholder='1234'
					value={values.password}
					onChange={handleChange} 
					/>
					{errors.password && <p className={styles.error}>* {errors.password}</p>}
				</div>
				<button className={styles.btnSubmit} type='submit'>Iniciar Sesión</button>
			</form>
 		</div>
	);
};

export default LoginPage;