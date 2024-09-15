"use client";
import React from 'react';
import s from './FormEmpleadoModal.module.css';

const FormEmpleadoModal = ({ onClose, onSubmit }) => {
	return (
		<div className={s.formEmpleadoModal}>
 			<div className={s.modalContent}>
				<button className={s.closeButton} onClick={onClose}>X</button>
				<h2>Nuevo Empleado</h2>

				<form onSubmit={onSubmit}>
					<div className={s.formGroup}>
						<label>Nombre:</label>
						<input type="text" name='nombre' required/>
					</div>
					<div className={s.formGroup}>
						<label>Apellido:</label>
						<input type="text" name='apellido' required/>
					</div>
					<div className={s.formGroup}>
						<label>Email:</label>
						<input type="email" name='email' required/>
					</div>
					<div className={s.formGroup}>
						<label>NroDocumento:</label>
						<input type="text" name='nroDocumento' required/>
					</div>
					<div className={s.formGroup}>
						<label>Fecha de nacimiento:</label>
						<input type="date" name='fechaNacimiento' required/>
					</div>
					<div className={s.formGroup}>
						<label>Fecha de ingreso:</label>
						<input type="date" name='fechaIngreso' required/>
					</div>
					<div className={s.formGroup}>
						<label>Fecha de creacion:</label>
						<input type="date" name='fechaCreacion' required/>
					</div>

					<button type='submit' className={s.submitButton}>Crear Empleado</button>
				</form>
			</div>
 		</div>
	);
};

export default FormEmpleadoModal;