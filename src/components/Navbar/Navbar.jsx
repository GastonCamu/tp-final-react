import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

import { useAuth } from '../../context';

const Navbar = ({}) => {
	const { user, logout } = useAuth();
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	const menuRef = useRef(null);
	
	const handleUserClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
	}

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuRef]);

	return (
		<div className={styles.navbar}>
 			<nav className={styles.nav}>
				<ul className={styles.elementos}>
					<div className={styles.left}>
						<Link to="/home" className={styles.Link}>Inicio</Link>
						<Link to="/empleados" className={styles.Link} >Empleados</Link>
					</div>
					<div className={styles.right}>
						<li ref={menuRef} className={`${styles.userMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
							<span onClick={handleUserClick} className={`${styles.username} ${isMenuOpen ? styles.menuOpen : ''}`}>
								{user.username}
								{isMenuOpen ? '▲' : '▼'}
							</span>
							{isMenuOpen && (
								<div className={styles.dropDownMenu}>
									<button onClick={handleLogout}>Cerrar sesión</button>
								</div>
							)}

						</li>
					</div>
				</ul>
			</nav>
 		</div>
	);
};

export default Navbar;