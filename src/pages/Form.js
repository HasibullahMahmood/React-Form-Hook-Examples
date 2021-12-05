import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	text: yup.string().required('required'),
	integer: yup
		.number()
		.positive()
		.integer()
		.transform((v, o) => (o === '' ? null : v))
		.nullable(),
	float: yup
		.number()
		.test('is-decimal', 'Invalid decimal', (value) => (value + '').match(/^\d*\.{1}\d*$/))
		.transform((v, o) => (o === '' ? null : v))
		.nullable(),
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
export default function Form() {
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
						Uncontrolled Form
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit(formSubmitHandler)} autoComplete="off">
						<div className={classes.inputContainer}>
							<label htmlFor="text">Text</label>
							<input {...register('text')} />
							{errors.text && <span>{errors.text.message}</span>}
						</div>
						<div className={classes.inputContainer}>
							<label htmlFor="integer">Integer Positive</label>
							<input {...register('integer')} type="number" />
							{errors.integer && <span>{errors.integer.message}</span>}
						</div>
						<div className={classes.inputContainer}>
							<label htmlFor="number">Float</label>
							<input {...register('float')} type="number" />
							{errors.float && <span>{errors.float.message}</span>}
						</div>

						<Button variant="contained" fullWidth type="submit">
							Submit
						</Button>
					</form>
				</CardContent>
			</Card>

			<Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={closeSnackbarHandler}>
				<Alert severity="success" onClose={closeSnackbarHandler} variant="filled">
					Successfully Submitted
				</Alert>
			</Snackbar>
		</Container>
	);
}
