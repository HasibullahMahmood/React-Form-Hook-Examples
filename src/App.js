import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Layout from './components/Layout/index';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Form from './pages/Form';

const theme = createTheme();
function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login-form" element={<LoginForm />} />
						<Route path="/form" element={<Form />} />
					</Routes>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
