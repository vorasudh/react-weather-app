import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Lottie from 'react-lottie';
import { connect } from 'react-redux';
import _ from 'lodash';

import './styles.css';
import Carousel from './components/carousel';
import Cities from './utils/cities.json';
import * as animationData from './utils/loading-animation-data.json';
import { setWeatherData } from './actions';

const URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_OPEN_WEATHER_API}`;

const defaultCity = {
	id: 2867714,
	name: 'Munich',
	state: '',
	country: 'DE',
	coord: {
		lon: 11.57549,
		lat: 48.137428,
	},
};

const defaultLottieOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const fetchWeatherData = (cityId = '', units = 'metric') => {
	return fetch(`${URL}&cnt=40&units=${units}&id=${cityId}`).then(response => {
		if (response && response.ok) {
			return response.json();
		}
		return Promise.reject(new Error(response.statusText));
	});
};

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.cities = [];
		this.state = {
			isLoading: true,
			selectedCity: defaultCity,
			temperatureUnit: 'metric',
		};
	}

	componentDidMount() {
		this.cities = _.sortBy(Cities, 'name');
		this.fetchWeatherInfo();
	}

	fetchWeatherInfo = async () => {
		const { selectedCity, temperatureUnit } = this.state;
		const { setWeatherDataDispatch } = this.props;
		try {
			const data = await fetchWeatherData(selectedCity.id, temperatureUnit);
			setWeatherDataDispatch(data);
			this.setState({ isLoading: false });
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.log('error', error);
			}
			setWeatherDataDispatch(null);
			alert('Something went wrong. Please try again.');
		}
	};

	handleChangeTemperature = event => {
		this.setState({ temperatureUnit: event.target.value, isLoading: true }, this.fetchWeatherInfo);
	};

	handleChangeCity = (event, selectedValue) => {
		if (selectedValue) {
			this.setState({ selectedCity: selectedValue, isLoading: true }, this.fetchWeatherInfo);
		} else {
			this.setState({ isLoading: true });
			alert('Please select a city');
		}
	};

	render() {
		const { temperatureUnit, isLoading } = this.state;
		const { weatherData } = this.props;
		return (
			<Container maxWidth='md' className='container'>
				<div className='selection-wrapper'>
					<Autocomplete
						id='combo-box-demo'
						options={this.cities}
						getOptionLabel={option => option.name}
						defaultValue={defaultCity}
						onChange={this.handleChangeCity}
						renderInput={params => <TextField {...params} label='Select City' variant='outlined' />}
					/>
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Temperature Unit</FormLabel>
						<RadioGroup
							aria-label='temperature'
							name='temperatureUnit'
							className='radio'
							value={temperatureUnit}
							onChange={this.handleChangeTemperature}
						>
							<FormControlLabel value='metric' control={<Radio />} label='Celcius' />
							<FormControlLabel value='imperial' control={<Radio />} label='Fahrenheit' />
						</RadioGroup>
					</FormControl>
				</div>
				{isLoading ? (
					<div className='loading'>
						<Lottie options={defaultLottieOptions} height={150} width={150} />
					</div>
				) : (
					<Carousel
						data={weatherData ? weatherData.list : [1, 2, 3, 4, 5, 6]}
						temperatureUnit={temperatureUnit}
					/>
				)}
			</Container>
		);
	}
}
export default connect(
	state => ({
		weatherData: state.weatherData,
	}),
	dispatch => ({
		setWeatherDataDispatch: data => dispatch(setWeatherData(data)),
	})
)(App);
