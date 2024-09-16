import React from 'react';
import { Outlet } from 'react-router-dom';

import s from './PublicLayout.module.css';

const PublicLayout = () => {
	return (
		<div className={s.publiclayout}>
			<Outlet />
 		</div>
	);
};

export default PublicLayout;