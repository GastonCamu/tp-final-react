import React, { useEffect, useState } from 'react';

import s from './EmpleadosPage.module.css';

import iconEdit from '../../assets/img/icon-edit-50.png';
import iconDelete from '../../assets/img/icon-delete-50.png';

import { FormEmpleadoModal } from '../../components';
import {formatFechaToDDMMYYYY, formatFechaToISO} from '../../utils'

const API_URL = 'http://localhost:3000/empleados';

const EmpleadosPage = ({}) => {
	const [empleados, setEmpleados] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalEmpleadoOpen, setIsModalEmpleadoOpen] = useState(false);
	const [empleadoActual, setEmpleadoActual] = useState(null);
	const [modalEmpleadoConfig, setModalEmpleadoConfig] = useState({ titulo: '', botonTexto: '' });

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
			setError('Hubo un error al crear el empleado');
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
			await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
			setEmpleados(empleados.filter((empleado) => empleado.id !== id));
		} catch (error) {
			setError('Hubo un error al eliminar al empleado');
		}
	};

	const putEmpleado = async (empleadoEditado) => {
		try {
			const response = await fetch(`${API_URL}/${empleadoEditado.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(empleadoEditado),
			});

			if (!response.ok) {
				setError('Error al actualizar el empleado');
				return;
			}

			const updatedEmpleado = await response.json();
			setEmpleados(
				empleados.map((empleado) =>
					empleado.id === updatedEmpleado.id ? updatedEmpleado : empleado
				)
			);
			setIsModalEmpleadoOpen(false);
		} catch (error) {
			setError('Hubo un error al actualizar el empleado');
		}
	};

	const handleFormSubmit = (empleadoData) => {

		const empleadoConFechasFormateadas = {
			...empleadoData,
			fechaNacimiento: formatFechaToISO(empleadoData.fechaNacimiento),
			fechaIngreso: formatFechaToISO(empleadoData.fechaIngreso),
			fechaCreacion: formatFechaToISO(empleadoData.fechaCreacion),
		};

		if (empleadoActual) {
			putEmpleado({ ...empleadoActual, ...empleadoConFechasFormateadas });
		} else {
			createEmpleado(empleadoConFechasFormateadas);
		}
	};

	const handleNuevoEmpleado = () => {
		setEmpleadoActual(null);
		setModalEmpleadoConfig({ titulo: 'Nuevo Empleado', botonTexto: 'Crear Empleado' });
		setIsModalEmpleadoOpen(true);
	};

	const handleEditarEmpleado = (empleado) => {
		setEmpleadoActual(empleado);
		setModalEmpleadoConfig({ titulo: 'Editar Empleado', botonTexto: 'Guardar Cambios' });
		setIsModalEmpleadoOpen(true);
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
					<button className={s.buttonNuevoEmpleado} onClick={handleNuevoEmpleado}>Nuevo empleado</button>
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
								<td>{formatFechaToDDMMYYYY(empleado.fechaNacimiento)}</td>
								<td>{formatFechaToDDMMYYYY(empleado.fechaIngreso)}</td>
								<td>{formatFechaToDDMMYYYY(empleado.fechaCreacion)}</td>
								<td className={s.buttons}>
									<button
										className={s.putButton}
										onClick={() => handleEditarEmpleado(empleado)}
									>
										<img draggable="false" src={iconEdit} alt="Modificar" />
									</button>

									<button
										className={s.deleteButton}
										onClick={() => deleteEmpleado(empleado.id)}
									>
										<img draggable="false" src={iconDelete} alt="Eliminar" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isModalEmpleadoOpen && (
				<FormEmpleadoModal
					onClose={() => setIsModalEmpleadoOpen(false)}
					onSubmit={handleFormSubmit}
					empleado={empleadoActual}
					titulo={modalEmpleadoConfig.titulo}
					botonTexto={modalEmpleadoConfig.botonTexto}
				/>
			)}
		</div>
	);
};

export default EmpleadosPage;
