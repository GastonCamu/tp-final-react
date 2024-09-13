import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

import { useAuth } from '../../context';

const Navbar = ({}) => {
	const { user } = useAuth(); 

	return (
		<div className={styles.navbar}>
 			<nav className={styles.nav}>
				<ul className={styles.elementos}>
					<div className={styles.left}>
						<Link to="/home" className={styles.Link}>Inicio</Link>
						<Link to="/empleados" className={styles.Link}>Empleados</Link>
					</div>
					<div className={styles.right}>
						<li>{user.username}</li>
					</div>
				</ul>
			</nav>
 		</div>
	);
};

export default Navbar;