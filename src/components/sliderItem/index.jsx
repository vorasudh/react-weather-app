import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';

import './styles.css';

export default ({ item, temperatureUnit }) => {
	return (
		<Card raised elevation={2} variant='elevation'>
			<CardHeader
				title={moment.unix(item.dt).format('DD.MM.YYYY')}
				subheader={moment.unix(item.dt).format('HH:mm:ss')}
			/>
			<CardContent>
				<Table className='data-table' aria-label='simple table'>
					<TableBody>
						<TableRow>
							<TableCell>Temperature</TableCell>
							<TableCell align='right'>
								{Math.round(item.main.temp)}
								{temperatureUnit === 'metric' ? '°C' : '°F'}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Real Feel</TableCell>
							<TableCell align='right'>
								{Math.round(item.main.feels_like)}
								{temperatureUnit === 'metric' ? '°C' : '°F'}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Humidity</TableCell>
							<TableCell align='right'>{item.main.humidity}%</TableCell>
						</TableRow>
						{item.clouds && (
							<TableRow>
								<TableCell>Clouds</TableCell>
								<TableCell align='right'>{item.clouds.all}%</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export const SliderItemEmpty = () => (
	<Card raised elevation={2} variant='elevation' className='skeleton'>
		<CardHeader title={<Skeleton />} subheader={<Skeleton />} />
		<CardContent>
			<Table className='data-table' aria-label='simple table'>
				<TableBody>
					<TableRow>
						<TableCell>
							<Skeleton width='50%' />
						</TableCell>
						<TableCell align='right'>
							<Skeleton width='25%' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton width='50%' />
						</TableCell>
						<TableCell align='right'>
							<Skeleton width='25%' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton width='50%' />
						</TableCell>
						<TableCell align='right'>
							<Skeleton width='25%' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton width='50%' />
						</TableCell>
						<TableCell align='right'>
							<Skeleton width='25%' />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);
