"use client";
import React from 'react';
import styles from './PublicLayout.module.css';
import PropTypes from 'prop-types';

const PublicLayout = ({ children }) => {
	return (
		<div className={styles.publiclayout}>
 			PublicLayout works!
 		</div>
	);
};

PublicLayout.propTypes = {};

export default PublicLayout;