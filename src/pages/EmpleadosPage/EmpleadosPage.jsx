import React, { useEffect, useState } from 'react';

import s from './EmpleadosPage.module.css';

import iconEdit from '../../assets/img/icon-edit-50.png';
import iconDelete from '../../assets/img/icon-delete-50.png';

import { FormEmpleadoModal } from '../../components'

const API_URL = 'http://localhost:3000/empleados';

const EmpleadosPage = ({}) => {
	const [empleados, setEmpleados] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalEmpleadoOpen, setIsModalEmpleadoOpen] = useState(false);
 
	useEffect(() => {
		getEmpleados();
	}, []);

	const createEmpleado = async (nuevoEmpleado) => {
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(nuevoEmpleado),
			});

			const empleado = await response.json();
			setEmpleados([...empleados, empleado]);
			setIsModalEmpleadoOpen(false);

		} catch (error) {
			setError('Hubo un error al crear el empleado')
		}
	};

	const getEmpleados = async () => {
		try {
			setLoading(true);
			const response = await fetch(API_URL);

			if (!response.ok) {
				setError('Hubo un error al obtener los datos');
				setLoading(false);
				return;
			}

			const data = await response.json();
			setEmpleados(data);
			setLoading(false);

		} catch (error) {
			setError('Hubo un error al obtener los empleados');
			setLoading(false);
		}
	};

	const deleteEmpleado = async (id) => {
		try {
			await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
			setEmpleados(empleados.filter((empleado) => empleado.id !== id));
		} catch (error) {
			setError('Hubo un error al eliminar al empleado');
		}
	};

	const putEmpleado = (id) => {
	};

	const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const nuevoEmpleado = {
			nombre: e.target.nombre.value,
			apellido: e.target.apellido.value,
			email: e.target.email.value,
			nroDocumento: e.target.nroDocumento.value,
			fechaNacimiento: e.target.fechaNacimiento.value,
			fechaIngreso: e.target.fechaIngreso.value,
			fechaCreacion: e.target.fechaCreacion.value,
		};
		createEmpleado(nuevoEmpleado);
	};


	if (loading) return <p>Cargando empleados...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className={s.empleadospage}>
			<div className={s.fondo}>
				<div className={s.barraAcciones}>
					<input placeholder='Ingrese su busqueda' type="text" />
					<button className={s.buttonBuscar}>Buscar</button>
					<button className={s.buttonMostrarTodo}>Mostrar Todo</button>
					<button className={s.buttonNuevoEmpleado} onClick={() => setIsModalEmpleadoOpen(true)}>Nuevo empleado</button>
				</div>
				<table className={s.empleadosTable}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Documento</th>
							<th>Nombre</th>
							<th>Email</th>
							<th>Fecha Nacimiento</th>
							<th>Fecha Ingreso</th>
							<th>Fecha Creacion</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{empleados.map((empleado) => (
							<tr className={s.trContent} key={empleado.id}>
								
								<td>{empleado.id}</td>
								<td>{empleado.nroDocumento}</td>
								<td>{empleado.nombre} {empleado.apellido}</td>
								<td>{empleado.email}</td>
								<td>{formatFecha(empleado.fechaNacimiento)}</td>
								<td>{formatFecha(empleado.fechaIngreso)}</td>
								<td>{formatFecha(empleado.fechaCreacion)}</td>
								<td className={s.buttons}>

									<button
										className={s.putButton}
										onClick={() => putEmpleado(empleado.id)}
									><img draggable="false" src={iconEdit} alt="Modificar" />
									</button>

									<button
										className={s.deleteButton}
										onClick={() => deleteEmpleado(empleado.id)}
									><img draggable="false" src={iconDelete} alt="Eliminar" />
									</button>

								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isModalEmpleadoOpen && <FormEmpleadoModal onClose={() => setIsModalEmpleadoOpen(false)} onSubmit={handleFormSubmit} />}
 		</div>
	);
};


export default EmpleadosPage;