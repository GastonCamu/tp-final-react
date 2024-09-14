import React, { useEffect, useState } from 'react';

import s from './EmpleadosPage.module.css';

import iconEdit from '../../assets/img/icon-edit-50.png';
import iconDelete from '../../assets/img/icon-delete-50.png';

const API_URL = 'http://localhost:3000/empleados';

const EmpleadosPage = ({}) => {
	const [empleados, setEmpleados] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getEmpleados();
	}, []);

	const createEmpleado = () => {
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

	if (loading) return <p>Cargando empleados...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className={s.empleadospage}>
			<div className={s.fondo}>
				<div className={s.barraAcciones}>
					<input placeholder='Ingrese su busqueda' type="text" />
					<button className={s.buttonBuscar}>Buscar</button>
					<button className={s.buttonMostrarTodo}>Mostrar Todo</button>
					<button className={s.buttonNuevoEmpleado}>Nuevo empleado</button>
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
 		</div>
	);
};


export default EmpleadosPage;