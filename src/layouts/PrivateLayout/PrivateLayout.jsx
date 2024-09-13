"use client";
import React from 'react';
import styles from './PrivateLayout.module.css';
import PropTypes from 'prop-types';

const PrivateLayout = ({ children }) => {
	return (
		<div className={styles.privatelayout}>
 			PrivateLayout works!
 		</div>
	);
};

PrivateLayout.propTypes = {};

export default PrivateLayout;