import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/index';
import Home from './pages/Home';
import Example1 from './pages/Example1';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/example-1" element={<Example1 />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
