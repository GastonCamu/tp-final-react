import React from 'react';
import styles from './PrivateLayout.module.css';

import { Navbar } from '../../components'

const PrivateLayout = ({ children }) => {
	return (
		<div className={styles.privatelayout}>
 			<Navbar />
			<main className={styles.main}>
				{children}
			</main>
 		</div>
	);
};

export default PrivateLayout;