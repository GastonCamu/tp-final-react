import { Outlet } from 'react-router-dom';
import React from 'react';

import styles from './PublicLayout.module.css';

const PublicLayout = () => {
	return (
		<div className={styles.publiclayout}>
			<Outlet />
 		</div>
	);
};

export default PublicLayout;