import React, { useEffect, useState } from 'react';
import s from './EmpleadosPage.module.css';
import iconEdit from '../../assets/img/icon-edit-50.png';
import iconDelete from '../../assets/img/icon-delete-50.png';
import { FormEmpleadoModal, PassiveAlert } from '../../components';
import { formatFechaToDDMMYYYY, formatFechaToISO } from '../../utils';

const API_URL = 'http://localhost:3000/empleados';

const EmpleadosPage = () => {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalEmpleadoOpen, setIsModalEmpleadoOpen] = useState(false);
    const [empleadoActual, setEmpleadoActual] = useState(null);
    const [modalEmpleadoConfig, setModalEmpleadoConfig] = useState({ titulo: '', botonTexto: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState(null);

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
            if (!response.ok) throw new Error('Error al crear el empleado');
            const empleado = await response.json();
            setEmpleados([...empleados, empleado]);
            setIsModalEmpleadoOpen(false);
            setAlert({ message: 'Empleado creado exitosamente', type: 'success' });
        } catch (error) {
            setAlert({ message: 'Hubo un error al crear el empleado', type: 'error' });
        }
    };

    const getEmpleados = async (query = '') => {
        try {
            setLoading(true);
            const url = query ? `${API_URL}?nroDocumento=${encodeURIComponent(query)}` : API_URL;
            const response = await fetch(url);

            if (!response.ok) {
                setAlert({ message: 'Hubo un error al obtener los empleados', type: 'error' });
            }

            const data = await response.json();
            setEmpleados(data);
            setLoading(false);
        } catch (error) {
            setAlert({ message: 'Hubo un error al obtener los empleados', type: 'error' });
            setLoading(false);
        }
    };

    const deleteEmpleado = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setEmpleados(empleados.filter((empleado) => empleado.id !== id));
            setAlert({ message: 'Empleado eliminado exitosamente', type: 'success' });
        } catch (error) {
            setAlert({ message: 'Hubo un error al eliminar al empleado', type: 'error' });
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
            if (!response.ok) throw new Error('Error al actualizar el empleado');
            const updatedEmpleado = await response.json();
            setEmpleados(
                empleados.map((empleado) =>
                    empleado.id === updatedEmpleado.id ? updatedEmpleado : empleado
                )
            );
            setIsModalEmpleadoOpen(false);
            setAlert({ message: 'Empleado actualizado exitosamente', type: 'success' });
        } catch (error) {
            setAlert({ message: 'Hubo un error al actualizar el empleado', type: 'error' });
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

    const handleMostrarTodo = () => {
        setSearchTerm('');
        getEmpleados();
    };

    const handleBuscar = () => {
        getEmpleados(searchTerm);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) return <p>Cargando empleados...</p>;

    return (
        <div className={s.empleadospage}>
            <div className={s.fondo}>
                <div className={s.barraAcciones}>
                    <input
                        placeholder='Buscar por Documento'
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className={s.buttonBuscar} onClick={handleBuscar}>Buscar</button>
                    <button className={s.buttonMostrarTodo} onClick={handleMostrarTodo}>Mostrar Todo</button>
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
                            <th>Fecha Creación</th>
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
            {alert && (
                <PassiveAlert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
        </div>
    );
};

export default EmpleadosPage;
