import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Layout({ children }) {
	const navigate = useNavigate();
	return (
		<div>
			<aside>
				<Box sx={{ display: 'flex' }}>
					<CssBaseline />
					<AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
						<Toolbar>
							<OutlinedInput placeholder="Search..." sx={{ backgroundColor: 'white' }} size="small" />
							<IconButton sx={{ ml: -5 }}>
								<SearchIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Drawer
						sx={{
							width: drawerWidth,
							flexShrink: 0,
							'& .MuiDrawer-paper': {
								width: drawerWidth,
								boxSizing: 'border-box',
							},
						}}
						variant="permanent"
						anchor="left"
					>
						<Toolbar />
						<Divider />
						<List>
							{[
								{ text: 'Home', path: '/' },
								{ text: 'Example1', path: '/example-1' },
							].map((i) => (
								<ListItem
									key={i.text}
									button
									onClick={() => {
										navigate(i.path);
									}}
								>
									<ListItemText primary={i.text} />
								</ListItem>
							))}
						</List>
					</Drawer>
				</Box>
			</aside>
			<main style={{ marginLeft: drawerWidth, marginTop: 60 }}>{children}</main>
		</div>
	);
}
