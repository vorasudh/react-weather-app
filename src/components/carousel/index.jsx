import React from 'react';
import Slider from 'react-slick';

import SliderItem, { SliderItemEmpty } from '../sliderItem';
import './styles.css';

const SlickSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: '40px',
	arrows: true,
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};

export default ({ data = [], temperatureUnit = '', isLoading = false }) => (
	<Slider {...SlickSettings}>
		{data.map(item =>
			isLoading ? (
				<SliderItemEmpty key={item} />
			) : (
				<SliderItem key={item.dt} item={item} temperatureUnit={temperatureUnit} />
			)
		)}
	</Slider>
);
