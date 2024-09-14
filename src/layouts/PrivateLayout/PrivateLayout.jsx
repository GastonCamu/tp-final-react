import React from 'react';
import styles from './PrivateLayout.module.css';

import { Navbar } from '../../components'
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({ children }) => {
	return (
		<div className={styles.privatelayout}>
 			<Navbar />
			<main className={styles.main}>
				<Outlet />
			</main>
 		</div>
	);
};

export default PrivateLayout;