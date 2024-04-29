import React from 'react';
import { Box, Typography } from '@mui/material';
import AloudIcon from '../assets/img/icon24.png';

export default function Header() {
	return (
		<Box sx={
			{
				display: 'flex',
				justifyContent: 'flex-start',
				color: 'rgb(66, 161, 255)',
				gap: 1
			}}
		>
			<img src={AloudIcon} alt='Aloud icon' />
			<Typography variant='h1'>
				Aloud
			</Typography>
		</Box>
	);
}
