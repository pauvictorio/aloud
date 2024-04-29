import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import './assets/css/index.css';
import App from './App';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(66, 161, 255)'
		},
		secondary: {
			main: 'rgb(76, 216, 255)'
		}
	},
	typography: {
		fontFamily: [
			'Roboto',
			'sans-serif'
		].join(','),
		h1: {
			fontSize: '1.5rem',
		},
		h2: {
			fontSize: '1.2rem'
		},
		p: {
			fontSize: '0.8rem'
		}
	}
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
