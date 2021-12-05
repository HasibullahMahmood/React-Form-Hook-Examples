import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.required('Password is required!')
		.min(6, 'At least 6 characters')
		.max(10, 'At most 10 characters'),
});

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: theme.spacing(15),
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: 10,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		'& input': {
			height: 35,
			padding: theme.spacing(1),
		},
	},
}));
export default function LoginForm() {
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const formSubmitHandler = (inputs) => {
		setIsSnackbarOpen(true);
		console.log(inputs);
	};

	const closeSnackbarHandler = () => {
		setIsSnackbarOpen(false);
	};
	return (
		<Container maxWidth="sm" className={classes.root}>
			<Card className={classes.card} elevation={3}>
				<CardContent>
					<Typography variant="h5" mb={3} align="center">
						Login Form
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit(formSubmitHandler)} autoComplete="off">
						<div className={classes.inputContainer}>
							<label htmlFor="email">Email</label>
							<input {...register('email')} autoComplete="off" type="search" />
							{errors.email && <span>{errors.email.message}</span>}
						</div>
						<div className={classes.inputContainer}>
							<label htmlFor="password">Password</label>
							<input {...register('password')} type="password" autoComplete="off" />
							{errors.password && <span>{errors.password.message}</span>}
						</div>

						<Button variant="contained" fullWidth type="submit">
							Login
						</Button>
					</form>
				</CardContent>
			</Card>

			<Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={closeSnackbarHandler}>
				<Alert severity="success" onClose={closeSnackbarHandler} variant="filled">
					Login succeed
				</Alert>
			</Snackbar>
		</Container>
	);
}
