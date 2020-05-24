import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { configureStore } from './store';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={configureStore()}>
			<div className='App'>
				<AppBar position='static'>
					<Toolbar variant='dense'>
						<Typography align='center' variant='h6' color='inherit'>
							Weather App
						</Typography>
					</Toolbar>
				</AppBar>
				<App />
			</div>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
